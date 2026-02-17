package handlers

import (
	"database/sql"
	"net/http"
	"news-portal/backend/database"
	"news-portal/backend/models" // Import models package
	"time"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func GetUsers(c *gin.Context) {
	var users []models.User
	if err := database.DB.Select(&users, "SELECT id, email, name, role, avatar, bio, created_at, updated_at FROM users"); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, users)
}

func GetUser(c *gin.Context) {
	id := c.Param("id")
	var user models.User
	if err := database.DB.Get(&user, "SELECT id, email, name, role, avatar, bio, created_at, updated_at FROM users WHERE id = ?", id); err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, user)
}

type CreateUserRequest struct {
	Email    string  `json:"email" binding:"required"`
	Name     string  `json:"name"`
	Password string  `json:"password" binding:"required"`
	Role     string  `json:"role"` // Allow role to be set on creation, e.g., by admin
	Avatar   *string `json:"avatar"`
	Bio      *string `json:"bio"`
}

func CreateUser(c *gin.Context) {
	var req CreateUserRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
		return
	}

	// Default role to "user" if not provided or if the caller is not an admin (checked by middleware)
	if req.Role == "" {
		req.Role = "user"
	}

	result, err := database.DB.Exec("INSERT INTO users (email, name, password, role, avatar, bio) VALUES (?, ?, ?, ?, ?, ?)", req.Email, req.Name, string(hashedPassword), req.Role, req.Avatar, req.Bio)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	id, err := result.LastInsertId()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var user models.User
	if err := database.DB.Get(&user, "SELECT id, email, name, role, avatar, bio, created_at, updated_at FROM users WHERE id = ?", id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, user)
}

type UpdateUserRequest struct {
	Email  *string `json:"email"` // Made fields nullable for partial updates
	Name   *string `json:"name"`
	Role   *string `json:"role"` // Allow role to be updated, e.g., by admin
	Avatar *string `json:"avatar"`
	Bio    *string `json:"bio"`
}

func UpdateUser(c *gin.Context) {
	id := c.Param("id")
	var req UpdateUserRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Get the role of the user making the request from context
	callerRole, _ := c.Get("role") // AuthMiddleware sets this

	// Only allow admin to update the role field
	if req.Role != nil && *req.Role != "" && callerRole != "admin" {
		c.JSON(http.StatusForbidden, gin.H{"error": "Forbidden: Only admin can update user roles"})
		return
	}

	// Construct the update query dynamically
	query := "UPDATE users SET updated_at = ?"
	args := []interface{}{time.Now()}

	if req.Email != nil {
		query += ", email = ?"
		args = append(args, *req.Email)
	}
	if req.Name != nil {
		query += ", name = ?"
		args = append(args, *req.Name)
	}
	if req.Avatar != nil { // Check if avatar is explicitly provided
		query += ", avatar = ?"
		args = append(args, *req.Avatar)
	}
	if req.Bio != nil {
		query += ", bio = ?"
		args = append(args, *req.Bio)
	}
	if req.Role != nil && callerRole == "admin" { // Only update role if provided AND caller is admin
		query += ", role = ?"
		args = append(args, *req.Role)
	}

	query += " WHERE id = ?"
	args = append(args, id)

	if _, err := database.DB.Exec(query, args...); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var user models.User
	if err := database.DB.Get(&user, "SELECT id, email, name, role, avatar, bio, created_at, updated_at FROM users WHERE id = ?", id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, user)
}

func DeleteUser(c *gin.Context) {
	id := c.Param("id")
	if _, err := database.DB.Exec("DELETE FROM users WHERE id = ?", id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "User deleted successfully"})
}

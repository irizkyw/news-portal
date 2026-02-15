package handlers

import (
	"database/sql"
	"net/http"
	"news-portal/backend/database"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

type Post struct {
	ID        int       `db:"id"`
	Title     string    `db:"title"`
	Slug      string    `db:"slug"`
	Content   string    `db:"content"`
	Published bool      `db:"published"`
	AuthorID  int       `db:"author_id"`
	CreatedAt time.Time `db:"created_at"`
	UpdatedAt time.Time `db:"updated_at"`
}

func GetPosts(c *gin.Context) {
	var posts []Post
	if err := database.DB.Select(&posts, "SELECT * FROM posts"); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, posts)
}

func GetPost(c *gin.Context) {
	slug := c.Param("slug")
	var post Post
	if err := database.DB.Get(&post, "SELECT * FROM posts WHERE slug = ?", slug); err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"error": "Post not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, post)
}

type CreatePostRequest struct {
	Title     string `json:"title" binding:"required"`
	Content   string `json:"content"`
	Published bool   `json:"published"`
	AuthorID  int    `json:"authorId" binding:"required"`
}

func CreatePost(c *gin.Context) {
	var req CreatePostRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	slug := strings.ToLower(strings.ReplaceAll(req.Title, " ", "-"))

	result, err := database.DB.Exec("INSERT INTO posts (title, slug, content, published, author_id) VALUES (?, ?, ?, ?, ?)", req.Title, slug, req.Content, req.Published, req.AuthorID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	id, err := result.LastInsertId()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var post Post
	if err := database.DB.Get(&post, "SELECT * FROM posts WHERE id = ?", id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, post)
}

type UpdatePostRequest struct {
	Title     string `json:"title"`
	Content   string `json:"content"`
	Published bool   `json:"published"`
}

func UpdatePost(c *gin.Context) {
	id := c.Param("id")
	var req UpdatePostRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	slug := strings.ToLower(strings.ReplaceAll(req.Title, " ", "-"))

	if _, err := database.DB.Exec("UPDATE posts SET title = ?, slug = ?, content = ?, published = ? WHERE id = ?", req.Title, slug, req.Content, req.Published, id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var post Post
	if err := database.DB.Get(&post, "SELECT * FROM posts WHERE id = ?", id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, post)
}

func DeletePost(c *gin.Context) {
	id := c.Param("id")
	if _, err := database.DB.Exec("DELETE FROM posts WHERE id = ?", id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Post deleted successfully"})
}

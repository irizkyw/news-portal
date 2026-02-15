package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type SubscribeRequest struct {
	Email string `json:"email" binding:"required,email"`
}

// SubscribeToNewsletter handles newsletter subscription requests.
// This is a placeholder. In a real application, you would save the email to a database.
func SubscribeToNewsletter(c *gin.Context) {
	var req SubscribeRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// TODO: Implement actual newsletter subscription logic, e.g., save to DB
	// For now, just log and return success
	// log.Printf("New newsletter subscription: %s", req.Email)

	c.JSON(http.StatusOK, gin.H{"message": "Subscription successful", "email": req.Email})
}

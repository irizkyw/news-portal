package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"net/http/httptest"
	"news-portal/backend/database"
	"os"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func TestMain(m *testing.M) {
	gin.SetMode(gin.TestMode)
	if err := database.Connect(true); err != nil {
		log.Printf("Failed to connect to test database: %v", err)
		os.Exit(1)
	}
	// Run tests
	exitCode := m.Run()

	// Clean up test database
	if _, err := database.DB.Exec("DROP DATABASE `news_portal_test`"); err != nil {
		log.Printf("Failed to drop test database: %v", err)
	}
	os.Exit(exitCode)
}

func TestGetUsers(t *testing.T) {
	// Create a new router
	router := gin.Default()
	router.GET("/users", GetUsers)

	// Create a new request
	req, _ := http.NewRequest("GET", "/users", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	// Check the response
	assert.Equal(t, http.StatusOK, w.Code)

	var users []User
	err := json.Unmarshal(w.Body.Bytes(), &users)
	assert.NoError(t, err)
}

package main

import (
	"log"
	"news-portal/backend/auth"
	"news-portal/backend/database"
	"news-portal/backend/handlers"
	"news-portal/backend/seed"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	if err := database.Connect(false); err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	seed.Seed()

	router.POST("/login", auth.Login)

	// User routes
	userRoutes := router.Group("/users")
	userRoutes.Use(auth.AuthMiddleware())
	{
		userRoutes.GET("/", handlers.GetUsers)
		userRoutes.GET("/:id", handlers.GetUser)
		userRoutes.POST("/", handlers.CreateUser)
		userRoutes.PUT("/:id", handlers.UpdateUser)
		userRoutes.DELETE("/:id", handlers.DeleteUser)
	}

	// Post routes
	postRoutes := router.Group("/posts")
	{
		postRoutes.GET("/", handlers.GetPosts)
		postRoutes.GET("/:slug", handlers.GetPost)
		postRoutes.POST("/", auth.AuthMiddleware(), handlers.CreatePost)
		postRoutes.PUT("/:id", auth.AuthMiddleware(), handlers.UpdatePost)
		postRoutes.DELETE("/:id", auth.AuthMiddleware(), handlers.DeletePost)
	}

	// Category routes
	categoryRoutes := router.Group("/categories")
	{
		categoryRoutes.GET("/", handlers.GetCategories)
		categoryRoutes.GET("/:slug", handlers.GetCategory)
		categoryRoutes.POST("/", auth.AuthMiddleware(), handlers.CreateCategory)
		categoryRoutes.PUT("/:id", auth.AuthMiddleware(), handlers.UpdateCategory)
		categoryRoutes.DELETE("/:id", auth.AuthMiddleware(), handlers.DeleteCategory)
	}

	router.Run(":8080")
}

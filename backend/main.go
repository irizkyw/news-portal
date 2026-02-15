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
		userRoutes.GET("/", auth.AuthzMiddleware("admin"), handlers.GetUsers)
		userRoutes.POST("/", auth.AuthzMiddleware("admin"), handlers.CreateUser) // Admin can create users
		userRoutes.GET("/:id", handlers.GetUser)                                 // A user can get their own profile, admin can get any
		userRoutes.PUT("/:id", auth.AuthzMiddleware("admin"), handlers.UpdateUser)
		userRoutes.DELETE("/:id", auth.AuthzMiddleware("admin"), handlers.DeleteUser)
	}

	// Post routes
	postRoutes := router.Group("/posts")
	{
		postRoutes.GET("/", handlers.GetPosts)
		postRoutes.GET("/:slug", handlers.GetPost)
		postRoutes.POST("/", auth.AuthMiddleware(), auth.AuthzMiddleware("admin", "editor"), handlers.CreatePost)
		postRoutes.PUT("/:id", auth.AuthMiddleware(), auth.AuthzMiddleware("admin", "editor"), handlers.UpdatePost)
		postRoutes.DELETE("/:id", auth.AuthMiddleware(), auth.AuthzMiddleware("admin", "editor"), handlers.DeletePost)
	}

	// Category routes
	categoryRoutes := router.Group("/categories")
	{
		categoryRoutes.GET("/", handlers.GetCategories)
		categoryRoutes.GET("/:slug", handlers.GetCategory)
		categoryRoutes.POST("/", auth.AuthMiddleware(), auth.AuthzMiddleware("admin"), handlers.CreateCategory)
		categoryRoutes.PUT("/:id", auth.AuthMiddleware(), auth.AuthzMiddleware("admin"), handlers.UpdateCategory)
		categoryRoutes.DELETE("/:id", auth.AuthMiddleware(), auth.AuthzMiddleware("admin"), handlers.DeleteCategory)
	}

	router.Run(":8080")
}

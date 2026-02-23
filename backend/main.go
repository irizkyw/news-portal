package main

import (
	"log"
	"news-portal/backend/auth"
	"news-portal/backend/database"
	"news-portal/backend/handlers"
	"news-portal/backend/seed"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	// Kembalikan ke true (default) agar Gin menangani redirect rute secara otomatis.
	// Ini mencegah rute terputus sebelum mencapai middleware CORS.
	router.RedirectTrailingSlash = true

	// Konfigurasi CORS Middleware yang diperbarui
	config := cors.DefaultConfig()
	// config.AllowOrigins = []string{"*"}
	config.AllowOrigins = []string{"http://localhost:3000"}
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Authorization", "Accept"}
	config.AllowCredentials = true

	// Pastikan middleware ini dipasang paling awal sebelum rute lain
	router.Use(cors.New(config))

	// Inisialisasi Database
	if err := database.Connect(false); err != nil {
		log.Fatalf("Gagal terhubung ke database: %v", err)
	}
	seed.Seed()

	// Public Routes
	router.POST("/login", auth.Login)
	router.POST("/register", auth.Register)
	router.POST("/subscribe", handlers.SubscribeToNewsletter)

	// User routes
	userRoutes := router.Group("/users")
	userRoutes.Use(auth.AuthMiddleware())
	{
		userRoutes.GET("", auth.AuthzMiddleware("admin"), handlers.GetUsers)
		userRoutes.POST("", auth.AuthzMiddleware("admin"), handlers.CreateUser)
		userRoutes.GET("/:id", handlers.GetUser)
		userRoutes.PUT("/:id", auth.AuthzMiddleware("admin"), handlers.UpdateUser)
		userRoutes.DELETE("/:id", auth.AuthzMiddleware("admin"), handlers.DeleteUser)
		userRoutes.PUT("/me/password", handlers.ChangePassword)
	}

	// Post routes
	postRoutes := router.Group("/posts")
	{
		postRoutes.GET("", handlers.GetPosts)
		postRoutes.GET("/:slug", handlers.GetPost)
		postRoutes.POST("", auth.AuthMiddleware(), auth.AuthzMiddleware("admin", "editor"), handlers.CreatePost)
		postRoutes.PUT("/:id", auth.AuthMiddleware(), auth.AuthzMiddleware("admin", "editor"), handlers.UpdatePost)
		postRoutes.DELETE("/:id", auth.AuthMiddleware(), auth.AuthzMiddleware("admin", "editor"), handlers.DeletePost)
	}

	// Category routes
	categoryRoutes := router.Group("/categories")
	{
		categoryRoutes.GET("", handlers.GetCategories)
		categoryRoutes.GET("/:slug", handlers.GetCategory)
		categoryRoutes.POST("", auth.AuthMiddleware(), auth.AuthzMiddleware("admin"), handlers.CreateCategory)
		categoryRoutes.PUT("/:id", auth.AuthMiddleware(), auth.AuthzMiddleware("admin"), handlers.UpdateCategory)
		categoryRoutes.DELETE("/:id", auth.AuthMiddleware(), auth.AuthzMiddleware("admin"), handlers.DeleteCategory)
	}

	// Stats routes
	router.GET("/stats/dashboard", auth.AuthMiddleware(), auth.AuthzMiddleware("admin", "editor"), handlers.GetDashboardStats)
	router.GET("/stats/traffic", auth.AuthMiddleware(), auth.AuthzMiddleware("admin", "editor"), handlers.GetWeeklyTraffic)

	// Bookmark routes
	bookmarkRoutes := router.Group("/bookmarks")
	bookmarkRoutes.Use(auth.AuthMiddleware())
	{
		bookmarkRoutes.GET("", handlers.GetBookmarks)
		bookmarkRoutes.POST("/:id", handlers.ToggleBookmark)
		bookmarkRoutes.GET("/status/:id", handlers.CheckBookmarkStatus)
	}

	// Jalankan server
	log.Println("Server berjalan di http://localhost:8080")
	router.Run(":8080")
}

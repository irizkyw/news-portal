package seed

import (
	"log"
	"news-portal/backend/database"
	"golang.org/x/crypto/bcrypt"
)

func Seed() {
	if err := database.DB.Ping(); err != nil {
		log.Fatalf("failed to ping database: %v", err)
	}

	seedUsers()
	seedCategories()
	seedPosts()
}

func seedUsers() {
	users := []struct {
		Email    string
		Name     string
		Password string
	}{
		{"sarah.j@example.com", "Sarah Johnson", "password123"},
		{"michael.c@example.com", "Michael Chen", "password123"},
		{"emily.r@example.com", "Emily Rodriguez", "password123"},
		{"david.k@example.com", "David Kim", "password123"},
	}

	for _, user := range users {
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
		if err != nil {
			log.Fatalf("failed to hash password: %v", err)
		}
		if _, err := database.DB.Exec("INSERT INTO users (email, name, password) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE name=name", user.Email, user.Name, string(hashedPassword)); err != nil {
			log.Printf("failed to seed user %s: %v", user.Email, err)
		}
	}
}

func seedCategories() {
	categories := []string{
		"Politics", "Technology", "Sports", "Lifestyle", "Business",
		"Health", "Science", "Travel", "Food", "Education", "Art", "Gaming",
	}

	for _, category := range categories {
		if _, err := database.DB.Exec("INSERT INTO categories (name) VALUES (?) ON DUPLICATE KEY UPDATE name=name", category); err != nil {
			log.Printf("failed to seed category %s: %v", category, err)
		}
	}
}

func seedPosts() {
	// This is a simplified version of the mock data.
	// In a real application, you would parse the full data.
	posts := []struct {
		Title     string
		Content   string
		Published bool
		AuthorID  int
	}{
		{"Breaking: Major Climate Summit Reaches Historic Agreement", "<p>Content</p>", true, 1},
		{"AI Revolution: New Language Model Surpasses Human Performance", "<p>Content</p>", true, 2},
	}

	for _, post := range posts {
		if _, err := database.DB.Exec("INSERT INTO posts (title, content, published, author_id) VALUES (?, ?, ?, ?)", post.Title, post.Content, post.Published, post.AuthorID); err != nil {
			log.Printf("failed to seed post %s: %v", post.Title, err)
		}
	}
}


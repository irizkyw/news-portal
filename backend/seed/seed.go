package seed

import (
	"database/sql"
	"fmt"
	"log"
	"news-portal/backend/database"

	// "news-portal/backend/models" // Import models package
	"strings"
	"time"

	// "github.com/jmoiron/sqlx"
	"golang.org/x/crypto/bcrypt"
)

func Seed() {
	if err := database.DB.Ping(); err != nil {
		log.Fatalf("failed to ping database: %v", err)
	}

	// It's good practice to clear tables that have foreign key constraints
	// before seeding to avoid conflicts, especially during development.
	// Ensure you understand the implications in production.
	clearTables()

	userIDs := seedUsers()
	categoryIDs := seedCategories()
	seedPosts(userIDs, categoryIDs)
}

func clearTables() {
	// Order matters due to foreign key constraints
	tables := []string{"post_tags", "post_categories", "posts", "categories", "users"}
	for _, table := range tables {
		if _, err := database.DB.Exec(fmt.Sprintf("DELETE FROM %s", table)); err != nil {
			log.Printf("Failed to clear table %s: %v", table, err)
		}
		// Reset auto-increment. Note: This might vary per database. For MySQL.
		if _, err := database.DB.Exec(fmt.Sprintf("ALTER TABLE %s AUTO_INCREMENT = 1", table)); err != nil {
			log.Printf("Failed to reset auto-increment for table %s: %v", table, err)
		}
	}
	log.Println("Cleared existing data from tables.")
}

// seedUsers seeds user data and returns a map of email to user ID
func seedUsers() map[string]int {
	users := []struct {
		Email    string
		Name     string
		Password string
		Role     string
	}{
		{"admin@example.com", "Admin User", "adminpass", "admin"}, // Admin user
		{"sarah.j@example.com", "Sarah Johnson", "password123", "editor"},
		{"michael.c@example.com", "Michael Chen", "password123", "user"},
		{"emily.r@example.com", "Emily Rodriguez", "password123", "user"},
		{"david.k@example.com", "David Kim", "password123", "user"},
	}

	userIDs := make(map[string]int)

	for _, user := range users {
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
		if err != nil {
			log.Fatalf("failed to hash password: %v", err)
		}
		result, err := database.DB.Exec("INSERT INTO users (email, name, password, role) VALUES (?, ?, ?, ?)", user.Email, user.Name, string(hashedPassword), user.Role)
		if err != nil {
			log.Printf("failed to seed user %s: %v", user.Email, err)
			continue
		}
		id, _ := result.LastInsertId()
		userIDs[user.Email] = int(id)
	}
	log.Println("Seeded users.")
	return userIDs
}

// seedCategories seeds category data and returns a map of name to category ID
func seedCategories() map[string]int {
	categoryNames := []string{
		"Politics", "Technology", "Sports", "Lifestyle", "Business",
		"Health", "Science", "Travel", "Food", "Education", "Art", "Gaming",
	}

	categoryIDs := make(map[string]int)

	for _, name := range categoryNames {
		slug := strings.ToLower(strings.ReplaceAll(name, " ", "-"))
		color := fmt.Sprintf("#%06x", time.Now().UnixNano()%0xFFFFFF) // Random color
		result, err := database.DB.Exec("INSERT INTO categories (name, slug, color) VALUES (?, ?, ?)", name, slug, color)
		if err != nil {
			log.Printf("failed to seed category %s: %v", name, err)
			continue
		}
		id, _ := result.LastInsertId()
		categoryIDs[name] = int(id)
	}
	log.Println("Seeded categories.")
	return categoryIDs
}

// seedPosts seeds post data
func seedPosts(userIDs map[string]int, categoryIDs map[string]int) {
	postsData := []struct {
		Title         string
		Excerpt       string
		Content       string
		FeaturedImage string
		Status        string
		IsFeatured    bool
		IsPopular     bool
		PublishedAt   time.Time
		AuthorEmail   string
		CategoryName  string
	}{
		{
			Title:         "Breaking: Major Climate Summit Reaches Historic Agreement",
			Excerpt:       "World leaders have concluded a landmark climate summit, signing an agreement aimed at drastic reductions in carbon emissions over the next decade. The accord, hailed as a critical step forward, includes commitments from major industrial nations to invest heavily in renewable energy and sustainable practices.",
			Content:       "<p>Details of the agreement include...</p>",
			FeaturedImage: "https://images.unsplash.com/photo-1542601098-8fc114cd6987?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			Status:        "published",
			IsFeatured:    true,
			IsPopular:     true,
			PublishedAt:   time.Now().Add(-24 * time.Hour), // Yesterday
			AuthorEmail:   "sarah.j@example.com",
			CategoryName:  "Politics",
		},
		{
			Title:         "AI Revolution: New Language Model Surpasses Human Performance",
			Excerpt:       "A groundbreaking artificial intelligence model has demonstrated unprecedented capabilities in natural language understanding and generation, outperforming human benchmarks in several complex linguistic tasks. Researchers believe this breakthrough could have profound implications for various industries.",
			Content:       "<p>The new model, named 'Cognito', utilizes a...</p>",
			FeaturedImage: "https://images.unsplash.com/photo-1581093550085-f04626154562?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			Status:        "published",
			IsFeatured:    false,
			IsPopular:     true,
			PublishedAt:   time.Now().Add(-48 * time.Hour), // Two days ago
			AuthorEmail:   "sarah.j@example.com",
			CategoryName:  "Technology",
		},
		{
			Title:         "Local Team Secures Championship in Thrilling Final Match",
			Excerpt:       "The city's beloved football team clinched the national championship title in a nail-biting final, with a last-minute goal securing their victory. Thousands of fans celebrated as the team lifted the trophy, marking a historic achievement for the club.",
			Content:       "<p>The match saw a dramatic comeback...</p>",
			FeaturedImage: "https://images.unsplash.com/photo-1521412644143-bc0b299e19c9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			Status:        "published",
			IsFeatured:    true,
			IsPopular:     false,
			PublishedAt:   time.Now().Add(-72 * time.Hour), // Three days ago
			AuthorEmail:   "sarah.j@example.com",
			CategoryName:  "Sports",
		},
		{
			Title:         "Exploring the Benefits of Mindful Living",
			Excerpt:       "In an increasingly fast-paced world, many are turning to mindful living as a way to reduce stress and improve overall well-being. This article delves into practical tips and scientific benefits of incorporating mindfulness into daily routines.",
			Content:       "<p>Mindfulness practices include...</p>",
			FeaturedImage: "https://images.unsplash.com/photo-1554160000-dc85edb15e37?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			Status:        "published",
			IsFeatured:    false,
			IsPopular:     false,
			PublishedAt:   time.Now().Add(-96 * time.Hour), // Four days ago
			AuthorEmail:   "michael.c@example.com",
			CategoryName:  "Lifestyle",
		},
		{
			Title:         "Tech Giants Announce Record-Breaking Quarterly Earnings",
			Excerpt:       "Major technology companies have reported exceptional financial results for the last quarter, driven by strong demand for cloud services and artificial intelligence. The robust performance has exceeded market expectations, signaling a healthy outlook for the tech sector.",
			Content:       "<p>Key highlights from the reports include...</p>",
			FeaturedImage: "https://images.unsplash.com/photo-1516321497487-e288fb197138?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			Status:        "published",
			IsFeatured:    false,
			IsPopular:     true,
			PublishedAt:   time.Now().Add(-120 * time.Hour), // Five days ago
			AuthorEmail:   "michael.c@example.com",
			CategoryName:  "Business",
		},
		{
			Title:         "Future of Space Travel: Commercial Missions and Mars Colonization",
			Excerpt:       "The next decade promises to be a pivotal era for space exploration, with several private companies and national agencies planning ambitious missions. Discussions are intensifying around commercial space tourism, asteroid mining, and the long-term goal of human colonization on Mars.",
			Content:       "<p>New propulsion technologies are...</p>",
			FeaturedImage: "https://images.unsplash.com/photo-1541808000949-06b25a2283a2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			Status:        "published",
			IsFeatured:    true,
			IsPopular:     false,
			PublishedAt:   time.Now().Add(-144 * time.Hour), // Six days ago
			AuthorEmail:   "emily.r@example.com",
			CategoryName:  "Science",
		},
		{
			Title:         "The Rise of Sustainable Fashion: What Consumers Need to Know",
			Excerpt:       "Sustainable fashion is gaining traction as consumers become more aware of the environmental and social impacts of the clothing industry. This guide explores what sustainable fashion truly means, how to identify ethical brands, and practical tips for a greener wardrobe.",
			Content:       "<p>Fast fashion's impact...</p>",
			FeaturedImage: "https://images.unsplash.com/photo-1525042211913-c97b87c71e21?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			Status:        "published",
			IsFeatured:    false,
			IsPopular:     false,
			PublishedAt:   time.Now().Add(-168 * time.Hour), // Seven days ago
			AuthorEmail:   "emily.r@example.com",
			CategoryName:  "Lifestyle",
		},
		{
			Title:         "New Study Links Coffee Consumption to Improved Brain Health",
			Excerpt:       "A recent long-term study has revealed a significant correlation between moderate coffee consumption and a reduced risk of cognitive decline in older adults. Researchers suggest that certain compounds in coffee may play a protective role in brain health.",
			Content:       "<p>The study, published in...</p>",
			FeaturedImage: "https://images.unsplash.com/photo-1510972583849-c120f26210f8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			Status:        "published",
			IsFeatured:    false,
			IsPopular:     false,
			PublishedAt:   time.Now().Add(-192 * time.Hour), // Eight days ago
			AuthorEmail:   "david.k@example.com",
			CategoryName:  "Health",
		},
		{
			Title:         "Draft Article: Future of Renewable Energy",
			Excerpt:       "An exploration into emerging technologies and policies shaping the future of renewable energy sources, including advanced solar, wind, and geothermal systems.",
			Content:       "<p>This article is currently a draft and under review.</p>",
			FeaturedImage: "https://images.unsplash.com/photo-1593506992669-e093557a5b3a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			Status:        "draft", // This post is a draft
			IsFeatured:    false,
			IsPopular:     false,
			PublishedAt:   time.Time{}, // Zero value for draft post
			AuthorEmail:   "admin@example.com",
			CategoryName:  "Technology",
		},
	}

	for _, postData := range postsData {
		authorID, ok := userIDs[postData.AuthorEmail]
		if !ok {
			log.Printf("Author %s not found for post '%s'", postData.AuthorEmail, postData.Title)
			continue
		}
		categoryID, ok := categoryIDs[postData.CategoryName]
		if !ok {
			log.Printf("Category %s not found for post '%s'", postData.CategoryName, postData.Title)
			continue
		}

		slug := strings.ToLower(strings.ReplaceAll(postData.Title, " ", "-"))

		// Handle published_at for draft posts
		var publishedAt sql.NullTime
		if postData.Status == "published" {
			publishedAt.Time = postData.PublishedAt
			publishedAt.Valid = true
		} else {
			publishedAt.Valid = false // Keep it null for drafts
		}

		result, err := database.DB.Exec(`
			INSERT INTO posts
			(title, slug, excerpt, content, featured_image, read_time, views, status, is_featured, is_popular, published_at, author_id)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			postData.Title, slug, postData.Excerpt, postData.Content, postData.FeaturedImage, 0, 0, postData.Status, postData.IsFeatured, postData.IsPopular, publishedAt, authorID)
		if err != nil {
			log.Printf("failed to seed post '%s': %v", postData.Title, err)
			continue
		}

		postID, _ := result.LastInsertId()
		if _, err := database.DB.Exec("INSERT INTO post_categories (post_id, category_id) VALUES (?, ?)", postID, categoryID); err != nil {
			log.Printf("failed to link post '%s' to category '%s': %v", postData.Title, postData.CategoryName, err)
		}
	}
	log.Println("Seeded posts.")
}

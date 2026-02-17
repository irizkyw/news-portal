package seed

import (
	"database/sql"
	"fmt"
	"log"
	"news-portal/backend/database"
	"strings"
	"time"

	"golang.org/x/crypto/bcrypt"
)

func Seed() {
	if err := database.DB.Ping(); err != nil {
		log.Fatalf("failed to ping database: %v", err)
	}

	clearTables()

	userIDs := seedUsers()
	categoryIDs := seedCategories()
	tagIDs := seedTags()
	seedPosts(userIDs, categoryIDs, tagIDs)
}

func clearTables() {
	tables := []string{"post_tags", "post_categories", "posts", "categories", "users", "tags"}
	for _, table := range tables {
		if _, err := database.DB.Exec(fmt.Sprintf("DELETE FROM %s", table)); err != nil {
			log.Printf("Failed to clear table %s: %v", table, err)
		}
		if _, err := database.DB.Exec(fmt.Sprintf("ALTER TABLE %s AUTO_INCREMENT = 1", table)); err != nil {
			log.Printf("Failed to reset auto-increment for table %s: %v", table, err)
		}
	}
	log.Println("Cleared existing data from tables.")
}

func seedUsers() map[string]int {
	users := []struct {
		Email    string
		Name     string
		Password string
		Role     string
	}{
		{"admin@example.com", "Admin Utama", "adminpass", "admin"},
		{"sarah.j@example.com", "Sarah Johnson", "password123", "editor"},
		{"michael.c@example.com", "Michael Chen", "password123", "user"},
		{"emily.r@example.com", "Emily Rodriguez", "password123", "user"},
		{"david.k@example.com", "David Kim", "password123", "user"},
	}

	userIDs := make(map[string]int)
	for _, user := range users {
		hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
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

func seedCategories() map[string]int {
	categoryNames := []string{
		"Politics", "Technology", "Sports", "Lifestyle", "Business",
		"Health", "Science", "Travel", "Food", "Education", "Art", "Gaming",
	}

	categoryIDs := make(map[string]int)
	colors := []string{"#EF4444", "#3B82F6", "#10B981", "#F59E0B", "#6366F1", "#8B5CF6", "#EC4899", "#14B8A6", "#F97316", "#06B6D4", "#84CC16", "#71717A"}

	for i, name := range categoryNames {
		slug := strings.ToLower(strings.ReplaceAll(name, " ", "-"))
		color := colors[i%len(colors)]
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

func seedTags() map[string]int {
	tagNames := []string{
		"Climate Change", "AI", "Technology", "Science", "Sports", "Football",
		"Fashion", "Sustainability", "Lifestyle", "Business", "Finance",
		"Health", "Social Media", "Youth", "World", "Renewable Energy", "Space", "Wellness",
	}

	tagIDs := make(map[string]int)
	for _, name := range tagNames {
		result, err := database.DB.Exec("INSERT INTO tags (name) VALUES (?)", name)
		if err != nil {
			log.Printf("failed to seed tag %s: %v", name, err)
			continue
		}
		id, _ := result.LastInsertId()
		tagIDs[name] = int(id)
	}
	log.Println("Seeded tags.")
	return tagIDs
}

func seedPosts(userIDs map[string]int, categoryIDs map[string]int, tagIDs map[string]int) {
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
		Tags          []string
		ReadTime      int
		Views         int
	}{
		{
			Title:         "Breaking: Major Climate Summit Reaches Historic Agreement",
			Excerpt:       "World leaders have concluded a landmark climate summit, signing an agreement aimed at drastic reductions in carbon emissions over the next decade.",
			Content:       "<h3>Global Impact</h3><p>The agreement signed in Geneva marks a turning point for global environmental policy. Major industrial nations have committed to a 50% reduction in emissions by 2035.</p>",
			FeaturedImage: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1000",
			Status:        "published",
			IsFeatured:    true,
			IsPopular:     true,
			PublishedAt:   time.Now().Add(-24 * time.Hour),
			AuthorEmail:   "sarah.j@example.com",
			CategoryName:  "Politics",
			Tags:          []string{"Climate Change", "World"},
			ReadTime:      5,
			Views:         15420,
		},
		{
			Title:         "AI Revolution: New Language Model Surpasses Human Performance",
			Excerpt:       "A groundbreaking artificial intelligence model has demonstrated unprecedented capabilities in natural language understanding.",
			Content:       "<p>Researchers at the Silicon Valley AI Lab announced that their newest model, <strong>Nexus-1</strong>, has achieved a score of 98.5% on standard linguistic tests.</p>",
			FeaturedImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000",
			Status:        "published",
			IsFeatured:    false,
			IsPopular:     true,
			PublishedAt:   time.Now().Add(-48 * time.Hour),
			AuthorEmail:   "sarah.j@example.com",
			CategoryName:  "Technology",
			Tags:          []string{"AI", "Technology", "Science"},
			ReadTime:      7,
			Views:         23150,
		},
		{
			Title:         "The Future of Space Travel: Mars and Beyond",
			Excerpt:       "Private space agencies are preparing for the first manned mission to Mars, scheduled for late 2029.",
			Content:       "<p>The mission will utilize the latest Ion-Propulsion engines, reducing travel time by nearly 40% compared to traditional rocket engines.</p>",
			FeaturedImage: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=1000",
			Status:        "published",
			IsFeatured:    true,
			IsPopular:     false,
			PublishedAt:   time.Now().Add(-144 * time.Hour),
			AuthorEmail:   "emily.r@example.com",
			CategoryName:  "Science",
			Tags:          []string{"Space", "Science", "Technology"},
			ReadTime:      7,
			Views:         14000,
		},
		{
			Title:         "Minimalist Design: The Secret to Productivity",
			Excerpt:       "How simplifying your workspace can lead to clearer thinking and faster execution in your daily tasks.",
			Content:       "<p>Minimalism is not just about aesthetics; it's about removing the cognitive load of unnecessary choices from your environment.</p>",
			FeaturedImage: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=1000",
			Status:        "published",
			IsFeatured:    false,
			IsPopular:     false,
			PublishedAt:   time.Now().Add(-96 * time.Hour),
			AuthorEmail:   "michael.c@example.com",
			CategoryName:  "Lifestyle",
			Tags:          []string{"Lifestyle", "Wellness"},
			ReadTime:      6,
			Views:         12340,
		},
		{
			Title:         "Renewable Energy Trends to Watch in 2024",
			Excerpt:       "From transparent solar panels to tidal energy, here are the technologies that will dominate the market this year.",
			Content:       "<p>This draft covers the emerging trends in the green energy sector, specifically focusing on residential implementation.</p>",
			FeaturedImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=1000",
			Status:        "draft",
			IsFeatured:    false,
			IsPopular:     false,
			PublishedAt:   time.Time{},
			AuthorEmail:   "admin@example.com",
			CategoryName:  "Technology",
			Tags:          []string{"Renewable Energy", "Technology"},
			ReadTime:      8,
			Views:         500,
		},
	}

	for _, postData := range postsData {
		authorID := userIDs[postData.AuthorEmail]
		categoryID := categoryIDs[postData.CategoryName]
		slug := strings.ToLower(strings.ReplaceAll(postData.Title, " ", "-"))
		slug = strings.ReplaceAll(slug, ":", "") // Clean slug

		var publishedAt sql.NullTime
		if postData.Status == "published" {
			publishedAt.Time = postData.PublishedAt
			publishedAt.Valid = true
		}

		result, err := database.DB.Exec(`
			INSERT INTO posts (title, slug, excerpt, content, featured_image, read_time, views, status, is_featured, is_popular, published_at, author_id)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			postData.Title, slug, postData.Excerpt, postData.Content, postData.FeaturedImage, postData.ReadTime, postData.Views, postData.Status, postData.IsFeatured, postData.IsPopular, publishedAt, authorID)

		if err != nil {
			log.Printf("failed to seed post '%s': %v", postData.Title, err)
			continue
		}

		postID, _ := result.LastInsertId()
		database.DB.Exec("INSERT INTO post_categories (post_id, category_id) VALUES (?, ?)", postID, categoryID)

		for _, tagName := range postData.Tags {
			if tagID, ok := tagIDs[tagName]; ok {
				database.DB.Exec("INSERT INTO post_tags (post_id, tag_id) VALUES (?, ?)", postID, tagID)
			}
		}
	}
	log.Println("Seeded posts successfully.")
}

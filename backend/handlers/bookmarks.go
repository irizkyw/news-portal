package handlers

import (
	"database/sql"
	"log"
	"net/http"
	"news-portal/backend/database"
	"news-portal/backend/models"

	"github.com/gin-gonic/gin"
)

func ToggleBookmark(c *gin.Context) {
	defer func() {
		if r := recover(); r != nil {
			log.Printf("Panic in ToggleBookmark: %v", r)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error (Panic)"})
		}
	}()

	postID := c.Param("id")
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}
	
	log.Printf("Toggling bookmark for user %v on post %v", userID, postID)

	var existsInBookmarks bool
	err := database.DB.Get(&existsInBookmarks, "SELECT EXISTS(SELECT 1 FROM bookmarks WHERE user_id = ? AND post_id = ?)", userID, postID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if existsInBookmarks {
		// Remove from bookmarks
		_, err = database.DB.Exec("DELETE FROM bookmarks WHERE user_id = ? AND post_id = ?", userID, postID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "Bookmark removed", "isBookmarked": false})
	} else {
		// Add to bookmarks
		_, err = database.DB.Exec("INSERT INTO bookmarks (user_id, post_id) VALUES (?, ?)", userID, postID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "Bookmark added", "isBookmarked": true})
	}
}

func GetBookmarks(c *gin.Context) {
	defer func() {
		if r := recover(); r != nil {
			log.Printf("Panic in GetBookmarks: %v", r)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error (Panic)"})
		}
	}()

	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}
	
	log.Printf("Fetching bookmarks for user ID: %v", userID)

	query := `
		SELECT
			p.id, p.title, p.slug, p.excerpt, '' AS content, p.featured_image, p.read_time, p.views, p.status, p.is_featured, p.is_popular, p.published_at, p.created_at, p.updated_at,
			a.id AS author_id, a.name AS author_name, a.email AS author_email, a.avatar AS author_avatar, a.bio AS author_bio,
			c.id AS category_id, c.name AS category_name, c.slug AS category_slug, c.color AS category_color,
			GROUP_CONCAT(t.name SEPARATOR ',') AS tags
		FROM bookmarks b
		JOIN posts p ON b.post_id = p.id
		LEFT JOIN users a ON p.author_id = a.id
		LEFT JOIN post_categories pc ON p.id = pc.post_id
		LEFT JOIN categories c ON pc.category_id = c.id
		LEFT JOIN post_tags pt ON p.id = pt.post_id
		LEFT JOIN tags t ON pt.tag_id = t.id
		WHERE b.user_id = ?
		GROUP BY p.id, a.id, c.id
	`

	var dbPosts []models.Post
	if err := database.DB.Select(&dbPosts, query, userID); err != nil {
		log.Printf("Error fetching bookmarks for user %v: %v", userID, err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database query failed: " + err.Error()})
		return
	}

	// Transform the flat DB structure to the nested JSON structure
	postsResponse := make([]PostResponse, len(dbPosts))
	for i, p := range dbPosts {
		postsResponse[i] = PostResponse{
			ID:            p.ID,
			Title:         p.Title,
			Slug:          p.Slug,
			Excerpt:       p.Excerpt,
			FeaturedImage: p.FeaturedImage,
			ReadTime:      p.ReadTime,
			Views:         p.Views,
			Status:        p.Status,
			IsFeatured:    p.IsFeatured,
			IsPopular:     p.IsPopular,
			PublishedAt:   p.PublishedAt,
			CreatedAt:     p.CreatedAt,
			UpdatedAt:     p.UpdatedAt,
		}

		// Safely build the nested Author object
		if p.AuthorID != nil {
			author := &AuthorResponse{ID: *p.AuthorID}
			if p.AuthorName != nil {
				author.Name = *p.AuthorName
			}
			if p.AuthorEmail != nil {
				author.Email = *p.AuthorEmail
			}
			if p.AuthorAvatar != nil {
				author.Avatar = *p.AuthorAvatar
			}
			postsResponse[i].Author = author
		}

		// Safely build the nested Category object
		if p.CategoryID != nil {
			category := &CategoryResponse{ID: *p.CategoryID}
			if p.CategoryName != nil {
				category.Name = *p.CategoryName
			}
			if p.CategorySlug != nil {
				category.Slug = *p.CategorySlug
			}
			if p.CategoryColor != nil {
				category.Color = *p.CategoryColor
			}
			postsResponse[i].Category = category
		}

		// Populate Tags
		if len(p.Tags) > 0 {
			postsResponse[i].Tags = p.Tags
		}
	}

	c.JSON(http.StatusOK, postsResponse)
}

func CheckBookmarkStatus(c *gin.Context) {
	postID := c.Param("id")
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusOK, gin.H{"isBookmarked": false})
		return
	}

	var existsInBookmarks bool
	err := database.DB.Get(&existsInBookmarks, "SELECT EXISTS(SELECT 1 FROM bookmarks WHERE user_id = ? AND post_id = ?)", userID, postID)
	if err != nil && err != sql.ErrNoRows {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"isBookmarked": existsInBookmarks})
}

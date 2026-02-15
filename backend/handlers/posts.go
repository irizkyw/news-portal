package handlers

import (
	"database/sql"
	"log"
	"net/http"
	"news-portal/backend/database"
	"news-portal/backend/models" // Import models package
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

func GetPosts(c *gin.Context) {
	var posts []models.Post
	query := `
		SELECT
			p.id, p.title, p.slug, p.excerpt, p.content, p.featured_image, p.read_time, p.views, p.status, p.is_featured, p.is_popular, p.published_at, p.created_at, p.updated_at,
			a.id AS author_id, a.name AS author_name, a.email AS author_email, a.avatar AS author_avatar, a.bio AS author_bio, a.created_at AS author_created_at, a.updated_at AS author_updated_at,
			c.id AS category_id, c.name AS category_name, c.slug AS category_slug, c.color AS category_color
		FROM posts p
		LEFT JOIN users a ON p.author_id = a.id
		LEFT JOIN post_categories pc ON p.id = pc.post_id
		LEFT JOIN categories c ON pc.category_id = c.id
		WHERE p.status = 'published'
	`
	// Handle query parameters for filtering and sorting
	// Example: ?isFeatured=true&limit=3
	isFeatured := c.Query("isFeatured")
	limit := c.Query("limit")
	sortBy := c.Query("sortBy")

	args := []interface{}{}

	if isFeatured == "true" {
		query += " AND p.is_featured = TRUE"
	}

	if sortBy == "popular" {
		query += " ORDER BY p.views DESC"
	} else if sortBy == "latest" || sortBy == "" { // Default to latest
		query += " ORDER BY p.published_at DESC"
	}

	if limit != "" {
		query += " LIMIT ?"
		args = append(args, limit)
	}

	if err := database.DB.Select(&posts, query, args...); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, posts)
}

func GetPost(c *gin.Context) {
	slug := c.Param("slug")
	var post models.Post
	query := `
		SELECT
			p.id, p.title, p.slug, p.excerpt, p.content, p.featured_image, p.read_time, p.views, p.status, p.is_featured, p.is_popular, p.published_at, p.created_at, p.updated_at,
			a.id AS author_id, a.name AS author_name, a.email AS author_email, a.avatar AS author_avatar, a.bio AS author_bio, a.created_at AS author_created_at, a.updated_at AS author_updated_at,
			c.id AS category_id, c.name AS category_name, c.slug AS category_slug, c.color AS category_color
		FROM posts p
		LEFT JOIN users a ON p.author_id = a.id
		LEFT JOIN post_categories pc ON p.id = pc.post_id
		LEFT JOIN categories c ON pc.category_id = c.id
		WHERE p.slug = ? AND p.status = 'published'
	`
	if err := database.DB.Get(&post, query, slug); err != nil {
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
	Title         string     `json:"title" binding:"required"`
	Excerpt       string     `json:"excerpt"`
	Content       string     `json:"content"`
	FeaturedImage string     `json:"featuredImage"`
	Status        string     `json:"status"`
	IsFeatured    bool       `json:"isFeatured"`
	IsPopular     bool       `json:"isPopular"`
	PublishedAt   *time.Time `json:"publishedAt"` // Allow null for draft posts
	AuthorID      int        `json:"authorId" binding:"required"`
	CategoryID    string     `json:"categoryId"`
}

func CreatePost(c *gin.Context) {
	var req CreatePostRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	slug := strings.ToLower(strings.ReplaceAll(req.Title, " ", "-"))

	// Set default values if not provided
	if req.Status == "" {
		req.Status = "draft"
	}
	if req.PublishedAt == nil && req.Status == "published" {
		now := time.Now()
		req.PublishedAt = &now
	}

	result, err := database.DB.Exec(`
		INSERT INTO posts
		(title, slug, excerpt, content, featured_image, status, is_featured, is_popular, published_at, author_id)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
		req.Title, slug, req.Excerpt, req.Content, req.FeaturedImage, req.Status, req.IsFeatured, req.IsPopular, req.PublishedAt, req.AuthorID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	postID, err := result.LastInsertId()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Link post to category if categoryId is provided
	if req.CategoryID != "" {
		if _, err := database.DB.Exec("INSERT INTO post_categories (post_id, category_id) VALUES (?, ?)", postID, req.CategoryID); err != nil {
			log.Printf("failed to link post to category: %v", err) // Log but don't fail the whole request
		}
	}

	var post models.Post
	if err := database.DB.Get(&post, `
		SELECT
			p.id, p.title, p.slug, p.excerpt, p.content, p.featured_image, p.read_time, p.views, p.status, p.is_featured, p.is_popular, p.published_at, p.created_at, p.updated_at,
			a.id AS author_id, a.name AS author_name, a.email AS author_email, a.avatar AS author_avatar, a.bio AS author_bio, a.created_at AS author_created_at, a.updated_at AS author_updated_at,
			c.id AS category_id, c.name AS category_name, c.slug AS category_slug, c.color AS category_color
		FROM posts p
		LEFT JOIN users a ON p.author_id = a.id
		LEFT JOIN post_categories pc ON p.id = pc.post_id
		LEFT JOIN categories c ON pc.category_id = c.id
		WHERE p.id = ?`, postID); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, post)
}

type UpdatePostRequest struct {
	Title         *string    `json:"title"`
	Excerpt       *string    `json:"excerpt"`
	Content       *string    `json:"content"`
	FeaturedImage *string    `json:"featuredImage"`
	Status        *string    `json:"status"`
	IsFeatured    *bool      `json:"isFeatured"`
	IsPopular     *bool      `json:"isPopular"`
	PublishedAt   *time.Time `json:"publishedAt"`
	CategoryID    *string    `json:"categoryId"`
}

func UpdatePost(c *gin.Context) {
	id := c.Param("id")
	var req UpdatePostRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Dynamically build update query
	setClauses := []string{"updated_at = ?"}
	args := []interface{}{time.Now()}

	if req.Title != nil {
		setClauses = append(setClauses, "title = ?")
		args = append(args, *req.Title)
	}
	if req.Excerpt != nil {
		setClauses = append(setClauses, "excerpt = ?")
		args = append(args, *req.Excerpt)
	}
	if req.Content != nil {
		setClauses = append(setClauses, "content = ?")
		args = append(args, *req.Content)
	}
	if req.FeaturedImage != nil {
		setClauses = append(setClauses, "featured_image = ?")
		args = append(args, *req.FeaturedImage)
	}
	if req.Status != nil {
		setClauses = append(setClauses, "status = ?")
		args = append(args, *req.Status)
	}
	if req.IsFeatured != nil {
		setClauses = append(setClauses, "is_featured = ?")
		args = append(args, *req.IsFeatured)
	}
	if req.IsPopular != nil {
		setClauses = append(setClauses, "is_popular = ?")
		args = append(args, *req.IsPopular)
	}
	if req.PublishedAt != nil {
		setClauses = append(setClauses, "published_at = ?")
		args = append(args, *req.PublishedAt)
	}

	// Handle slug update if title is being updated
	if req.Title != nil {
		slug := strings.ToLower(strings.ReplaceAll(*req.Title, " ", "-"))
		setClauses = append(setClauses, "slug = ?")
		args = append(args, slug)
	}

	query := "UPDATE posts SET " + strings.Join(setClauses, ", ") + " WHERE id = ?"
	args = append(args, id)

	if _, err := database.DB.Exec(query, args...); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Update category link if categoryId is provided
	if req.CategoryID != nil {
		// First, delete existing category links for this post
		if _, err := database.DB.Exec("DELETE FROM post_categories WHERE post_id = ?", id); err != nil {
			log.Printf("failed to delete old post categories: %v", err)
		}
		// Then, insert the new category link
		if _, err := database.DB.Exec("INSERT INTO post_categories (post_id, category_id) VALUES (?, ?)", id, *req.CategoryID); err != nil {
			log.Printf("failed to link post to new category: %v", err)
		}
	}

	var post models.Post
	if err := database.DB.Get(&post, `
		SELECT
			p.id, p.title, p.slug, p.excerpt, p.content, p.featured_image, p.read_time, p.views, p.status, p.is_featured, p.is_popular, p.published_at, p.created_at, p.updated_at,
			a.id AS author_id, a.name AS author_name, a.email AS author_email, a.avatar AS author_avatar, a.bio AS author_bio, a.created_at AS author_created_at, a.updated_at AS author_updated_at,
			c.id AS category_id, c.name AS category_name, c.slug AS category_slug, c.color AS category_color
		FROM posts p
		LEFT JOIN users a ON p.author_id = a.id
		LEFT JOIN post_categories pc ON p.id = pc.post_id
		LEFT JOIN categories c ON pc.category_id = c.id
		WHERE p.id = ?`, id); err != nil {
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

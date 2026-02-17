package handlers

import (
	"database/sql"
	"log"
	"net/http"
	"news-portal/backend/database"
	"news-portal/backend/models"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

// Define the nested response structures expected by the frontend
type CategoryResponse struct {
	ID    string `json:"id"`
	Name  string `json:"name"`
	Slug  string `json:"slug"`
	Color string `json:"color"`
}

type AuthorResponse struct {
	ID     string `json:"id"`
	Name   string `json:"name"`
	Email  string `json:"email"`
	Avatar string `json:"avatar"`
	Bio    string `json:"bio"`
}

type PostResponse struct {
	ID            string            `json:"id"`
	Title         string            `json:"title"`
	Slug          string            `json:"slug"`
	Excerpt       string            `json:"excerpt"`
	Content       string            `json:"content"`
	FeaturedImage string            `json:"featuredImage"`
	ReadTime      int               `json:"readTime"`
	Views         int               `json:"views"`
	Status        string            `json:"status"`
	IsFeatured    bool              `json:"isFeatured"`
	IsPopular     bool              `json:"isPopular"`
	PublishedAt   time.Time         `json:"publishedAt"`
	CreatedAt     time.Time         `json:"createdAt"`
	UpdatedAt     time.Time         `json:"updatedAt"`
	Category      *CategoryResponse `json:"category,omitempty"`
	Author        *AuthorResponse   `json:"author,omitempty"`
	Tags          []string          `json:"tags,omitempty"`
}

func GetPosts(c *gin.Context) {
	// Base query including joins for author, category, and tags
	baseQuery := `
		SELECT
			p.id, p.title, p.slug, p.excerpt, p.content, p.featured_image, p.read_time, p.views, p.status, p.is_featured, p.is_popular, p.published_at, p.created_at, p.updated_at,
			a.id AS author_id, a.name AS author_name, a.email AS author_email, a.avatar AS author_avatar, a.bio AS author_bio,
			c.id AS category_id, c.name AS category_name, c.slug AS category_slug, c.color AS category_color,
			GROUP_CONCAT(t.name SEPARATOR ',') AS tags
		FROM posts p
		LEFT JOIN users a ON p.author_id = a.id
		LEFT JOIN post_categories pc ON p.id = pc.post_id
		LEFT JOIN categories c ON pc.category_id = c.id
		LEFT JOIN post_tags pt ON p.id = pt.post_id
		LEFT JOIN tags t ON pt.tag_id = t.id
	`
	whereClauses := []string{"p.status = 'published'"}
	args := []interface{}{}

	if c.Query("isFeatured") == "true" {
		whereClauses = append(whereClauses, "p.is_featured = TRUE")
	}
	if categorySlug := c.Query("categorySlug"); categorySlug != "" {
		whereClauses = append(whereClauses, "c.slug = ?")
		args = append(args, categorySlug)
	}
	if search := c.Query("search"); search != "" {
		searchPattern := "%" + search + "%"
		whereClauses = append(whereClauses, "(p.title LIKE ? OR p.excerpt LIKE ? OR p.content LIKE ?)")
		args = append(args, searchPattern, searchPattern, searchPattern)
	}
	if tagName := c.Query("tagName"); tagName != "" {
		// Use FIND_IN_SET for filtering by tags in a comma-separated string
		// This requires the GROUP_CONCAT(t.name) to be in the main query
		whereClauses = append(whereClauses, "FIND_IN_SET(?, GROUP_CONCAT(t.name))")
		args = append(args, tagName)
	}

	query := baseQuery
	if len(whereClauses) > 0 {
		query += " WHERE " + strings.Join(whereClauses, " AND ")
	}

	query += ` GROUP BY
        p.id, p.title, p.slug, p.excerpt, p.content, p.featured_image, p.read_time, p.views, p.status, p.is_featured, p.is_popular, p.published_at, p.created_at, p.updated_at,
        a.id, a.name, a.email, a.avatar, a.bio,
        c.id, c.name, c.slug, c.color
    `

	sortBy := c.Query("sortBy")
	switch sortBy {
	case "popular":
		query += " ORDER BY p.views DESC"
	case "trending": // Assuming trending might have its own logic, for now, same as popular
		query += " ORDER BY p.views DESC"
	default: // "latest" or empty
		query += " ORDER BY p.published_at DESC"
	}

	if limitStr := c.Query("limit"); limitStr != "" {
		if limit, err := strconv.Atoi(limitStr); err == nil {
			query += " LIMIT ?"
			args = append(args, limit)
		}
	}

	var dbPosts []models.Post
	if err := database.DB.Select(&dbPosts, query, args...); err != nil {
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
			Content:       p.Content,
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
			if p.AuthorBio != nil {
				author.Bio = *p.AuthorBio
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

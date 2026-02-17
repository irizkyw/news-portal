package models

import (
	"strings"
	"time"
)

// StringArray adalah tipe kustom untuk menangani konversi otomatis
// dari string (koma terpisah) di database ke slice string di Go.
type StringArray []string

// Scan mengimplementasikan interface sql.Scanner untuk membaca data dari database.
func (a *StringArray) Scan(value interface{}) error {
	if value == nil {
		*a = []string{}
		return nil
	}

	var s string
	switch v := value.(type) {
	case string:
		s = v
	case []byte:
		s = string(v)
	default:
		*a = []string{}
		return nil
	}

	if s == "" {
		*a = []string{}
	} else {
		*a = strings.Split(s, ",")
	}
	return nil
}

type Category struct {
	ID    string `db:"id" json:"id"`
	Name  string `db:"name" json:"name"`
	Slug  string `db:"slug" json:"slug"`
	Color string `db:"color" json:"color"`
}

type User struct {
	ID        string    `db:"id" json:"id"`
	Email     string    `db:"email" json:"email"`
	Name      string    `db:"name" json:"name"`
	Password  string    `db:"password" json:"-"` // Dikecualikan dari output JSON
	Role      string    `db:"role" json:"role"`
	Avatar    *string    `db:"avatar" json:"avatar"`
	Bio       *string    `db:"bio" json:"bio"`
	CreatedAt time.Time `db:"created_at" json:"createdAt"`
	UpdatedAt time.Time `db:"updated_at" json:"updatedAt"`
}

type CreateUserRequest struct {
	Email    string `json:"email" binding:"required"`
	Name     string `json:"name"`
	Password string `json:"password" binding:"required"`
	Avatar   string `json:"avatar"`
	Bio      string `json:"bio"`
}

type Post struct {
	ID            string    `db:"id" json:"id"`
	Title         string    `db:"title" json:"title"`
	Slug          string    `db:"slug" json:"slug"`
	Excerpt       string    `db:"excerpt" json:"excerpt"`
	Content       string    `db:"content" json:"content"`
	FeaturedImage string    `db:"featured_image" json:"featuredImage"`
	ReadTime      *int      `db:"read_time" json:"readTime"`
	Views         *int      `db:"views" json:"views"`
	Status        string    `db:"status" json:"status"`
	IsFeatured    bool      `db:"is_featured" json:"isFeatured"`
	IsPopular     bool      `db:"is_popular" json:"isPopular"`
	PublishedAt   *time.Time `db:"published_at" json:"publishedAt"`
	CreatedAt     time.Time `db:"created_at" json:"createdAt"`
	UpdatedAt     time.Time `db:"updated_at" json:"updatedAt"`

	// Category fields (Flattened)
	CategoryID    *string `db:"category_id" json:"category_id"`
	CategoryName  *string `db:"category_name" json:"category_name"`
	CategorySlug  *string `db:"category_slug" json:"category_slug"`
	CategoryColor *string `db:"category_color" json:"category_color"`

	// Author fields (Flattened)
	AuthorID        *string    `db:"author_id" json:"author_id"`
	AuthorName      *string    `db:"author_name" json:"author_name"`
	AuthorEmail     *string    `db:"author_email" json:"author_email"`
	AuthorAvatar    *string    `db:"author_avatar" json:"author_avatar"`
	AuthorBio       *string    `db:"author_bio" json:"author_bio"`
	AuthorCreatedAt *time.Time `db:"author_created_at" json:"author_created_at"`
	AuthorUpdatedAt *time.Time `db:"author_updated_at" json:"author_updated_at"`

	// Tags sekarang otomatis menjadi JSON array ["tag1", "tag2"]
	Tags StringArray `db:"tags" json:"tags"`
}

type DashboardStats struct {
	TotalViews        int64   `db:"total_views" json:"totalViews"`
	TotalArticles     int     `db:"total_articles" json:"totalArticles"`
	NewSubscribers    int     `db:"new_subscribers" json:"newSubscribers"`
	BounceRate        float64 `db:"bounce_rate" json:"bounceRate"`
	ViewsChange       float64 `db:"views_change" json:"viewsChange"`
	ArticlesChange    float64 `db:"articles_change" json:"articlesChange"`
	SubscribersChange float64 `db:"subscribers_change" json:"subscribersChange"`
	BounceRateChange  float64 `db:"bounce_rate_change" json:"bounceRateChange"`
}

type WeeklyTraffic struct {
	Day   string `db:"day" json:"day"`
	Views int    `db:"views" json:"views"`
}

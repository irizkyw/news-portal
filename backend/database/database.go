package database

import (
	"fmt"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

var DB *sqlx.DB

func Connect(test ...bool) error {
	var err error
	dsn := os.Getenv("DATABASE_URL")
	dbName := "news_portal"
	if len(test) > 0 && test[0] {
		dbName = "news_portal_test"
	}

	if dsn == "" {
		dsn = "root:@tcp(127.0.0.1:3306)/?parseTime=true"
	}

	DB, err = sqlx.Connect("mysql", dsn)
	if err != nil {
		return fmt.Errorf("failed to connect to database: %w", err)
	}

	if _, err = DB.Exec(fmt.Sprintf("CREATE DATABASE IF NOT EXISTS `%s`", dbName)); err != nil {
		return fmt.Errorf("failed to create database: %w", err)
	}

	DB.Close()

	if dsn == "root:@tcp(127.0.0.1:3306)/?parseTime=true" {
		dsn = fmt.Sprintf("root:@tcp(127.0.0.1:3306)/%s?parseTime=true", dbName)
	}

	DB, err = sqlx.Connect("mysql", dsn)
	if err != nil {
		return fmt.Errorf("failed to connect to database: %w", err)
	}

	if err = DB.Ping(); err != nil {
		return fmt.Errorf("failed to ping database: %w", err)
	}

	if err = createTables(); err != nil {
		return fmt.Errorf("failed to create tables: %w", err)
	}

	log.Println("Successfully connected to database")
	return nil
}

func createTables() error {
	usersTable := `
		CREATE TABLE IF NOT EXISTS users (
			id INT AUTO_INCREMENT PRIMARY KEY,
			email VARCHAR(255) NOT NULL UNIQUE,
			name VARCHAR(255),
			password VARCHAR(255) NOT NULL,
			role VARCHAR(255) DEFAULT 'user' NOT NULL,
			avatar VARCHAR(255),
			bio TEXT,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
		);
	`
	postsTable := `
		CREATE TABLE IF NOT EXISTS posts (
			id INT AUTO_INCREMENT PRIMARY KEY,
			title VARCHAR(255) NOT NULL,
			slug VARCHAR(255) NOT NULL UNIQUE,
			excerpt TEXT,
			content LONGTEXT,
			featured_image VARCHAR(255),
			read_time INT,
			views INT,
			status VARCHAR(20) DEFAULT 'draft',
			is_featured BOOLEAN DEFAULT FALSE,
			is_popular BOOLEAN DEFAULT FALSE,
			published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			author_id INT,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
			FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
		);
	`
	categoriesTable := `
		CREATE TABLE IF NOT EXISTS categories (
			id INT AUTO_INCREMENT PRIMARY KEY,
			name VARCHAR(255) NOT NULL UNIQUE,
			slug VARCHAR(255) NOT NULL UNIQUE,
			color VARCHAR(50)
		);
	`
	tagsTable := `
		CREATE TABLE IF NOT EXISTS tags (
			id INT AUTO_INCREMENT PRIMARY KEY,
			name VARCHAR(255) NOT NULL UNIQUE
		);
	`
	postCategoriesTable := `
		CREATE TABLE IF NOT EXISTS post_categories (
			post_id INT,
			category_id INT,
			PRIMARY KEY (post_id, category_id),
			FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
			FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
		);
	`
	postTagsTable := `
		CREATE TABLE IF NOT EXISTS post_tags (
			post_id INT,
			tag_id INT,
			PRIMARY KEY (post_id, tag_id),
			FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
			FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
		);
	`
	dashboardStatsTable := `
		CREATE TABLE IF NOT EXISTS dashboard_stats (
			id INT AUTO_INCREMENT PRIMARY KEY,
			total_views BIGINT,
			total_articles INT,
			new_subscribers INT,
			bounce_rate DECIMAL(5,2),
			views_change DECIMAL(5,2),
			articles_change DECIMAL(5,2),
			subscribers_change DECIMAL(5,2),
			bounce_rate_change DECIMAL(5,2)
		);
	`
	weeklyTrafficTable := `
		CREATE TABLE IF NOT EXISTS weekly_traffic (
			id INT AUTO_INCREMENT PRIMARY KEY,
			day VARCHAR(10),
			views INT
		);
	`

	if _, err := DB.Exec(usersTable); err != nil {
		return err
	}
	if _, err := DB.Exec(postsTable); err != nil {
		return err
	}
	// Migrate existing posts.content column to LONGTEXT if it's still TEXT
	if _, err := DB.Exec("ALTER TABLE posts MODIFY COLUMN content LONGTEXT"); err != nil {
		log.Printf("Warning: Failed to modify posts.content to LONGTEXT: %v", err)
	}
	if _, err := DB.Exec(categoriesTable); err != nil {
		return err
	}
	if _, err := DB.Exec(tagsTable); err != nil {
		return err
	}
	if _, err := DB.Exec(postCategoriesTable); err != nil {
		return err
	}
	if _, err := DB.Exec(postTagsTable); err != nil {
		return err
	}
	if _, err := DB.Exec(dashboardStatsTable); err != nil {
		return err
	}
	if _, err := DB.Exec(weeklyTrafficTable); err != nil {
		return err
	}
	return nil
}

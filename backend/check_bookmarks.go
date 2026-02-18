package main

import (
	"fmt"
	"log"
	"news-portal/backend/database"
)

func main() {
	err := database.Connect()
	if err != nil {
		log.Fatalf("Gagal terhubung ke database: %v", err)
	}

	var exists int
	err = database.DB.Get(&exists, "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'news_portal' AND table_name = 'bookmarks'")
	if err != nil {
		log.Fatalf("Gagal mengecek tabel: %v", err)
	}

	if exists == 1 {
		fmt.Println("Tabel bookmarks sudah ada.")
	} else {
		fmt.Println("Tabel bookmarks BELUM ada. Mencoba membuat ulang...")
		// Force create table
		bookmarksTable := `
			CREATE TABLE IF NOT EXISTS bookmarks (
				user_id INT,
				post_id INT,
				created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
				PRIMARY KEY (user_id, post_id),
				FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
				FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
			);
		`
		_, err = database.DB.Exec(bookmarksTable)
		if err != nil {
			log.Fatalf("Gagal membuat tabel: %v", err)
		}
		fmt.Println("Tabel bookmarks berhasil dibuat.")
	}
}

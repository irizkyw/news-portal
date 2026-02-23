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
		Avatar   string
	}{
		{"admin@example.com", "Admin Tempo", "adminpass", "admin", "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"},
		{"sarah.j@example.com", "Sarah Johnson", "password123", "editor", "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"},
		{"michael.c@example.com", "Michael Chen", "password123", "user", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"},
		{"emily.r@example.com", "Emily Rodriguez", "password123", "user", "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200"},
		{"david.k@example.com", "David Kim", "password123", "user", "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"},
	}

	userIDs := make(map[string]int)
	for _, user := range users {
		hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
		result, err := database.DB.Exec("INSERT INTO users (email, name, password, role, avatar) VALUES (?, ?, ?, ?, ?)", user.Email, user.Name, string(hashedPassword), user.Role, user.Avatar)
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
		"Nasional", "Bisnis", "Metro", "Dunia", "Tekno", "Otomotif", "Seleb", "Bola", "Gaya Hidup", "Travel",
	}

	categoryIDs := make(map[string]int)
	colors := []string{"#EF4444", "#3B82F6", "#10B981", "#F59E0B", "#6366F1", "#8B5CF6", "#EC4899", "#14B8A6", "#F97316", "#06B6D4"}

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
		"IKN", "Prabowo Gibran", "Ekonomi", "Teknologi", "Kesehatan", "Pendidikan",
		"Lingkungan", "Olahraga", "Seni Budaya", "Kriminal", "Politik",
		"Infrastruktur", "Startup", "Investasi", "Rupiah", "Transportasi",
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
			Title:         "Progres Pembangunan IKN Tahap 1 Capai 90 Persen",
			Excerpt:       "Otoritas Ibu Kota Nusantara (OIKN) menyatakan pembangunan infrastruktur dasar tahap pertama hampir rampung sepenuhnya menjelang HUT RI ke-79.",
			Content:       "<h3>Infrastruktur Dasar Rampung</h3><p>Pembangunan Gedung Kantor Presiden dan Istana Negara di Ibu Kota Nusantara (IKN) kini telah memasuki tahap akhir. Menurut Deputi Bidang Sarana dan Prasarana OIKN, progres fisik telah mencapai 90,4 persen.</p><p>\"Kami optimis semua fasilitas inti akan siap digunakan untuk upacara 17 Agustus mendatang,\" ujarnya dalam konferensi pers di Penajam Paser Utara.</p>",
			FeaturedImage: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=1200",
			Status:        "published",
			IsFeatured:    true,
			IsPopular:     true,
			PublishedAt:   time.Now().Add(-2 * time.Hour),
			AuthorEmail:   "sarah.j@example.com",
			CategoryName:  "Nasional",
			Tags:          []string{"IKN", "Infrastruktur", "Politik"},
			ReadTime:      4,
			Views:         25420,
		},
		{
			Title:         "IHSG Menguat di Tengah Sentimen Positif Ekonomi Global",
			Excerpt:       "Indeks Harga Saham Gabungan (IHSG) ditutup menguat sore ini, didorong oleh aksi beli asing di saham-saham perbankan besar.",
			Content:       "<p>IHSG bergerak konsisten di zona hijau sepanjang perdagangan hari ini. Analis memperkirakan penguatan ini dipicu oleh rilis data inflasi Amerika Serikat yang lebih rendah dari ekspektasi, memberikan harapan akan pemangkasan suku bunga The Fed.</p>",
			FeaturedImage: "https://images.unsplash.com/photo-1611974714024-4607ad03d63b?auto=format&fit=crop&q=80&w=1200",
			Status:        "published",
			IsFeatured:    false,
			IsPopular:     true,
			PublishedAt:   time.Now().Add(-5 * time.Hour),
			AuthorEmail:   "michael.c@example.com",
			CategoryName:  "Bisnis",
			Tags:          []string{"Ekonomi", "Investasi", "Rupiah"},
			ReadTime:      3,
			Views:         18150,
		},
		{
			Title:         "SpaceX Berhasil Luncurkan Satelit Starlink Generasi Terbaru",
			Excerpt:       "Perusahaan milik Elon Musk kembali mencatatkan sejarah dengan meluncurkan 22 satelit Starlink menggunakan roket Falcon 9 yang telah digunakan 15 kali.",
			Content:       "<p>Peluncuran ini bertujuan untuk memperluas jangkauan internet satelit global, terutama di daerah-daerah terpencil yang sulit dijangkau oleh kabel serat optik.</p>",
			FeaturedImage: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=80&w=1200",
			Status:        "published",
			IsFeatured:    true,
			IsPopular:     false,
			PublishedAt:   time.Now().Add(-10 * time.Hour),
			AuthorEmail:   "emily.r@example.com",
			CategoryName:  "Tekno",
			Tags:          []string{"Teknologi", "Startup"},
			ReadTime:      5,
			Views:         12000,
		},
		{
			Title:         "Pemprov DKI Jakarta Uji Coba Bus Listrik Rute Baru",
			Excerpt:       "Transjakarta menambah armada bus listrik untuk rute-rute padat guna menekan polusi udara di ibu kota yang kian mengkhawatirkan.",
			Content:       "<p>Uji coba rute baru ini akan berlangsung selama tiga bulan ke depan. Masyarakat dapat menikmati layanan bus listrik ini secara gratis dengan menggunakan kartu uang elektronik.</p>",
			FeaturedImage: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1200",
			Status:        "published",
			IsFeatured:    false,
			IsPopular:     false,
			PublishedAt:   time.Now().Add(-24 * time.Hour),
			AuthorEmail:   "michael.c@example.com",
			CategoryName:  "Metro",
			Tags:          []string{"Transportasi", "Lingkungan", "Kesehatan"},
			ReadTime:      4,
			Views:         9340,
		},
		{
			Title:         "Konflik di Timur Tengah Memanas, Harga Minyak Dunia Melonjak",
			Excerpt:       "Ketegangan geopolitik di Timur Tengah memicu kekhawatiran gangguan pasokan energi global, mendorong harga Brent menembus US$ 90 per barel.",
			Content:       "<p>Para pemimpin dunia menyerukan pengendalian diri guna mencegah konflik skala penuh yang dapat merusak stabilitas ekonomi global yang baru saja pulih dari pandemi.</p>",
			FeaturedImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1200",
			Status:        "published",
			IsFeatured:    false,
			IsPopular:     true,
			PublishedAt:   time.Now().Add(-48 * time.Hour),
			AuthorEmail:   "sarah.j@example.com",
			CategoryName:  "Dunia",
			Tags:          []string{"Politik", "Ekonomi"},
			ReadTime:      6,
			Views:         32000,
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

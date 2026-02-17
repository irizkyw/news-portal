package handlers

import (
	"database/sql"
	"net/http"
	"news-portal/backend/database"
	"news-portal/backend/models"

	"github.com/gin-gonic/gin"
)

// GetDashboardStats mengambil ringkasan statistik dari tabel dashboard_stats.
func GetDashboardStats(c *gin.Context) {
	var stats models.DashboardStats

	// Query untuk mengambil baris pertama dari statistik dashboard
	query := `
		SELECT
			total_views,
			total_articles,
			new_subscribers,
			bounce_rate,
			views_change,
			articles_change,
			subscribers_change,
			bounce_rate_change
		FROM dashboard_stats
		LIMIT 1
	`

	// Menggunakan database.DB.Get untuk mengambil satu baris data
	err := database.DB.Get(&stats, query)
	if err != nil {
		if err == sql.ErrNoRows {
			// Jika tidak ada baris ditemukan, kembalikan 200 OK dengan objek kosong
			c.JSON(http.StatusOK, models.DashboardStats{})
			return
		}
		// Untuk error lain, kembalikan 500 Internal Server Error
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Gagal mengambil data statistik dashboard: " + err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, stats)
}

// GetWeeklyTraffic mengambil data trafik mingguan untuk kebutuhan grafik (chart).
func GetWeeklyTraffic(c *gin.Context) {
	var traffic []models.WeeklyTraffic

	// Query mengambil data trafik mingguan berdasarkan urutan ID
	query := "SELECT day, views FROM weekly_traffic ORDER BY id ASC"

	// Menggunakan database.DB.Select untuk mengambil banyak baris data (slice)
	if err := database.DB.Select(&traffic, query); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Gagal mengambil data trafik mingguan: " + err.Error(),
		})
		return
	}

	// Mengembalikan array kosong [] jika tidak ada data, bukan null
	if traffic == nil {
		traffic = []models.WeeklyTraffic{}
	}

	c.JSON(http.StatusOK, traffic)
}

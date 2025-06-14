package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"receptionist-doctor-app/config"
	"receptionist-doctor-app/models"
	"receptionist-doctor-app/routes"
	"receptionist-doctor-app/seed"
)

func main() {
	r := gin.Default()

	//  Enable CORS first
	// r.Use(cors.Default())
	r.Use(cors.New(cors.Config{
    AllowOrigins:     []string{"http://localhost:3000"},
    AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
    AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
    AllowCredentials: true,
}))
	//  Connect to DB 
	config.ConnectDatabase()

	// Migrate tables
	config.DB.AutoMigrate(&models.Patient{}, &models.User{})

	// Seed test users
	seed.SeedUsers()

	//  Register routes (must be after CORS)
	routes.SetupRoutes(r)

	//  Add /ping route
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "Hamza"})
	})

	// ✅ 7. Start server (MUST be the last line)
	r.Run(":8080")
}

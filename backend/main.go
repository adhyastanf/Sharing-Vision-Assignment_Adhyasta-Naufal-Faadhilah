package main

import (
	"log"
	"os"
	"time"

	"github.com/canhbk/golang-gin-starter-kit/config"
	_ "github.com/canhbk/golang-gin-starter-kit/docs" // This is required for swagger
	"github.com/canhbk/golang-gin-starter-kit/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	swaggerFiles "github.com/swaggo/files"     // swagger embed files
	ginSwagger "github.com/swaggo/gin-swagger" // gin-swagger middleware
)

// Package level variable
var logger *log.Logger

// init function runs before main
func init() {
	// Setup logger
	logger = log.New(os.Stdout, "[INIT] ", log.LstdFlags)
	logger.Println("Starting initialization...")

	// Load environment variables from .env file
	if err := godotenv.Load(); err != nil {
		logger.Printf("Warning: .env file not found")
	} else {
		logger.Printf("Environment variables loaded successfully")
	}
}

// @title           Example API
// @version         1.0
// @description     A backend service for Example platform
// @termsOfService  http://swagger.io/terms/

// @contact.name   Canh Nguyen
// @contact.email  canhcvp1998@gmail.com

// @license.name  MIT
// @license.url   https://opensource.org/licenses/MIT

// @host      localhost:8080

// @securityDefinitions.apikey BearerAuth
// @in header
// @name Authorization
func main() {
	logger := log.New(os.Stdout, "[MAIN] ", log.LstdFlags)
	logger.Println("Starting main function...")

	// Initialize database connection
	config.InitializeDB()
	logger.Println("Database initialized")

	// Initialize Gin router
	router := gin.Default()
	logger.Println("Gin router initialized")

	corsConfig := cors.Config{
		AllowAllOrigins: true,
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization", "Accept"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}
	router.Use(cors.New(corsConfig))

	// Initialize routes
	routes.InitializeRoutes(router)
	logger.Println("Routes initialized")

	// Swagger documentation route
	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	logger.Println("Swagger documentation initialized")

	// Get port from environment variable or use default
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Start server
	logger.Printf("Starting server on port %s...", port)
	if err := router.Run(":" + port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}

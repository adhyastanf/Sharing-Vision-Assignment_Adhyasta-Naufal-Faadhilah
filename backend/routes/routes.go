package routes

import (
	"github.com/canhbk/golang-gin-starter-kit/controllers"
	v1 "github.com/canhbk/golang-gin-starter-kit/controllers/v1"
	"github.com/gin-gonic/gin"
)

func InitializeRoutes(r *gin.Engine) {
	// API Version 1 Routes
	v1Routes := r.Group("/api/v1")
	initializeV1Routes(v1Routes)

	// Health check route (unversioned)
	healthController := controllers.NewHealthController()
	r.GET("/health", healthController.HealthCheck)
}

func initializeV1Routes(rg *gin.RouterGroup) {
	// Initialize V1 controllers

	postController := v1.NewPostController()

	// Add other v1 route groups here

	posts := rg.Group("/article")
	{
		posts.POST("", postController.Create)
		posts.GET("/:id", postController.Get)
		posts.GET("", postController.List)
		posts.PUT("/:id", postController.Update)
		posts.DELETE("/:id", postController.Delete)
	}
}

// Prepare for future versions
// func initializeV2Routes(rg *gin.RouterGroup) {
// 	V2 routes will go here
// }

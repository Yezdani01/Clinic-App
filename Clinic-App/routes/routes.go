
package routes

import (
    "github.com/gin-gonic/gin"
    "receptionist-doctor-app/controllers"
    patientController "receptionist-doctor-app/controllers/patient"
    "receptionist-doctor-app/middleware"
)

func SetupRoutes(r *gin.Engine) {
    r.POST("/login", controllers.Login)

    auth := r.Group("/api")
    auth.Use(middleware.AuthMiddleware())

    auth.GET("/dashboard", func(c *gin.Context) {
        role, _ := c.Get("role")
        c.JSON(200, gin.H{"message": "Welcome!", "role": role})
    })

    // ✅ These two lines are critical:
    auth.POST("/patients", patientController.CreatePatient)
    auth.GET("/patients", patientController.GetPatients)

	auth.PUT("/patients/:id", patientController.UpdatePatient)
    auth.DELETE("/patients/:id", patientController.DeletePatient)

}

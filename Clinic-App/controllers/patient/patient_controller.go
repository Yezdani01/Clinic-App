package patient

import (
    "net/http"
    "receptionist-doctor-app/config"
    "receptionist-doctor-app/models"

    "github.com/gin-gonic/gin"
)

// POST /patients
func CreatePatient(c *gin.Context) {
    role, _ := c.Get("role")
    if role != "receptionist" {
        c.JSON(http.StatusForbidden, gin.H{"error": "Only receptionists can create patients"})
        return
    }

    var patient models.Patient
    if err := c.ShouldBindJSON(&patient); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    if err := config.DB.Create(&patient).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create patient"})
        return
    }

    c.JSON(http.StatusCreated, patient)
}

// GET /patients
func GetPatients(c *gin.Context) {
    var patients []models.Patient
    if err := config.DB.Find(&patients).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch patients"})
        return
    }

    c.JSON(http.StatusOK, patients)
}

// PUT /patients/:id
func UpdatePatient(c *gin.Context) {
    id := c.Param("id")
    role, _ := c.Get("role")
	   if role != "receptionist" {
        c.JSON(http.StatusForbidden, gin.H{"error": "Only receptionists can Update patients"})
        return
    }

    var patient models.Patient
    if err := config.DB.First(&patient, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Patient not found"})
        return
    }

    if err := c.ShouldBindJSON(&patient); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    config.DB.Save(&patient)
    c.JSON(http.StatusOK, patient)
}

// DELETE /patients/:id
func DeletePatient(c *gin.Context) {
    role, _ := c.Get("role")
    if role != "receptionist" {
        c.JSON(http.StatusForbidden, gin.H{"error": "Only receptionists can delete patients"})
        return
    }

    id := c.Param("id")
    var patient models.Patient
    if err := config.DB.First(&patient, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Patient not found"})
        return
    }

    config.DB.Delete(&patient)
    c.JSON(http.StatusOK, gin.H{"message": "Patient deleted successfully"})
}

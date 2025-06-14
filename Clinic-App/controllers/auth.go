package controllers

import (
    "net/http"
    "receptionist-doctor-app/config"
    "receptionist-doctor-app/models"
    "time"

    "github.com/gin-gonic/gin"
    "github.com/golang-jwt/jwt/v5"
)

var jwtKey = []byte("secretkey") // Replace with .env later

type LoginInput struct {
    Username string `json:"username"`
    Password string `json:"password"`
}

func Login(c *gin.Context) {
    var input LoginInput
    var user models.User

    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    if err := config.DB.Where("username = ? AND password = ?", input.Username, input.Password).First(&user).Error; err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
        return
    }

    token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
        "user_id": user.ID,
        "role":    user.Role,
        "exp":     time.Now().Add(time.Hour * 24).Unix(),
    })

    tokenString, err := token.SignedString(jwtKey)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not create token"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"token": tokenString})
}

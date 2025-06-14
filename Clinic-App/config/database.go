package config

import (
    "fmt"
    "gorm.io/driver/postgres"
    "gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {

	dsn := "host=localhost user=hamzahamza dbname=clinic_db port=5432 sslmode=disable"

    
    database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
    if err != nil {
        panic("Failed to connect to database!")
    }

    fmt.Println("Database connected Successfully✅ ")

    DB = database
}

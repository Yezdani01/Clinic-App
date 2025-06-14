// package main

// import (
//     "receptionist-doctor-app/config"
//     "receptionist-doctor-app/models"
// )

// func seedUsers() {
//     users := []models.User{
//         {Username: "reception1", Password: "pass123", Role: "receptionist"},
//         {Username: "doctor1", Password: "pass123", Role: "doctor"},
//     }

//     for _, u := range users {
//         var existing models.User
//         config.DB.Where("username = ?", u.Username).First(&existing)
//         if existing.ID == 0 {
//             config.DB.Create(&u)
//         }
//     }
// }

package seed

import (
    "receptionist-doctor-app/config"
    "receptionist-doctor-app/models"
)

func SeedUsers() {
    users := []models.User{
        {Username: "reception1", Password: "pass123", Role: "receptionist"},
        {Username: "doctor1", Password: "pass123", Role: "doctor"},
    }

    for _, u := range users {
        var existing models.User
        config.DB.Where("username = ?", u.Username).First(&existing)
        if existing.ID == 0 {
            config.DB.Create(&u)
        }
    }
}


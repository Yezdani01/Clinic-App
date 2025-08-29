# Clinic-App
This is a secure, role-based RESTful API built using Golang and the Gin web framework, designed for managing patient data in a clinic environment. It supports two types of authenticated users — Receptionists and Doctors — each with distinct access levels to patient records.

# 🩺 Clinic Patient Management API (Golang)

This is a secure, role-based RESTful API built using **Golang** and the **Gin** framework. It enables receptionist and doctor users to manage patient records, with distinct access levels for each role.

---

## 🚀 Features

- ✅ JWT-based authentication (`/login`)
- ✅ Role-based access control (doctor / receptionist)
- ✅ Patient CRUD operations
  - Receptionist: full access (Add, View, Edit, Delete)
  - Doctor: limited access (View, Edit only)
- ✅ PostgreSQL database
- ✅ Secure middleware (token auth, role checks)
- ✅ Auto-migration using GORM

---

## 🛠️ Tech Stack

- **Golang**
- **Gin Gonic** (web framework)
- **PostgreSQL** (database)
- **GORM** (ORM)
- **JWT** for authentication

---

## 📦 API Endpoints

| Method | Endpoint               | Access        | Description             |
|--------|------------------------|---------------|-------------------------|
| POST   | `/login`               | Public        | Authenticate user & return JWT |
| GET    | `/api/patients`        | All roles     | View all patients       |
| POST   | `/api/patients`        | Receptionist  | Add a new patient       |
| PUT    | `/api/patients/:id`    | All roles     | Edit a patient          |
| DELETE | `/api/patients/:id`    | Receptionist  | Delete a patient        |

---

## 🧪 Sample Users

These are seeded by default when the server runs:

| Username     | Password | Role         |
|--------------|----------|--------------|
| `reception1` | `pass123`  | Receptionist |
| `doctor1`    | `pass123`| Doctor       |

---

## 📁 Folder Structure


```
├── config/ # DB connection
├── controllers/ # Auth and patient controllers
├── middleware/ # JWT and role check
├── models/ # GORM models (User, Patient)
├── routes/ # Route setup
├── seed/ # Initial user seed
├── main.go # Entry point

```

---

## 🧰 How to Run

### 1. Set Up PostgreSQL

- Ensure PostgreSQL is installed and running
- Create a DB named (e.g.) `clinic_db`
- Update credentials in `config/database.go`

### 2. Run the Server

```bash
go run main.go

API will be live at:
http://localhost:8080

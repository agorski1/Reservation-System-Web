# Hotel Reservation System – Web Application

## 📌 Overview

This module is a **web application for customers**, built with React. It is part of a complete hotel reservation system.

The system consists of three main parts:

* **Backend (Spring Boot)** – Spring Boot REST API
* **Web Application (this repository)** – client interface for customers
* **Desktop Application (JavaFX)** – internal management tool for employees
### 🔗 Related Repositories

* ⚙️ Backend (Spring Boot) – *REST API and business logic*  
  👉 [Reservation System Backend](https://github.com/agorski1/Reservation-System)

* 🖥 Desktop (JavaFX) – *employee management system*  
  👉 [Reservation System Desktop](https://github.com/agorski1/Reservation-System-Desktop)

---

The web application allows customers to:
* browse available rooms
* make reservations
* view and manage their bookings
* cancel reservations

---

## 🛠 Tech Stack

* React 19
* TypeScript
* Vite
* Material UI (MUI)
* React Router
* React Query (TanStack Query)
* Axios
* date-fns

---

## 🌐 Features

* 🔍 Browse available rooms
* 🛏 Create reservations
* 📅 View current and past reservations
* ❌ Cancel reservations
* ⚡ Fast data fetching with React Query
* 🎨 Modern UI with Material UI

---

## 🏗 Architecture

The project follows a modular frontend architecture:

* **pages** – main application views
* **components** – reusable UI components
* **services** – API communication layer
* **models** – TypeScript types/interfaces
* **context** – global state (e.g. auth)
* **router** – application routing
* **utils** – helper functions
* **constants** – shared constants

---

## 🚀 Getting Started

### Prerequisites

* Node.js (>= 18 recommended)
* npm or yarn
* Running backend service

---

## ▶️ Running the Application

```bash id="web1"
npm install
npm run dev
```

Application will be available at:

```id="web2"
http://localhost:5173
```

---

## ⚙️ Configuration

The application communicates with the backend API.

Default backend URL:

```id="web3"
http://localhost:8080
```

If needed, update the base URL in:

```id="web4"
src/services/api.ts
```

---

## 📡 Backend Integration

The web application consumes REST endpoints such as:

### 🛏 Reservations

* `GET /reservations/my`
* `GET /reservations/my/current`
* `POST /reservations`
* `PATCH /reservations/{reservationId}/cancel`

---

### 🛏 Rooms

* `GET /rooms/available`

---

### 🧾 Room Types

* `GET /room-type`
* `GET /room-type/{id}`
* `GET /room-type/available`

---

## 📂 Project Structure

```plaintext id="web6"
src
├── assets          # static files (images, etc.)
├── components      # reusable UI components
│   ├── filters
│   ├── payment
│   ├── reservation
│   └── room
├── pages           # application views
├── services        # API layer (Axios)
├── models          # TypeScript interfaces
├── context         # global state management
├── router          # routing configuration
├── utils           # helper functions
└── constants       # shared constants
```

---

## 🔄 Data Fetching

The application uses **React Query** for:

* server state management
* caching
* background updates
* request deduplication

---

## ⚠️ Notes

* Backend must be running before starting the app
* Application is designed for end users (customers)
* Uses REST API for all operations

---
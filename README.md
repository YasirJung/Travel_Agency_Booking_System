
# Travel Agency Booking System

This is a **full-stack web application** designed for a **Travel Agency** to manage tour packages, bookings, and customer interactions. The project includes an **Admin Panel** to add, update, and delete packages, along with a **user-facing interface** to explore packages, make bookings, and download invoices.

---

## Project Description

The Travel Agency Booking System is a feature-rich application built using the **MERN stack** (MongoDB, Express, React, and Node.js). 

- **Backend**: Handles CRUD operations for tour packages and customer bookings.
- **Frontend**: Provides a beautiful interface for users to explore packages, filter them, and make bookings.
- **Admin Panel**: Enables admins to manage packages with ease.
- **Invoice Generation**: Generates PDF invoices for confirmed bookings.

---

## Setup Instructions

Follow these steps to set up the project locally:

### 1. Clone the Repository
```bash
git clone https://github.com/YasirJung/Travel_Agency_Booking_System.git
cd travel-agency-booking-system
```

### 2. Install Dependencies
#### Backend:
Navigate to the `backend` folder and install dependencies.
```bash
cd backend
npm install
```

#### Frontend:
Navigate to the `frontend` folder and install dependencies.
```bash
cd frontend
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the `backend` directory with the following variables:
```plaintext
MONGO_URI=your-mongodb-connection-string
PORT=5000
```

Replace `your-mongodb-connection-string` with your MongoDB Atlas URI.

---

### 4. Run the Application

#### Start the Backend Server:
```bash
cd backend
npm start
```

#### Start the Frontend Server:
```bash
cd frontend
npm start
```

The application should now be accessible at **http://localhost:3000**.

---

## Features

### User Features
1. **View Tour Packages**: Browse through all available tour packages.
2. **Search & Filter**:
   - Search packages by **destination**.
   - Filter packages by **price range**.
3. **Booking Form**:
   - Book a tour package by entering customer details and the number of travelers.
4. **Invoice Generation**:
   - Download a PDF invoice after booking confirmation.

---

### Admin Features
1. **Manage Packages**:
   - Add new packages with images, price, and available dates.
   - Update existing packages.
   - Delete packages.

2. **Bookings Overview**:
   - View all customer bookings in a table format.

---

## Implemented Technologies

- **Frontend**: React.js with Tailwind CSS
- **Backend**: Node.js with Express.js
- **Database**: MongoDB Atlas
- **State Management**: React Hooks (useState, useEffect)
- **PDF Generation**: jsPDF library
- **Routing**: React Router
- **HTTP Requests**: Axios
- **Validation**: Backend validation using Express middleware

---

## Folder Structure

```plaintext
travel-agency-booking-system/
│
├── backend/
│   ├── controllers/       # Business logic for routes
│   ├── models/            # Mongoose schema definitions
│   ├── routes/            # API routes for packages and bookings
│   ├── .env               # Environment variables
│   └── index.js           # Main backend entry point
│
├── frontend/
│   ├── components/        # Reusable React components
│   ├── pages/             # Application pages
│   ├── public/            # Static files
│   ├── src/               # Source code
│   └── index.js           # Main frontend entry point
│
└── README.md              # Project documentation
```

# KBT Cafe - Restaurant Management System

A web application for managing a cafe/restaurant with user authentication, menu management, and reservation system.

## Features

### For Customers (Regular Users)
- Browse menu items
- Add items to cart
- Generate bills
- Book tables (requires login)
- View about page and home page

### For Admins
- All customer features
- Manage menu items (add, edit, delete)
- Manage table reservations (view, edit, delete)
- Access admin dashboard

## Tech Stack
- Node.js
- Express.js
- MongoDB
- EJS Templates
- Passport.js for authentication

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Make sure MongoDB is running on your machine
4. Start the server: `node app.js`
5. The server will run on port 3000 by default

## Initial Setup

When running for the first time, visit `/kbt/auth/setup-admin` to create an admin account with:
- Username: admin
- Password: admin123

**Important**: After creating the admin account, this route should be removed for security reasons.

## User Authentication

- Users can register with username, email, and password
- Different permission levels for regular users and admins
- Session management for logged-in users

## Routes

### Main Routes
- `/kbt` - Home page
- `/kbt/about` - About page
- `/kbt/menu` - Menu page
- `/kbt/contact` - Book table (requires login)

### Auth Routes
- `/kbt/auth/login` - Login page
- `/kbt/auth/register` - Registration page
- `/kbt/auth/logout` - Logout

### Admin Routes
- `/kbt/admin` - Admin dashboard
- `/kbt/admin/menu` - Manage menu items
- `/kbt/admin/menu/new` - Add new menu item
- `/kbt/admin/reservations` - Manage reservations

## Security
- Password hashing with bcrypt
- Role-based access control
- Session-based authentication
- Protected routes with middleware 
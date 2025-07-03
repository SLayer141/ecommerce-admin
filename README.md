# Ecommerce Admin Panel

A full-stack **Angular + Node.js (Express + TypeORM)** admin panel for managing products with image upload/edit support and user authentication.

---

## 🚀 Features
- **User Authentication:** Signup & Login (JWT-based)
- **Product CRUD:** Create, Read, Update, Delete products
- **Image Upload:** Upload, preview, and delete product images
- **Responsive UI:** Modern, mobile-friendly design
- **Form Validation:** User-friendly error messages

---

## 📁 Project Structure
```
Angular/
  ecommerce-admin/
    client/   # Angular frontend
    server/   # Node.js + Express + TypeORM backend
```

---

## 📋 Table of Contents
- [Getting Started](#getting-started)
- [Authentication](#authentication)
- [Demo](#demo)
- [Notes](#notes)

---

## 🛠️ Getting Started

### 1. Clone the repository
```sh
git clone <your-repo-url>
cd Angular/ecommerce-admin
```

### 2. Install dependencies
```sh
cd client
npm install
cd ../server
npm install
```

### 3. Build and run the backend
```sh
cd server
npm run build
npm start
```
- Backend: [http://localhost:3000](http://localhost:3000)

### 4. Build and run the frontend
```sh
cd ../client
ng build --prod
# or for development
ng serve
```
- Frontend: [http://localhost:4200](http://localhost:4200)

### 5. Access the App
- Open [http://localhost:4200](http://localhost:4200) in your browser.
- Login/signup to access the admin panel.

---

## 🔐 Authentication

This app includes user authentication with login and signup features.

- **Signup:** Create a new account with email and password.
- **Login:** Access the admin panel with your credentials.

### Default/Test Credentials
- You can sign up as a new user, or use the following test credentials (if seeded):
  ```
  Email: test@example.com
  Password: test123
  ```
> **Note:** If you have not seeded any users, please sign up first.

### How to Use
1. Go to `/signup` to create a new account.
2. Go to `/login` to log in.
3. After logging in, you can access the product management features.

---

## 📝 Notes
- Ensure your database is running and configured in `server/src/db/dataSource.ts`.
- Uploaded images are stored in `server/uploads` and served at `/uploads`.
- For production, set `synchronize: false` in TypeORM config.
- Copy `.env.sample` to `.env` and fill in your actual values before running the project.

---

## 💡 Tips
- For a live demo, deploy the backend (Node.js) and frontend (Angular) to services like Render, Railway, Vercel, or Netlify.
- Add screenshots or a demo video for extra polish.

---
# 🛍️ E-Commerce Project  

## 📌 Overview  
This is a full-featured **E-Commerce web application** built using **React, TailwindCSS, React Query, Axios, and React Router**.  
The project allows users to browse products, manage their cart, place orders, and handle secure authentication including password recovery.  

This project was developed collaboratively with a team, where I specifically worked on:  
- 🔑 **Authentication system** (Login, Forgot Password, OTP, Create New Password)  
- 📦 **Orders Page** (Fetching orders dynamically for logged-in users using React Query)  
- ⚡ **API integration** with Axios  
- 🎨 **Responsive UI** with TailwindCSS  

---

## 🚀 Features  
- 🛍️ Add products to the cart  
- 🔑 Secure Authentication 
- 🔄 Forgot Password and Reset Password  
- 📦 View User Orders with real-time API calls  
- ⚡ Fast and responsive UI  

---

## 🛠️ Tech Stack  
- **Frontend**: React.js, React Router, TailwindCSS  
- **State Management**: React Query (TanStack)  
- **HTTP Client**: Axios  
- **Authentication**:  (stored in `localStorage`)  
- **API**: [RouteMisr E-Commerce API]

---

## 📂 Project Structure  
```
src/
│── assets/          # Images, icons, etc.
│── components/      # Reusable UI components
│── pages/           # Application pages (Home, Products, Orders, Auth, etc.)
│   ├── Auth/        # Login, Forgot Password, OTP, Reset Password
│   ├── Orders/      # Orders page + OrderCard component
│── context/         # User/Auth context
│── hooks/           # Custom hooks
│── App.js           # Main app file
│── main.jsx         # Entry point
```

---

## ⚙️ Installation & Setup  
1. Clone the repo:
   ```bash
   git clone https://github.com/YourUsername/your-repo-name.git
   cd your-repo-name
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the app:
   ```bash
   npm run dev
   ```
4. Open in browser:
   ```
   http://localhost:3000
   ```

---

## 🔑 Environment Variables  
Create a `.env` file in the root with:  
```
VITE_API_URL=https://ecommerce.routemisr.com/api/v1
```

---

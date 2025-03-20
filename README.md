# Coupon Distribution Web App (MERN Stack)

## 🚀 Overview
This is a **MERN stack** web application for distributing coupons in a **round-robin** manner. Users can claim coupons **without logging in**, while the admin can **manage coupons, track claims, and toggle availability** via an admin panel.

## 🌟 Features
### User Side:
- Claim coupons sequentially (**round-robin distribution**)
- Prevent multiple claims using **IP and cookie-based tracking**
- Get instant feedback on claim status

### Admin Panel:
- **Add, Delete, and Update** coupons
- **Set availability** (Enable/Disable) for coupons
- **View claim history** with user IP tracking
- **Manage coupon quantity**
- Secure **Admin Login**

---
## 🛠 Tech Stack
- **Frontend:** React (Vite)
- **Backend:** Express.js + MongoDB
- **Authentication:** Token-based Admin Login
- **Storage:** MongoDB Atlas

---
## 📦 Installation
### 1️⃣ Clone the Repository:
```sh
 git clone https://github.com/yourusername/coupon-app.git
 cd coupon-app
```

### 2️⃣ Backend Setup:
```sh
 cd backend
 npm install
```
#### Create a `.env` file in `backend` with:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```
Run the backend:
```sh
 npm start
```

### 3️⃣ Frontend Setup:
```sh
 cd frontend
 npm install
```
Run the frontend:
```sh
 npm run dev
```

---
## 🚀 API Endpoints
### Admin Authentication
- `POST /api/admin/login` - Admin login

### Coupons
- `GET /api/coupons` - Fetch all coupons
- `POST /api/coupons/add` - Add a new coupon
- `PATCH /api/coupons/update/:id` - Toggle status or update coupon
- `DELETE /api/coupons/delete/:id` - Delete a coupon

### Claims
- `POST /api/claims/claim` - Claim a coupon
- `GET /api/claims` - Get claim history

---
## 🚀 Future Enhancements
- 📊 Dashboard analytics for coupon usage
- 📧 Email notifications for admins
- 📆 Coupon expiration handling

---
## 📜 License
This project is open-source under the **MIT License**.

---
## 🙌 Contributing
Feel free to open an **issue** or submit a **pull request**.

---
## ✉️ Contact
For any queries, contact **your-email@example.com**.


# 🚗 Rentify – Car Rental System

## 📌 Overview
**Rentify** is a **web-based car rental platform** that connects customers with available rental cars through a **bidding and booking** process.  
The system supports **two roles**:
- 👤 **Customer**
- 🛠 **Admin**

---

## ✨ Features

### 🔑 Authentication
- 🔐 Role-based authentication for both customers and admins.
- ✅ Secure login system with proper access control.

### 🚘 Car Management (Admin)
- ➕ Add new car listings with details *(make, model, price, availability, etc.)*.
- ✏️ Update existing car details.
- 🗑 Remove cars from listings.
- 📍 Control car availability *(only available cars are shown to customers)*.

### 🔍 Car Browsing (Customer)
- 👀 View and explore available rental cars.
- 🗂 Search/filter cars based on criteria *(price, brand, model, etc.)*.

### 💰 Bidding System
- 📝 Customers place bids on cars they want to rent.
- 🛠 Admin reviews bids and can **accept ✅** or **reject ❌** them.

### 📅 Booking Confirmation
- 📬 When a bid is **accepted**, the admin confirms the booking.
- 🚫 Once confirmed, the car becomes **unavailable** to other customers.

---

## 📦 Booking Flow
1. 👤 **Customer** browses available cars.
2. 📝 **Customer** places a bid.
3. 🛠 **Admin** reviews the bid.
4. ✅ **Admin** accepts or ❌ rejects the bid.
5. 📅 If accepted, **admin confirms booking**.
6. 🚫 The booked car is removed from the available listings.

---

## 🛠 Suggested Tech Stack
- 🎨 **Frontend:** React.js / Next.js
- ⚙️ **Backend:** Node.js (Express)
- 🗄 **Database:** MongoDB / PostgreSQL
- 🔐 **Authentication:** JWT / OAuth2
- ☁️ **Deployment:** Vercel, Heroku, or AWS

---

**👨‍💻 Author:** Rentify Project Team

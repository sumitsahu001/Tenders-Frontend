# 🏛️ Government Tenders Portal - Full Stack B2B Marketplace

Welcome to the **Government Tenders Portal**, a high-performance, transparent, and secure marketplace engineered to revolutionize public procurement. I built this project to solve a real-world problem: most government portals are slow, clunky, and difficult to navigate. This is my solution to make government-business interactions as smooth as modern e-commerce.

> **Created by**: [Sumit Sahu](https://github.com/sumitsahu001)  
> **Tech Stack**: MERN (MongoDB, Express, React, Node.js)  
> **Status**: Production-Ready Base (Active Development)

---

## 🛑 The Real-World Problem
Traditional government tender systems often face three major issues:
1.  **Lack of Transparency**: Citizens can't easily see what projects are being funded.
2.  **Friction for Small Businesses**: Complex forms and slow UIs prevent small contractors from bidding.
3.  **Manual Inefficiency**: Officials spend too much time managing applications through scattered documents.

**The Solution**: This portal centralizes everything. It’s built for **speed**, **mobile-first responsiveness**, and **role-based security**.

---

## 🚀 Key User Flows & Features

### 1. 📂 Public Transparency (Viewer)
*   **The Flow**: Any citizen can browse active tenders without an account.
*   **Key Feature**: Real-time filtering by department and location. It brings "Amazon-like" ease to government projects.

### 2. 👷 Contractor Workflow (The Bidder)
*   **The Flow**: Register ➡️ Verify Location ➡️ Browse Catalog ➡️ Apply.
*   **Key Feature**: A dedicated "My Applications" dashboard to track the status of bids in real-time. No more wondering "What happened to my application?"

### 3. ⚖️ Government Admin (The Controller)
*   **The Flow**: Login ➡️ Admin Panel ➡️ Create Tender ➡️ Manage Bids.
*   **Key Feature**: A professional **Tender Creation Engine** with field validation and automatic publication to the public catalog.

---

## 🛠️ Project Structure (Clean Architecture)

```text
src/
├── Components/         # Reusable UI (Header, Footer, ProtectedRoutes)
│   └── Shared/         # Global components like Popups & Loaders
├── context/            # Global State Management (Auth, Popup APIs)
├── views/              # Page-level components organized by Role
│   ├── Auth/           # Login, Register, Location Helpers
│   ├── Contractor/     # Bidding catalog & application tracking
│   ├── Government/     # Admin Dashboard & Tender Creation
│   └── Public/         # Transparent catalog for citizens
├── Main.js             # Centralized Role-Based Routing logic
└── App.js              # Layout controller & Global Theme
```

---

## 💎 What Makes This Different?
*   **Role-Based Access Control (RBAC)**: Deep integration of security. You can't even "see" the Admin panel unless you have the right token.
*   **Micro-Animations**: Using `framer-motion` for smooth transitions that make the app feel "premium" and alive.
*   **Vibrant Design**: Moved away from boring "government blues" to a modern, high-contrast dark theme with professional accents.
*   **Adaptive UI**: Fixed the "white-text-on-white-bg" contrast issues manually to ensure perfect readability for all users.

---

## ⚙️ How to Run Locally

### Frontend
1.  Clone this repo.
2.  Run `npm install`.
3.  Create a `.env` with `REACT_APP_API_URL=http://localhost:5000`.
4.  Run `npm start`.

### Backend
1.  Clone the [Tenders-Backend](https://github.com/sumitsahu001/Tenders-Backend) repository.
2.  Run `npm install`.
3.  Set up your MongoDB connection in `.env`.
4.  Run `npm run dev`.

---

**Interested in collaborating or hiring?**  
Feel free to reach out to me via my [GitHub Profile](https://github.com/sumitsahu001).

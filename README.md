# BrightTech Solutions – Frontend

A modern, responsive frontend for **BrightTech Solutions**, a community-driven content platform where users can create posts, like, comment, and explore content seamlessly.

---

## 🌐 Live Demo
🔗 https://bright-tech-client.vercel.app

---

## 🚀 Tech Stack
- **React.js** (Vite)
- **React Router**
- **Tailwind CSS + DaisyUI**
- **Clerk Authentication**
- **Axios**
- **Lucide Icons**

---

## ✨ Features
- User Authentication (Clerk)
- Protected Routes
- Create, Read, Update, Delete Posts
- Search & Sort Posts (Latest / Popular)
- Like & Comment System
- Pagination
- Responsive UI (Mobile → Desktop)
- Environment Variable Based Configuration
 

---

## 📁 Folder Structure
src/
├── components/
├── pages/
├── routes/
├── hooks/
├── layouts/
├── assets/
├── App.jsx
└── main.jsx

## ⚙️ Environment Variables
Create a `.env` file in the root directory:
VITE_API_URL
VITE_CLERK_PUBLISHABLE_KEY

🛠️ Installation & Setup
git clone https://github.com/your-username/bright-tech-client.git
cd bright-tech-client
npm install
npm run dev

🧪 Build for Production
npm run build
npm run preview

🔐 Authentication
Authentication is handled using Clerk:
Signed-in users can read post details
Guests are redirected to Sign Up
Clerk handles session & token management

🚀 Deployment
Vercel

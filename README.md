🚀 LifeOS – Productivity & Self-Improvement Web Platform
LifeOS is a full-stack productivity web application designed to help users manage their goals, track progress, and maintain daily reflections.
The platform allows users to:
create personal goals
track completion status
write daily journals
monitor progress through a personal dashboard
The main purpose of this project is to help people improve discipline, consistency, and personal productivity.

🎯 Problem Statement --> Many people struggle with:
lack of consistency
poor goal tracking
unstructured daily routines
lack of reflection on daily progress
LifeOS provides a simple digital system to manage these aspects effectively.

✨ Features

🔐 Authentication System
User Signup
Secure Login
JWT based authentication
Password hashing using bcrypt

🎯 Goal Management
Users can:
Add goals
Mark goals as completed
Delete individual goals
Clear all goals
View progress

📓 Personal Journal👤 Profile Dashboard
Displays:
User information
Total goals
Completed goals
Journal status
Users can:
Write daily reflections
Save journal entries
Load previous journal data

👤 Profile Dashboard
Displays:
User information
Total goals
Completed goals
Journal status

## 🏗 Project Structure

LifeOS
│
├── frontend
│   ├── index.html
│   ├── login.html
│   ├── signup.html
│   ├── dashboard.html
│   ├── profile.html
│   ├── style.css
│   └── script.js
│
├── backend
│   ├── config
│   │   └── db.js
│   │
│   ├── controllers
│   │   ├── userController.js
│   │   ├── goalController.js
│   │   └── journalController.js
│   │
│   ├── middleware
│   │   └── authMiddleware.js
│   │
│   ├── models
│   │   ├── User.js
│   │   ├── Goal.js
│   │   └── Journal.js
│   │
│   ├── routes
│   │   ├── userRoutes.js
│   │   ├── goalRoutes.js
│   │   └── journalRoutes.js
│   │
│   ├── server.js
│   └── .env
│
└── README.md

⚙️ Installation Guide

1️⃣ Clone Repository
git clone https://github.com/rupeshtechy96/Lifeos-website.git

2️⃣ Navigate to project
cd Lifeos-website

3️⃣ Install backend dependencies
cd backend
npm install

4️⃣ Create .env file
Inside backend folder:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

5️⃣ Start backend server
npm run dev

6️⃣ Run frontend

Open:
index.html in browser.

🔗 API Endpoints

User Routes
POST /api/signup
POST /api/login
GET  /api/profile/:email

Goal Routes
POST   /api/goals
GET    /api/goals/:email
PUT    /api/goals/:id
DELETE /api/goals/:id
DELETE /api/goals/user/:email

Journal Routes
POST /api/journal
GET  /api/journal/:email

🔐 Security Features
This project implements several backend security practices:

Password hashing using bcrypt
JWT authentication
Protected API routes
Authorization checks for user data
Environment variables for secrets

🚀 Future Improvements--> Possible upgrades:
Deploy frontend and backend
Add dark mode UI
Add habit tracking system
Add statistics dashboard
Add reminders and notifications
Convert into mobile app

📜 License
This project is licensed under the MIT License.

👨‍💻 Author
Rupesh Patel
GitHub
https://github.com/rupeshtechy96



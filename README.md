🚀 LifeOS – Productivity & Self-Improvement Platform

Live Demo: https://life-os-web-mu.vercel.app

LifeOS is a full-stack web application that helps users manage goals, track progress, and maintain daily reflections to improve discipline and productivity.

🎯 Problem Statement
- Lack of consistency
- Poor goal tracking
- Unstructured daily routine
- No daily reflection system

👉 LifeOS provides a simple system to organize goals and track personal growth.

## ScreenShots


<img width="900" height="500" alt="image" src="https://github.com/user-attachments/assets/bdb6a450-0b28-4e5e-af7a-8860997388a7" />

<br><br>

<img width="900" height="500" alt="image" src="https://github.com/user-attachments/assets/90ab8e76-f18d-481a-9678-b5d69ae710af" />


🛠 Tech Stack

Frontend
- HTML
- CSS
- JavaScript

Backend
- Node.js
- Express.js

Database
- MongoDB

Authentication & Security
- JWT (JSON Web Token)
- bcrypt

Tools & Deployment
- Git & GitHub
- Vercel (Frontend Hosting) --> https://life-os-web-mu.vercel.app
- Render (Backend Hosting) --> https://lifeos-web-bk4z.onrender.com

✨ Key Features

🔐 Authentication
- User signup & login
- JWT-based authentication
- Password hashing using bcrypt
  
🎯 Goal Management
- Add and delete goals
- Mark goals as completed
- Track progress
  
📊 Dashboard
- Total goals
- Completed goals
- User profile overview
  
📓 Journal
- Write daily journal entries
- Retrieve past entries

## Project Structure

```bash
LifeOS/
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── signup.html
│   ├── dashboard.html
│   ├── profile.html
│   ├── style.css
│   └── script.js
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── goalController.js
│   │   └── journalController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Goal.js
│   │   └── Journal.js
│   │
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── goalRoutes.js
│   │   └── journalRoutes.js
│   │
│   ├── server.js
│   └── .env
│
└── README.md
```

🔗 API Endpoints

User
- POST /api/signup
- POST /api/login
- GET /api/profile/:email

Goals
- POST /api/goals
- GET /api/goals/:email
- PUT /api/goals/:id
- DELETE /api/goals/:id

Journal
- POST /api/journal
- GET /api/journal/:email

🔐 Security
- Password hashing (bcrypt)
- JWT authentication
- Protected routes
- Environment variables

🚀 Future Improvements
- Habit tracking
- Notifications
- Analytics dashboard
- Mobile app

👨‍💻 Author
- Rupesh Patel
- GitHub: https://github.com/rupeshtechy96
- Linkedin: https://www.linkedin.com/in/rupeshtechy/

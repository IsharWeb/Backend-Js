# 🎬 YouTube Clone Backend (Express + MongoDB)

A fully functional backend for a YouTube-like web application using **Node.js**, **Express**, **MongoDB**, and **JWT-based Authentication**.

## 🚀 Features

- ✅ User Registration (POST `/api/v1/user/register`)
- 🧠 Modular architecture (Controllers, Routes, Utils, DB)
- 🔁 Centralized async error handling (`AsyncHandler`)
- 📦 MongoDB connection with Mongoose
- 📤 Tailored API response format (`ApiResponse`)
- ⚠️ Custom error handling (`ApiError`)
- 📁 File upload support with Multer (for video/image uploads)
- 🌐 CORS + Cookie support for frontend integration

---

## 🧠 Technologies Used

| Tool            | Purpose                        |
|-----------------|--------------------------------|
| **Node.js**     | JavaScript runtime             |
| **Express.js**  | Web framework                  |
| **MongoDB**     | NoSQL database                 |
| **Mongoose**    | ODM for MongoDB                |
| **Dotenv**      | Environment variables          |
| **Cookie-Parser** | Cookie middleware           |
| **CORS**        | Cross-origin resource sharing  |
| **Multer**      | File upload middleware         |

---

## 📁 Folder Structure

```bash
backendWeb/
└── src/
    ├── app.js              # Express app config
    ├── index.js            # Entry point (connects to MongoDB and runs server)
    ├── constant.js         # Constants like API versions, limits
    ├── controllers/        # Controller functions (e.g., registerUser)
    ├── db/                 # MongoDB connection setup
    ├── middlwares/         # Custom middlewares (e.g., multer)
    ├── models/             # Mongoose models (e.g., User, Video)
    ├── routers/            # API route files
    └── utils/              # Helpers like AsyncHandler, ApiError, Cloudinary

⚙️ Setup Instructions
1. Install dependencies
cd backendWeb
npm install
2. Setup .env file
Create a .env file in backendWeb/ with:

ini
Copy
Edit
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CORS_ORIGIN=http://localhost:5173
3. Start server
bash
Copy
Edit
npm run start
Server runs on: http://localhost:5000

📌 Example API Request
bash
Copy
Edit
POST /api/v1/user/register
Content-Type: application/json

{
  "name": "test"
}
✅ Response:

json
Copy
Edit
{
  "message": "✅ Register Form OK"
}
🧩 Key Concepts for Interview
🔄 AsyncHandler (Error Wrapper)
A custom utility to simplify async error handling in all routes without try/catch:

js
Copy
Edit
const AsyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
Used like:

js
Copy
Edit
router.route("/register").post(AsyncHandler(registerUser));
📦 Modular Code
Each concern (DB, controller, route, model, util) is separated.

Easily scalable for real-world apps (auth, video upload, subscriptions, etc.)

💡 Future Improvements
🔐 JWT Authentication & Login APIs

🎥 Video upload & streaming (Multer + Cloudinary)

💬 Comments, Likes, Subscriptions

🛠️ Admin panel support

👤 Author
Muhammad Ishar
📍 Shewa Swabi, Khyber Pakhtunkhwa, Pakistan
🧑‍💻 MERN Stack Developer | Affiliate Marketer | SEO Strategist
🌐 GitHub: IsharWeb

yaml
Copy
Edit

---

✅ Let me know when you're ready and I’ll generate the `README.md` for the **frontend (Vite + React + Tailwind)** part next.








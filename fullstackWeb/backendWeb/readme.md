# 🎬 YouTube Clone Backend (Express + MongoDB)

This is the backend for a YouTube-like full-stack web application, built using **Node.js**, **Express**, and **MongoDB**, with a fully modular and scalable architecture.

---

## 🚀 Features

- ✅ User registration with API response
- 🔁 Centralized error handling using custom `AsyncHandler`
- 🧠 Clean folder structure (controllers, routes, models, utils)
- 💾 MongoDB with Mongoose ODM
- 📁 File upload support using Multer
- 🌐 CORS setup for frontend integration
- ⚠️ Custom error responses with `ApiError`

---

## 🧠 Technologies Used

| Tool            | Purpose                        |
|-----------------|--------------------------------|
| **Node.js**     | JavaScript runtime             |
| **Express.js**  | Web framework                  |
| **MongoDB**     | NoSQL database                 |
| **Mongoose**    | ODM for MongoDB                |
| **Dotenv**      | Manage environment variables   |
| **CORS**        | Handle cross-origin requests   |
| **Multer**      | File upload middleware         |
| **Cookie-Parser** | Parse cookies from requests |

---

## 📁 Project Structure and What They Do

backendWeb/
└── src/
├── app.js
├── index.js
├── constant.js
├── controllers/
│ └── user.controller.js
├── db/
│ └── db.js
├── middlwares/
│ └── multer.middlware.js
├── models/
│ ├── user.model.js
│ └── video.models.js
├── routers/
│ └── user.routes.js
└── utils/
├── AsyncHandler.js
├── ApiResponse.js
├── ApiError.js
└── Cloudinary.js

vbnet
Copy
Edit

### 🔍 File Responsibilities

| File / Folder         | Description |
|-----------------------|-------------|
| `app.js`              | Initializes Express app, applies middlewares like `cors`, `cookie-parser`, etc. |
| `index.js`            | Main entry point; connects to MongoDB and starts the server. |
| `constant.js`         | Stores common constants used across the app (e.g. API version, response messages). |
| `controllers/`        | Contains logic for handling requests. `user.controller.js` has functions like `registerUser`. |
| `db/db.js`            | MongoDB connection using Mongoose. |
| `middlwares/`         | Contains custom middlewares like `multer` for file uploads. |
| `models/`             | Mongoose schemas for MongoDB collections. |
| `routers/`            | Express route definitions. Example: `/api/v1/user` handled in `user.routes.js`. |
| `utils/AsyncHandler.js` | Wraps async route functions to catch errors without try-catch blocks. |
| `utils/ApiResponse.js` | Formats success responses consistently. |
| `utils/ApiError.js`   | Formats error responses with status and messages. |
| `utils/Cloudinary.js` | (Optional) Integration with Cloudinary for file storage (used in video uploads). |

---

## 🔄 Example: AsyncHandler

Instead of using try/catch in every controller:

```js
const AsyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
Usage:

js
Copy
Edit
router.route("/register").post(AsyncHandler(registerUser));
🧪 Sample API: Register User
http
Copy
Edit
POST /api/v1/user/register
Content-Type: application/json

{
  "name": "test"
}
Response:

json
Copy
Edit
{
  "message": "✅ Register Form OK"
}
🛠️ Setup Instructions
1. Install dependencies
bash
Copy
Edit
cd backendWeb
npm install
2. Create .env file
env
Copy
Edit
PORT=5000
MONGODB_URI=mongodb://localhost:27017/your-db-name
CORS_ORIGIN=http://localhost:5173
3. Run the server
bash
Copy
Edit
npm start
📌 Interview Notes
✅ You built a backend API with modular structure and async error handling

✅ Your app uses Mongoose for MongoDB and follows RESTful routing

✅ You understand middlewares (e.g. Multer, CORS, cookie-parser)

✅ You designed AsyncHandler to avoid repetitive try-catch in routes

✅ You used .env, followed folder structure, and separated logic well

💡 Future Goals
Add full JWT Authentication

Enable video uploads using Cloudinary

Add user login, video streaming, comments, likes, subscriptions

Admin panel to manage content and users

👤 Author
Muhammad Ishar
📍 Shewa Swabi, Khyber Pakhtunkhwa, Pakistan
🧑‍💻 MERN Stack Developer | Affiliate Marketer
🔗 GitHub: IsharWeb

yaml
Copy
Edit

---




import express from "express"
import cors from "cors"
import  cookieParser from "cookie-parser";

const app = express()
app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        credentials: true
    }
))

app.use(express.json(
    {
        limit: "10kb"
    }
))
app.use(express.urlencoded(
    {
        limit: "10kb",
        extended: true,
    }
))
app.use(express.static("public"))
app.use(cookieParser())

// import router
import userRouter from "./routers/user.router.js"

// routes declaration
app.use("/api/v1/user", userRouter)

// http://localhost:5000/api/v1/user


export { app };


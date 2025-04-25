import dotenv from "dotenv"
import connectDB from "./db/db.js"


dotenv.config({
    path:"./env",
})
connectDB()










































// import mongoose from "mongoose";
// import { DB_NAME } from "./constant.js";
// import express from "express"

// const app = express()
//     ; (async () => {
//         try {

//             await mongoose.connect(`${process.env.MONGODB_URL}/{DB_NAME}`)
//             app.on("Error", (error) => {
//                 console.log("Ouer Data baise connection Error", error);
//             app.listen(process.env.PORT, () => {
//                  console.log(`API lissing on PORT = ${process.env.PORT}`);
                 
//             })

//                 throw error
//             })

//         } catch (error) {
//             console.log("Mongo Data Baise connection error :", error);
//             throw error
//         }
//     })()
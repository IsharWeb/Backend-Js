import dotenv from "dotenv"
import connectDB from "./db/db.js"
import express from "express"
// dotenv.config()
dotenv.config({
    path:"./env",
})

const app = express()
const port = process.env.PORT

connectDB()
.then(() => {
  app.listen(port || 3000 , () => {
    console.log(`Mongo DB Server running on PORT =  http://localhost:5000/api/v1/user
 ${port}`);
    
  })
})
.catch((err) => {
console.log("Mongo DB Express connection errr !!!", err);
throw err;


})









































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
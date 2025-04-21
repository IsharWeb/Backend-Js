import express from "express";
import { fileURLToPath } from "url"
import path from "path"
import dotenv from "dotenv"

dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// console.log(`app = ${app}`);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
    //res.send('<h1>Home Url Hellow Backend Js <h1/>')
})

app.get("/port", (req, res) => {
    app

    //res.send('<h1>Port Url Hellow Backend Js <h1/>')
})



export default app;
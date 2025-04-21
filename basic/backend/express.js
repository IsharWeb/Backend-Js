import  express  from "express";
import dotenv from "dotenv"

dotenv.config()

const app = express();
// console.log(`app = ${app}`);

app.get("/", (req, res) => {
    res.send('<h1>Home Url Hellow Backend Js <h1/>')
})

app.get("/port", (req, res) => {app
    app
    res.send('<h1>Port Url Hellow Backend Js <h1/>')
})



export default app;
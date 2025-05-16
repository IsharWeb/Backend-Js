import express, { Router} from "express"
import { registerUser } from "../controllers/user.controller.js";

const app = express()
const userRouter = Router()

userRouter.route("/register").post(registerUser)

export default userRouter;
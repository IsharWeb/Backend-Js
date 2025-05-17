import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlwares/multer.middlware.js";

const router = Router();

router.route("/register").post(
    upload.fields[
    { name: "avatar", maxCount: 1 }
    , { name: "coverImage", maxCount: 1 }
    ]
    , registerUser
);


// error
// function nm(params) {
//     console.log('kjkkkkkkkkkkkkkkkkkjjjjjjjjjjjjj')
// }
// router.route("/login").post(
//     console.log('kjkkkkkkkkkkkkkkkkkjjjjjjjjjjjjj',nm)
// );
export default router; 

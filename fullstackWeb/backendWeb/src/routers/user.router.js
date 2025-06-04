import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { loginUser } from "../controllers/user.controller.js";
import { logoutUser } from "../controllers/user.controller.js";

import { upload } from "../middlwares/multer.middlware.js";

const router = Router();

router.route("/register").post(
    upload.fields([
        { name: "avatar", maxCount: 1 }
        , { name: "coverImage", maxCount: 1 }
    ])
    , registerUser
);

router.route("/logout").post(logoutUser)
router.route("/logub").post(loginUser)



// error
// function nm(params) {
//     console.log('kjkkkkkkkkkkkkkkkkkjjjjjjjjjjjjj')
// }
// router.route("/login").post(
//     console.log('kjkkkkkkkkkkkkkkkkkjjjjjjjjjjjjj',nm)
// );
// router.route("/login").post((req, res) => {
//     console.log("Login route hit");
//     res.send("Login test");
//   });

export default router; 

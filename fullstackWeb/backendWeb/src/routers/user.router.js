import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { loginUser } from "../controllers/user.controller.js";
import { logoutUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlwares/auth.middlware.js";
import {refreshAccessToken} from "../controllers/user.controller.js"
import {changePassword} from "../controllers/user.controller.js"
import { updateProfile } from "../controllers/userController.js";
import { getUserChannelProfile } from "../controllers/userController.js";



import { upload } from "../middlwares/multer.middlware.js";

const router = Router();

router.route("/register").post(
    upload.fields([
        { name: "avatar", maxCount: 1 }
        , { name: "coverImage", maxCount: 1 }
    ])
    , registerUser
);
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/login").post(loginUser)
// router.post("/logout", verifyJWT, logoutUser);
router.route("/refrash-token").post(refreshAccessToken)
router.post("/change-password", verifyToken, changePassword);
router.put("/update-profile", verifyToken, updateProfile);
router.get("/channel/:username",verifyToken, getUserChannelProfile);


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

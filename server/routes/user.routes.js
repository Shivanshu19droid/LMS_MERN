import { Router } from "express";
import {getProfile, login, logout, register} from "../controllers/user.controller.js"
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";
import { forgotPassword } from "../controllers/user.controller.js";
import { resetPassword } from "../controllers/user.controller.js";
import { changePassword } from "../controllers/user.controller.js";
import { updateUser } from "../controllers/user.controller.js";


const router = Router(); //making a new usable instance of Router

router.post('/register',upload.single("avatar"), register); //the upload middleware is defined in the multer.middleware.js
router.post('/login', login);
router.get('/logout', logout); 
router.get('/me', isLoggedIn, getProfile);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:resetToken', resetPassword);
router.post('/change-password', isLoggedIn, changePassword); //this route is to change the password when you remember the existing one
router.post('/update/:id', isLoggedIn, upload.single("avatar"), updateUser);

export default router;
import express, { Router } from "express";
import * as authController from "../controllers/auth";

const router: Router = express.Router();

router.post("/user/login", authController.login); //user login
router.post("/user/signup", authController.signUp); //user signup
router.post("/resturant/login", authController.resturantLogin); //resturant login
router.post("/user/forget-password", authController.userForgotPassword); //user forget password
router.get("/user/reset-password", authController.getUserResetPassword); //user reset password
router.post("/user/reset-password", authController.postUserResetPassword); //user reset password

export default router;

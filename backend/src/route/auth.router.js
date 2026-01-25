import express from "express";
import { forgotPassword, login, refresh, registerUser, sendOtp, verifyOtp } from "../controller/auth.controller.js";

const router = express.Router();
router.post("/user/register", registerUser);
router.post("/user/login", login);
router.post("/user/verify-otp", verifyOtp);
router.post("/user/resend-otp",sendOtp);
router.post("/user/forgot-password", forgotPassword);
router.post("/refresh",refresh);
export const authRouter = router;   

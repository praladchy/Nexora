import express from "express";
import { forgotPassword, login, refresh, registerUser, reSendOtp, sendOtp, superAdmin, verifyOtp } from "../controller/auth.controller.js";
import { adminMiddleware } from "../middleware/auth.middleware.js";
import { createAdmin } from "../controller/superAdmin/admin.controller.js";

const router = express.Router();
router.post("/user/register", registerUser);

router.post("/admin/register",adminMiddleware, createAdmin);   
router.post("/user/login", login);
router.post("/user/verify-otp", verifyOtp);
router.post("/user/send-otp",sendOtp);

router.post("/user/resend-otp",reSendOtp);
router.post("/user/forgot-password", forgotPassword);
router.get("/refresh",refresh);
export const authRouter = router;   

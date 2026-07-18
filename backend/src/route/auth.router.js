import express from "express";
import { forgotPassword, login, logout, refresh, registerUser, reSendOtp, sendOtp, superAdmin, verifyOtp } from "../controller/auth.controller.js";
import { createAdmin } from "../controller/superAdmin/admin.controller.js";
import { authMiddleware, checkPermission, roleMiddleware } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.multer.js";
import { getAppUser, getUsers } from "../controller/admin/user.controller.js";

const router = express.Router();
router.post("/user/register", registerUser);

router.post("/admin/register",authMiddleware,roleMiddleware(["superAdmin","admin"]), upload.array("images",5),checkPermission("admin.create"), createAdmin); 
// router.get("/user/activeusers/gets",authMiddleware,roleMiddleware(["superAdmin","admin","vendor","vendorAdmin"]),checkPermission("user.list"),getAppUser)
// router.get("/user/gets",authMiddleware,roleMiddleware(["superAdmin","admin","vendor","vendorAdmin"]),checkPermission("user.list"),getUsers)
router.get("/user/gets",authMiddleware,roleMiddleware(["superAdmin","admin","vendor","vendorAdmin"]),getUsers)

router.post("/user/login", login);
router.post("/user/verify-otp", verifyOtp);
router.post("/user/send-otp",sendOtp);

router.post("/user/resend-otp",reSendOtp);
router.post("/user/forgot-password/:userId", forgotPassword);
router.post("/user/logout",authMiddleware,logout)
router.get("/refresh",refresh);
export const authRouter = router;   

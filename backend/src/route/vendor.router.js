import express from "express";
import { getVendorAdmins, getVendorById, getVendors, sendEmailOtp, sendPhoneOtp, updateVendor, vendorAdminRegistration, vendorRegistration, verifyEmailOtp, verifyPhoneOtp } from "../controller/vendor/vendor.controller.js";
import { authMiddleware, checkPermission, roleMiddleware } from "../middleware/auth.middleware.js";
import { getUsers } from "../controller/admin/user.controller.js";
const router=express.Router()

router.post("/create",authMiddleware,roleMiddleware(["superAdmin","admin","user"]),checkPermission("vendor.create"),vendorRegistration)
router.post("user/create",authMiddleware,roleMiddleware(["user"]),vendorRegistration)

router.post("/create/emailOtpSend",authMiddleware,roleMiddleware(["superAdmin","user","vendor"]),sendEmailOtp)
router.post("/create/emailVerify",authMiddleware,roleMiddleware(["superAdmin","user","vendor"]),verifyEmailOtp)
router.post("/create/phoneOtpSend",authMiddleware,roleMiddleware(["superAdmin","user","vendor"]),sendPhoneOtp)
router.post("/create/phoneOtpVerify",authMiddleware,roleMiddleware(["superAdmin","user","vendor"]),verifyPhoneOtp)



router.post("/admin/create",authMiddleware,roleMiddleware(["superAdmin","admin","vendor"]),checkPermission("vendor.create"),vendorAdminRegistration)
router.get("/admin/vendorAdmins",authMiddleware,roleMiddleware(["superAdmin","admin","vendor"]),getVendorAdmins)



router.get("/get",authMiddleware,roleMiddleware(["superAdmin","admin","vendor","vendorAdmin"]),checkPermission("vendor.list"),getVendors)

router.get("/get/:id",authMiddleware,roleMiddleware(["superAdmin","admin","vendor","vendorAdmin"]),checkPermission("vendor.view"),getVendorById)

router.patch("/update/:id",authMiddleware,roleMiddleware(["superAdmin","admin","vendor","vendorAdmin"]),checkPermission("vendor.update"),updateVendor)
router.patch("/delete/:id",authMiddleware,roleMiddleware(["superAdmin","admin","vendor","vendorAdmin"]),checkPermission("vendor.delete"),updateVendor)

export const vendorRouter=router
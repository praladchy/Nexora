import express from "express";
import { getNotificationForUser } from "../controller/notification.controller.js";
import {
  authMiddleware,
  roleMiddleware,
} from "../middleware/auth.middleware.js";
const router = express.Router();
router.get(
  "/getNotification",
  authMiddleware,
  roleMiddleware([
    "superAdmin",
    "admin",
    "vendor",
    "vendorAdmin",
    "owner",
    "shopAdmin",
  ]),
  getNotificationForUser,
);

export const notificationRouter = router;

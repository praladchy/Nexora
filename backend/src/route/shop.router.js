import express from "express";
import {
  createShop,
  deleteShop,
  getShopById,
  getShops,
  updateShop,
} from "../controller/admin/shop.controller.js";
import { adminMiddleware, checkPermission } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.multer.js";
const router = express.Router();
router.post("/createShop",adminMiddleware,checkPermission(""),upload.array("images",5), createShop);
router.get("/getShops",adminMiddleware,checkPermission(""), getShops);
router.get("/getShop/:shopId",adminMiddleware,checkPermission(""), getShopById);
router.patch("/updateShop/:shopId",adminMiddleware,checkPermission(""),upload.array("images",5), updateShop);
router.delete("/deleteShop/:shopId",adminMiddleware,checkPermission(""), deleteShop);
export const shoprouter=router;

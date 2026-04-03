import express from "express";
import {
  assignAdmin,
  assignOwner,
  createShop,
  deleteShop,
  getActiveShops,
  getShopById,
  getShops,
  removeAdmin,
  removeOwner,
  updateShop,
} from "../controller/admin/shop.controller.js";
import { authMiddleware, checkPermission, roleMiddleware } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.multer.js";
const router = express.Router();
router.post("/createShop",authMiddleware,roleMiddleware(["superAdmin","admin","vendor"]),checkPermission("shop.create"),upload.array("images",5), createShop);

router.get("/getShops",authMiddleware,roleMiddleware(["superAdmin","admin","vendor"]),checkPermission("shop.list"), getShops);
router.get("/getActiveShops",authMiddleware,roleMiddleware(["superAdmin","admin","vendor"]),checkPermission("shop.list"), getActiveShops);

router.get("/getShop/:shopId",authMiddleware,roleMiddleware(["superAdmin","admin","vendor"]),checkPermission("shop.view"), getShopById);
router.patch("/updateShop/:shopId",authMiddleware,roleMiddleware(["superAdmin","admin","vendor"]),checkPermission("shop.update"),upload.array("images",5), updateShop);
router.delete("/deleteShop/:shopId",authMiddleware,roleMiddleware(["superAdmin","admin","vendor"]),checkPermission("shop.delete"), deleteShop);


router.patch("/assignOwner/:shopId/:userId",authMiddleware,roleMiddleware(["superAdmin","admin","vendor","owner"]),checkPermission("user.assign_permission"),assignOwner);
router.patch("/removeOwner/:shopId/:userId",authMiddleware,roleMiddleware(["superAdmin","admin","vendor","owner"]),checkPermission("user.remove_permission"),removeOwner);
router.patch("/assignAdmin/:shopId/:userId",authMiddleware,roleMiddleware(["superAdmin","admin","vendor","owner"]),checkPermission("user.assign_permission"),assignAdmin);
router.patch("/removeAdmin/:shopId/:userId",authMiddleware,roleMiddleware(["superAdmin","admin","vendor","owner"]),checkPermission("user.remove_permission"),removeAdmin);


export const shoprouter=router;

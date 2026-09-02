import express from "express";
import {
  assignAdmin,
  assignOwner,
  createShop,
  deleteShop,
  getActiveShops,
  getshopAdmins,
  getshopAdminsByOwner,
  getShopById,
  getShops,
  removeAdmin,
  removeOwner,
  shopAdminRegistration,
  shopOwnerRegistration,
  updateShop,
} from "../controller/admin/shop.controller.js";
import { authMiddleware, checkPermission, roleMiddleware } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.multer.js";
const router = express.Router();
router.post("/createShop",authMiddleware,roleMiddleware(["superAdmin","admin","vendor","vendorAdmin"]),checkPermission("shop.create"),upload.array("images",5), createShop);
router.post("/registerShopAdmin",authMiddleware,roleMiddleware(["superAdmin","admin","vendor","vendorAdmin"]),checkPermission("create.shopAdmin"),upload.array("images",5), shopAdminRegistration);

router.post("/registerShopOwner",authMiddleware,roleMiddleware(["superAdmin","admin","vendor","vendorAdmin","owner"]),checkPermission("create.shopAdmin"),upload.array("images",5), shopOwnerRegistration);

router.get("/getShops",authMiddleware,roleMiddleware(["superAdmin","admin","vendor","vendorAdmin"]),checkPermission("shop.list"), getShops);
router.get("/getshopAdmins",authMiddleware,roleMiddleware(["superAdmin","admin","vendor","vendorAdmin","shopAdmin","owner"]),checkPermission("shop.adminList"), getshopAdmins);

router.get("/getshopAdminsOwner",authMiddleware,roleMiddleware(["superAdmin","admin","vendor","vendorAdmin","shopAdmin","owner"]),checkPermission("shop.adminList"), getshopAdminsByOwner
);

router.get("/getActiveShops",authMiddleware,roleMiddleware(["superAdmin","admin","vendor","vendorAdmin","shopAdmin","owner"]),checkPermission("shop.list"), getActiveShops);

router.get("/getShop/:shopId",authMiddleware,roleMiddleware(["superAdmin","admin","vendor","vendorAdmin","shopAdmin","owner"]),checkPermission("shop.view"), getShopById);
router.patch("/updateShop/:shopId",authMiddleware,roleMiddleware(["superAdmin","admin","vendor","vendorAdmin","shopAdmin","owner"]),checkPermission("shop.update"),upload.array("images",5), updateShop);
router.delete("/deleteShop/:shopId",authMiddleware,roleMiddleware(["superAdmin","admin","vendor","vendorAdmin","shopAdmin","owner"]),checkPermission("shop.delete"), deleteShop);


router.patch("/assignOwner/:shopId/:userId",authMiddleware,roleMiddleware(["superAdmin","admin","vendor","owner"]),checkPermission("user.assign_permission"),assignOwner);
router.patch("/removeOwner/:shopId/:userId",authMiddleware,roleMiddleware(["superAdmin","admin","vendor","owner"]),checkPermission("user.remove_permission"),removeOwner);
router.patch("/assignAdmin/:shopId/:userId",authMiddleware,roleMiddleware(["superAdmin","admin","vendor","owner",]),checkPermission("user.assign_permission",),assignAdmin);
router.patch("/removeAdmin/:shopId/:userId",authMiddleware,roleMiddleware(["superAdmin","admin","vendor","owner"]),checkPermission("user.remove_permission"),removeAdmin);


export const shoprouter=router;

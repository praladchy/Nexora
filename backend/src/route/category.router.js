import express from "express";
import { createCategory, deleteCategory, getCategory, getCategoryByShop, getCategoryBySlug, updateCategory } from "../controller/admin/category.controller.js";
import {   authMiddleware, checkPermission, roleMiddleware } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.multer.js";
const router=express.Router();
router.post("/createCategory",authMiddleware,roleMiddleware(["superAdmin","admin","vendor","vendorAdmin"]),checkPermission("category.create"),upload.array("images",5),createCategory);
router.get("/getCategory",authMiddleware,roleMiddleware(["superAdmin","admin","vendor","vendorAdmin"]),checkPermission("category.list"),getCategory);

router.get("/shop/:shopId",authMiddleware,roleMiddleware(["superAdmin","admin","vendor","vendorAdmin"]),checkPermission("category.view"),getCategoryByShop);  
router.get("/:slug",authMiddleware,roleMiddleware(["superAdmin","admin","vendor","vendorAdmin"]),checkPermission("category.view"),getCategoryBySlug);
router.patch("/:id",authMiddleware,roleMiddleware(["superAdmin","admin","vendor","vendorAdmin"]),checkPermission("category.update"),upload.array("images",5),updateCategory);
router.delete("/:id",authMiddleware,roleMiddleware(["superAdmin","admin","vendor","vendorAdmin"]),checkPermission("category.delete"),deleteCategory);
export const categoryrouter=router;
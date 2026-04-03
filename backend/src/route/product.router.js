import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProductsByCategory,
  getProductsByShop,
  updateProduct,
} from "../controller/admin/product.controller.js";
import { roleMiddleware, authMiddleware, checkPermission } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.multer.js";
const router = express.Router();
router.post("/createproduct",authMiddleware,roleMiddleware(["superAdmin","admin","vendor","vendorAdmin"]),checkPermission("product.create"), upload.array("images",5),createProduct);
 
router.get("/getProduct/:id",authMiddleware,roleMiddleware(["superAdmin","admin","vendor","vendorAdmin"]),checkPermission("product.view"), getProductById);

router.get("/getProducts/:shopId",authMiddleware,roleMiddleware(["superAdmin","admin","vendor","vendorAdmin"]),checkPermission("product.list"), getProductsByShop);
router.get("/category/:categoryId",authMiddleware,roleMiddleware(["superAdmin","admin","vendor","vendorAdmin"]),checkPermission("product.list"), getProductsByCategory);
router.patch("updateProduct/:id",authMiddleware,roleMiddleware(["superAdmin","admin","vendor","vendorAdmin"]),checkPermission("product.update"), upload.array("images",5),updateProduct);
router.delete("deleteProduct/:id",authMiddleware,roleMiddleware(["superAdmin","admin","vendor","vendorAdmin"]),checkPermission("product.delete"), deleteProduct);
export const productrouter=router;

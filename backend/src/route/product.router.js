import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProductsByCategory,
  getProductsByShop,
  updateProduct,
} from "../controller/admin/product.controller.js";
import { adminMiddleware, checkPermission } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.multer.js";
const router = express.Router();
router.post("/createproduct",adminMiddleware,checkPermission(""), upload.array("images",5),createProduct);
router.get("/getProducts",adminMiddleware,checkPermission(""), getProductsByShop);
router.get("/getProduct/:id",adminMiddleware,checkPermission(""), getProductById);

router.get("/getProducts/:shopId",adminMiddleware,checkPermission(""), getProductsByShop);
router.get("/category/:categoryId",adminMiddleware,checkPermission(""), getProductsByCategory);
router.patch("updateProduct/:id",adminMiddleware,checkPermission(""), upload.array("images",5),updateProduct);
router.delete("deleteProduct/:id",adminMiddleware,checkPermission(""), deleteProduct);
export const productrouter=router;

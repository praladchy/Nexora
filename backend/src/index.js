import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDb } from "./config/db.config.js";
import { authRouter } from "./route/auth.router.js";
import { authMiddleware } from "./middleware/auth.middleware.js";
import { shoprouter } from "./route/shop.router.js";
import { categoryrouter } from "./route/category.router.js";
import { productrouter } from "./route/product.router.js";
import { superAdmin } from "./controller/auth.controller.js";
import {permissionRouter} from "./route/permission.router.js";
import { vendorRouter } from "./route/vendor.router.js";
import whishListRouter from "./route/whishList.router.js";
import cartRouter from "./route/cart.router.js";
import orderRouter from "./route/order.router.js";
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    // origin: ["https://nexora11.vercel.app", "https://nexora-39iv.vercel.app"],


    credentials: true,
  })
)
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRouter);
app.use("/api/shop",shoprouter);
app.use("/api/permission",permissionRouter);
app.use("/api/category",categoryrouter);
app.use("/api/product",productrouter);
app.use("/api/vendor",vendorRouter);
app.use("/api/whishList",whishListRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);


connectDb().then(() => {
  superAdmin();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

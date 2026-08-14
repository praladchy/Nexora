import express from "express";
import { getProductAggregate } from "../service/product.aggregate.js";
import {
  authMiddleware,
  checkPermission,
  roleMiddleware,
} from "../middleware/auth.middleware.js";
import { categoryAggreate } from "../service/category.aggerate.js";
import { OrderAggregate } from "../service/order.agregate.js";
import { dateAggregate } from "../service/date.aggregate.js";

const router = express.Router();

router.get(
  "/productAggregate",
  authMiddleware,
  roleMiddleware(["superAdmin", "admin", "vendor", "vendorAdmin"]),
  getProductAggregate,
);

router.get(
  "/orderAggregate",
  authMiddleware,
  roleMiddleware(["superAdmin", "admin", "vendor", "vendorAdmin"]),
  OrderAggregate,
);

router.get(
  "/categoryAggregate",
  authMiddleware,
  roleMiddleware(["superAdmin", "admin", "vendor", "vendorAdmin"]),
  categoryAggreate,
);

router.get(
  "/dateAggregate",
  authMiddleware,
  roleMiddleware(["superAdmin", "admin", "vendor", "vendorAdmin"]),
  dateAggregate,
);

export const serviceRouter = router;

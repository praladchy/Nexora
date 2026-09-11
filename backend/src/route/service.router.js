import express from "express";

import {
  authMiddleware,
  roleMiddleware,
} from "../middleware/auth.middleware.js";

// Admin
import { getProductAggregate } from "../controller/admin/aggregate/product.aggregate.js";

import { categoryAggreate } from "../controller/admin/aggregate/category.aggerate.js";

import { dateAggregate } from "../controller/admin/aggregate/date.aggregate.js";

import { OrderAggregate } from "../controller/admin/aggregate/order.aggregate.js";

// Super Admin
import {
  getProductAggregateForSuperAdmin,
  getProductAggregateForSuperAdminForShop,
  getProductAggregateForSuperAdminForShopCategory,
} from "../controller/superAdmin/aggregate/product.aggregate.js";

import {
  OrderAggregateForSuperAdmin,
  OrderAggregateForSuperAdminForShop,
} from "../controller/superAdmin/aggregate/order.aggregate.js";

import {
  categoryAggregateForSuperAdmin,
  categoryAggregateForSuperAdminForShop,
} from "../controller/superAdmin/aggregate/category.aggerate.js";

import {
  dateAggregateForSuperAdmin,
  dateAggregateForSuperAdminForShop,
} from "../controller/superAdmin/aggregate/date.aggregate.js";

const router = express.Router();

// ADMIN / VENDOR / OWNER

router.get(
  "/productAggregate",
  authMiddleware,
  roleMiddleware(["superAdmin", "admin", "vendor", "vendorAdmin", "owner"]),
  getProductAggregate,
);

router.get(
  "/orderAggregate",
  authMiddleware,
  roleMiddleware(["superAdmin", "admin", "vendor", "vendorAdmin", "owner"]),
  OrderAggregate,
);

router.get(
  "/categoryAggregate",
  authMiddleware,
  roleMiddleware(["superAdmin", "admin", "vendor", "vendorAdmin", "owner"]),
  categoryAggreate,
);

router.get(
  "/dateAggregate",
  authMiddleware,
  roleMiddleware(["superAdmin", "admin", "vendor", "vendorAdmin", "owner"]),
  dateAggregate,
);


router.get(
  "/productAggregateForSuperAdmin",
  authMiddleware,
  roleMiddleware(["superAdmin"]),
  getProductAggregateForSuperAdmin,
);

router.get(
  "/orderAggregateForSuperAdmin",
  authMiddleware,
  roleMiddleware(["superAdmin"]),
  OrderAggregateForSuperAdmin,
);

router.get(
  "/categoryAggregateForSuperAdmin",
  authMiddleware,
  roleMiddleware(["superAdmin"]),
  categoryAggregateForSuperAdmin,
);

router.get(
  "/dateAggregateForSuperAdmin",
  authMiddleware,
  roleMiddleware(["superAdmin"]),
  dateAggregateForSuperAdmin,
);


// Product by Shop
router.get(
  "/productAggregateForShop/:shopId",
  authMiddleware,
  roleMiddleware(["superAdmin"]),
  getProductAggregateForSuperAdminForShop,
);

// Product by Shop + Category
router.get(
  "/productAggregateForShopCategory/:shopId/:categoryId",
  authMiddleware,
  roleMiddleware(["superAdmin"]),
  getProductAggregateForSuperAdminForShopCategory,
);

// Order by Shop
router.get(
  "/orderAggregateForShop/:shopId",
  authMiddleware,
  roleMiddleware(["superAdmin"]),
  OrderAggregateForSuperAdminForShop,
);

// Category by Shop
router.get(
  "/categoryAggregateForSuperAdminForShop/:shopId",
  authMiddleware,
  roleMiddleware(["superAdmin"]),
  categoryAggregateForSuperAdminForShop,
);

// Date by Shop
router.get(
  "/dateAggregateForSuperAdminForShop/:shopId",
  authMiddleware,
  roleMiddleware(["superAdmin"]),
  dateAggregateForSuperAdminForShop,
);

export const serviceRouter = router;

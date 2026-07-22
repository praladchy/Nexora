import express from "express";
import { assignPermissionUserById, createPermission, deletePermission, getActivePermissions, getPermissionById, getPermissions, removePermissionUserById, updatePermission } from "../controller/superAdmin/permission.controller.js";
import { authMiddleware, checkPermission, roleMiddleware } from "../middleware/auth.middleware.js";

const router=express.Router();

router.post("/create",authMiddleware,roleMiddleware(["superAdmin","admin"]),checkPermission("permission.create"),createPermission);

router.get("/get/:id",authMiddleware,roleMiddleware(["superAdmin","admin","vendor","vendorAdmin"]),checkPermission("permission.view"),getPermissionById);
router.patch("/remove/:id/:userId",authMiddleware,roleMiddleware(["superAdmin","admin","vendor","vendorAdmin"]),checkPermission("user.remove_permission"),removePermissionUserById);
 
router.get("/get",authMiddleware,roleMiddleware(["superAdmin","admin","vendor","vendorAdmin"]),checkPermission("permission.list"),getPermissions);
router.get("/gets/active",authMiddleware,roleMiddleware(["superAdmin","admin","vendor","vendorAdmin"]),checkPermission("permission.list"),getActivePermissions);


router.patch("/assign/:id/:userId",authMiddleware,roleMiddleware(["superAdmin","admin","vendor","vendorAdmin"]),checkPermission("user.assign_permission"),assignPermissionUserById);
router.patch("/update/:id",authMiddleware,roleMiddleware(["superAdmin","admin","vendor","vendorAdmin"]),checkPermission("permission.update"),updatePermission)
router.patch("/delete/:id",authMiddleware,roleMiddleware(["superAdmin","admin","vendor","vendorAdmin"]),checkPermission("permission.delete"),deletePermission);



export const permissionRouter=router
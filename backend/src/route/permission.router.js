import express from "express";
import { assignPermissionUserById, createPermission, deletePermission, getActivePermissions, getPermissionById, getPermissions, removePermissionUserById, updatePermission } from "../controller/superAdmin/permission.controller.js";
import { authMiddleware, checkPermission, roleMiddleware } from "../middleware/auth.middleware.js";

const router=express.Router();

router.post("/create",authMiddleware,roleMiddleware(["superAdmin","admin"]),checkPermission("permission.create"),createPermission);
// router.get("/get",authMiddleware,roleMiddleware(["superAdmin","admin","vendor"]),checkPermission("permission.list"),getPermissions);
//  router.get("/get/ActivePermissions",authMiddleware,roleMiddleware(["superAdmin","admin","vendor"]),checkPermission("permission.list"),getActivePermissions);

router.get("/get/:id",authMiddleware,roleMiddleware(["superAdmin","admin","vendor"]),checkPermission("permission.view"),getPermissionById);
// router.patch("/assign/:id/:userId",authMiddleware,roleMiddleware(["superAdmin","admin","vendor"]),checkPermission("user.assign_permission"),assignPermissionUserById);
router.patch("/remove/:id/:userId",authMiddleware,roleMiddleware(["superAdmin","admin","vendor"]),checkPermission("user.remove_permission"),removePermissionUserById);
// router.post("/create",authMiddleware,roleMiddleware(["superAdmin","admin"]),createPermission);
router.get("/get",authMiddleware,roleMiddleware(["superAdmin","admin","vendor"]),getPermissions);
router.get("/gets/active",authMiddleware,roleMiddleware(["superAdmin","admin","vendor"]),getActivePermissions);


// router.get("/get/:id",authMiddleware,roleMiddleware(["superAdmin","admin","vendor"]),getPermissionById);
router.patch("/assign/:id/:userId",authMiddleware,roleMiddleware(["superAdmin","admin","vendor"]),assignPermissionUserById);
// router.patch("/remove/:id/:userId",authMiddleware,roleMiddleware(["superAdmin","admin","vendor"]),removePermissionUserById);
router.patch("/update/:id",authMiddleware,roleMiddleware(["superAdmin","admin","vendor"]),updatePermission)
router.patch("/delete/:id",authMiddleware,roleMiddleware(["superAdmin","admin","vendor"]),deletePermission);



export const permissionRouter=router
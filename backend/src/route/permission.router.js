import express from "express";
import { assignPermissionUserById, createPermission, deletePermission, getPermissionById, getPermissions, removePermissionUserById, updatePermission } from "../controller/superAdmin/permission.controller.js";

const router=express.Router();

router.post("/create",createPermission);
router.get("/get",getPermissions);
router.get("/get/:id",getPermissionById);
router.patch("/update/id/:userId",assignPermissionUserById);
router.delete("/remove/:id/:userId",removePermissionUserById);
router.patch("/update/:id",updatePermission)
router.delete("/delete/:id",deletePermission);



export const permissionRouter=router
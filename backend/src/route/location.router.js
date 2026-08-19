import express from "express";
const router = express.Router();
import { saveLocation } from "../controllers/location.controller.js";

router.post("/location", saveLocation);

export default router;
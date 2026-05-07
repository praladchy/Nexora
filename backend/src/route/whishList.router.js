import { addWhishList, getWhishList, removeWhishList } from "../controller/user/whislist.controller.js"
import { authMiddleware } from "../middleware/auth.middleware.js"
import express from "express"

const whishListRouter=express.Router()
whishListRouter.post("/addToWhishList",authMiddleware,addWhishList)
whishListRouter.get("/getWhishList",authMiddleware,getWhishList)
whishListRouter.delete("/removeFromWhishList/:itemId",authMiddleware,removeWhishList)
export default  whishListRouter
import { createOrder, deleteOrder, getOrders, getOrdersForUser, updateOrder } from "../controller/user/order.controller.js"
import { authMiddleware } from "../middleware/auth.middleware.js"
import express from "express"
const orderRouter=express.Router()
orderRouter.post("/createOrder",authMiddleware,createOrder)
orderRouter.get("/getOrdersForUser",authMiddleware,getOrdersForUser)
// orderRouter.get("/getOrder/:id",authMiddleware,getOrderById)
// orderRouter.patch("/updateOrderStatus/:id",authMiddleware,updateOrderStatus)
orderRouter.get("/getOrders",authMiddleware,getOrders)
orderRouter.patch("/updateOrder/:id",authMiddleware,updateOrder)
orderRouter.patch("/updateOrder/:id",authMiddleware,deleteOrder)

export default orderRouter
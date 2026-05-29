import express from "express"
import { authMiddleware } from "../middleware/auth.middleware.js"
import { cart, getCart, removeFromCart, updateCart } from "../controller/user/cart.controller.js"
const cartRouter=express.Router()
cartRouter.get("/getCart",authMiddleware,getCart)

cartRouter.post("/addToCart/:shopId/:productId",authMiddleware,cart)
cartRouter.patch("/updateCart/:shopId/:productId",authMiddleware,updateCart)
cartRouter.delete("/removeFromCart/:itemId",authMiddleware,removeFromCart)
// cartRouter.patch("/updateCartItem/:itemId",authMiddleware,updateCartItem)

export default cartRouter
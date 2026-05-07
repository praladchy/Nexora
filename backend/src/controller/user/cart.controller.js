import { User } from "../../models/user.model.js";
import Product from "../../models/product.model.js";
import Cart from "../../models/cart.model.js";

export const cart = async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  const userId = req.user.userId;
  console.log("userId:", userId);

  console.log("product, quantity, userId:", productId, quantity, userId);

  try {
    // check user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    // check product
    const product = await Product.findById(productId).populate("shop");

    if (!product) {
      return res.status(400).json({
        message: "Product not found",
        success: false,
      });
    }
    // find cart
    let cart = await Cart.findOne({
      user: userId,
    });

    // create cart if not exists
    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [],
        subTotal: 0,
      });
    }

    // check existing product in items[]
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId,
    );

    if (existingItem) {
      existingItem.quantity += quantity || 1;
      existingItem.totalPrice = existingItem.quantity * existingItem.price;
      res.status(400).json({
        message: "product already presents in Cart",
        success: false,
      });
    } else {
      cart.items.push({
        product: productId,
        quantity: quantity || 1,
        price: product.price,
        totalPrice: (quantity || 1) * product.price,
        shop: product.shop._id,
      });
    }

    // recalculate subtotal
    cart.subTotal = cart.items.reduce(
      (total, item) => total + item.totalPrice,
      0,
    );

    // save updated cart
    await cart.save();

    return res.status(200).json({
      message: "Product added to cart",
      success: true,
      cart,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Not added to cart, Internal server error",
      success: false,
      error: error.message,
    });
  }
};
export const getCart = async (req, res) => {
  const userId = req.user.userId;
  try {
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Cart retrieved successfully",
      success: true,
      cart: cart.items,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error, Cart is not retrieved",
      success: false,
      error: error.message,
    });
  }
};
export const updateCart = async (req, res) => {
  const userId = req.user.userId;
  const { productId } = req.params;
  const { quantity } = req.body;

  try {
    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Please add products before updating cart",
      });
    }

    const product = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    product.quantity = quantity;

    product.totalPrice = product.quantity * product.price;

    cart.subTotal = cart.items.reduce(
      (total, item) => total + item.totalPrice,
      0
    );

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cart,
    });

  } catch (error) {
    console.error("Update cart error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
export const removeFromCart = async (req, res) => {
  const { itemId } = req.params;
  console.log("remove from cart is connected", itemId);
  const userId = req.user.userId;

  try {
    const cart = await Cart.findOne({ user: userId });
    console.log("cart found for user:", cart);
    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
        success: false,
      });
    }
    const index = cart.items.findIndex(
      (item) => item._id.toString() === itemId,
    );
    if (index < 0)
      return res.status(404).json({
        message: "Item not found in cart",
        success: false,
      });
    cart.subTotal -= cart.items[index].totalPrice;
    cart.items.splice(index, 1);
    cart.save();
    return res.status(200).json({
      message: "Item removed from cart",
      success: true,
      cart,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error, Item is not removed from cart",
      success: false,
      error: error.message,
    });
  }
};

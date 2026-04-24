import User from "../../models/user.model.js";
import Product from "../../models/product.model.js";
import Cart from "../../models/cart.model.js";

export const cart = async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  const userId = req.user;

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
    const product = await Product.findById(productId);

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
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity || 1;
      existingItem.totalPrice =
        existingItem.quantity * existingItem.price;
    } else {
      cart.items.push({
        product: productId,
        quantity: quantity || 1,
        price: product.price,
        totalPrice: (quantity || 1) * product.price,
      });
    }

    // recalculate subtotal
    cart.subTotal = cart.items.reduce(
      (total, item) => total + item.totalPrice,
      0
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
import { Order } from "../../models/order.model.js";
import Product from "../../models/product.model.js";
import Shop from "../../models/shop.model.js";
import { User } from "../../models/user.model.js";
import Cart from "../../models/cart.model.js";
// helper: calculate commission
const getCommissionRate = (product) => {
  // priority: product > category > shop default > global default

  if (product.commissionRate) return product.commissionRate;
  if (product.category?.commissionRate) return product.category.commissionRate;
  if (product.shop?.commissionRate) return product.shop?.commissionRate;

  return 10; // default 10%
};

// helper: calculate discount
const applyDiscount = (price, discount) => {
  if (!discount) return 0;

  if (discount.type === "percent") {
    return (price * discount.value) / 100;
  }

  if (discount.type === "fixed") {
    return discount.value;
  }

  return 0;
};

export const createOrder = async (req, res) => {
  const userId = req.user.userId;
  try {
    const {
      selectedItems,
      // [{ productId, quantity }]
      paymentMethod = "cash", // cash, khalti, esewa
      isPOS = false,
      deliveryCharge = 0,
      // { type: "percent", value: 10 }
    } = req.body;
    // console.log("selectedItems", selectedItems);
    const user = await User.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ message: "User not found", success: false });

    let subtotal = 0;
    let totalCommission = 0;
    let totalDiscount = 0;
    let orderItems = [];

    for (const item of selectedItems) {
      const product = await Product.findOne({
        _id: item.product._id,
        shop: item.shop,
      }).populate("category");
      if (!product) continue;

      const price = product.price;
      const quantity = item.quantity;
      const discount = product.discount;
      console.log("dfghjk", discount);
      const itemTotal = price * quantity;
      const discountAmount = itemTotal * (discount / 100);
      // discount per item (optional logic)
      console.log("discountAmount", discountAmount);
      const finalItemPrice = itemTotal - discountAmount;

      // commission
      const commissionRate = getCommissionRate(product);

      console.log("commissionRate", commissionRate);
      const commission = (finalItemPrice * commissionRate) / 100;

      subtotal += finalItemPrice;
      totalCommission += commission;
      totalDiscount += discountAmount;
      console.log("cvbnm,", totalDiscount);
      orderItems.push({
        product: product._id,
        name: product.name,
        price,
        quantity,
        discount: discountAmount,
        finalPrice: subtotal,
        commission: totalCommission,
        shop: product.shop,
      });
      // reduce stock (POS + online both)
      product.stock -= quantity;
      await product.save();
    }

    // VAT (Nepal 13%)
    const tax = subtotal * 0.13;
    console.log("tax osok", tax);
    // payment gateway fee (only if online)
    let gatewayFee = 0;
    if (!isPOS && paymentMethod !== "cash") {
      gatewayFee = subtotal * 0.02; // 2%
    }

    const totalAmount = subtotal + tax + deliveryCharge + gatewayFee;

    const vendorEarning = subtotal - totalCommission;

    const order = await Order.create({
      user,
      orderItems: orderItems,
      itemsPrice: subtotal,
      taxPrice: tax,
      shippingPrice: deliveryCharge,
      gatewayFee,
      totalAmount,
      commission: totalCommission,
      vendorEarning,
      paymentMethod,
      totalDiscount,
      isPOS,
      status: isPOS ? "completed" : "Pending",
    });
    const cart = await Cart.findOne({ user: userId });

    if (cart) {
      const orderItem = orderItems.map((item) => item.product.toString());
      console.log("orderItems", orderItems);
      cart.items = cart.items.filter(
        (item) => !orderItem.includes(item.product.toString()),
      );
      console.log("cart.items", cart.items);
    }
    await cart.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Order creation failed",
      error: error.message,
    });
  }
};

export const getOrdersForUser = async (req, res) => {
  const { userId } = req.user;
  console.log("userId", userId);
  try {
    const orders = await Order.find({ user: userId })
      .populate("orderItems.product")
      .populate("orderItems.shop");

    if (!orders)
      return res
        .status(404)
        .json({ message: "No orders found", success: false });

    res.status(200).json({ orders, success: true });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message,
      success: false,
    });
  }
};
export const getOrders = async (req, res) => {
  const { userId } = req.user;
  try {
    const orders = await Order.find({ paymentsStatus: "Pending" })
      .populate("items.product")
      .populate("shop");
    if (!orders)
      return res
        .status(404)
        .json({ message: "No orders found", success: false });

    res.status(200).json({ orders, success: true });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message,
      success: false,
    });
  }
};
export const getOrderById = async (req, res) => {
  const { id } = req.params;
  console.log("id", id);
  try {
    const order = await Order.findById(id)
      .populate("orderItems.product")
      .populate("orderItems.shop");
    console.log("order", order);
    if (!order)
      res.status(404).json({
        message: "order not found",
        success: false,
      });
    res.status(200).json({
      message: "order fetched successfully",
      success: true,
      order,
    });
  } catch (error) {}
};
export const updateOrder = async (req, res) => {
  conole.log("update order called");
  //   const {userId}=req.user
  //   const {}

  // try {
  //   const user=await Order.find({user:userId,paymentStatus:"Pending"})
  //   if(!user)
  //   return res.status(404).json({message:"order not found or complete order",success:false})

  // } catch (error) {

  // }
};

export const deleteOrder = async (req, res) => {
  const { orderId } = req.params;
  console.log("orderId xcvbnm,", orderId);
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found", success: false });
    }
    if (order.status !== "Pending") {
      return res
        .status(404)
        .json({ message: "Order can't be deleted", success: false });
    }
    // order.orderItems = order.orderItems.filter(
    //   (item) => orderItems.product.toString() !== orderId,
    // );
    // if (order.orderItems.length === 0)
    //   return await Order.findByIdAndDelete(orderId);

    // await Order.findByIdAndDelete(orderId);
    order.status = "Cancelled";
    await order.save();
    res.status(200).json({
      message: "Order deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: `failed to delete order,`,
      data: error.message,
      success: false,
    });
  }
};

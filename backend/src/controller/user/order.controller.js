import { Order } from "../../models/order.model.js";
import Product from "../../models/product.model.js";
import Shop from "../../models/shop.model.js";
import { User } from "../../models/user.model.js";
// helper: calculate commission
const getCommissionRate = (product ) => {
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
      discount = null, // { type: "percent", value: 10 }
    } = req.body;
// console.log("selectedItems", selectedItems);
    const user = await User.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ message: "User not found", success: false });

    let subtotal = 0;
    let totalCommission = 0;
    let orderItems = [];

    for (const item of selectedItems) {
      const product = await Product.findOne({
        _id: item.product._id,
        shop: item.shop,
      }).populate("category");
      // console.log("dfghjkllgf",item, item.product._id, item.shop, product);
      if (!product) continue;

      const price = product.price;
      const quantity = item.quantity;

      const itemTotal = price * quantity;

      // discount per item (optional logic)
      const discountAmount = applyDiscount(itemTotal, discount);

      const finalItemPrice = itemTotal - discountAmount;

      // commission
      const commissionRate = getCommissionRate(product );
      const commission = (finalItemPrice * commissionRate) / 100;

      subtotal += finalItemPrice;
      totalCommission += commission;

      orderItems.push({
        product: product._id,
        name: product.name,
        price,
        quantity,
        discount: discountAmount,
        finalPrice: finalItemPrice,
        commission,
        shop: product.shop,
      });

      // reduce stock (POS + online both)
      product.stock -= quantity;
      await product.save();
    }

    // VAT (Nepal 13%)
    const tax = subtotal * 0.13;

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
      tax,
      deliveryCharge,
      gatewayFee,
      totalAmount,
      commission: totalCommission,
      vendorEarning,
      paymentMethod,
      isPOS,
      status: isPOS ? "completed" : "pending",
    });

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
  try {
    const orders = await Order.find({ user: userId })
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
  const { userId } = req.user;
  try {
    const order = await Order.findById(userId);
    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found", success: false });
    }
    order.orderItems = order.orderItems.filter(
      (item) => orderItems.product.toString() !== productId,
    );
    if (order.orderItems.length === 0)
      return await Order.findByIdAndDelete(userId);
  } catch (error) {
    res.status(500).json({
      message: `failed to delete oerder,`,
      data: error.message,
      success: false,
    });
  }
};

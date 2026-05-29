import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        shop: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Shop", 
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
        },
        
        discount: {
          type: Number,
          default: 0,
        },

        price: {
          type: Number,
          required: true,
        },

        orderStatus: {
          type: String,
          enum: [
            "Pending",
            "Confirmed",
            "Packed",
            "Shipped",
            "Delivered",
            "Cancelled",
          ],
          default: "Pending",
        },
      },
    ],

    shippingAddress: {
      fullName: String,
      phone: String,
      address: String,
      city: String,
      postalCode: String,
      country: String,
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "Khalti", "Esewa", "Stripe","cash"],
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Refunded"],
      default: "Pending",
    },

    itemsPrice: {
      type: Number,
      required: true,
    },

    taxPrice: {
      type: Number,
      default: 0,
    },

    shippingPrice: {
      type: Number,
      default: 0,
    },
    totalDiscount: {
      type: Number,
      default: 0,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    isPaid: {
      type: Boolean,
      default: false,
    },

    paidAt: Date,
  },
  { timestamps: true },
);

export const Order= mongoose.model("Order", orderSchema);

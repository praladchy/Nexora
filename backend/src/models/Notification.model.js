import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      default: null,
    },

    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      default: null,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      default: null,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    message: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["shop.Create", "create.Category","create.Product"],
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    link:{
      type:String,
      default:""

    }
  },
  { timestamps: true },
);
export const Notification = mongoose.model("Notification", notificationSchema);

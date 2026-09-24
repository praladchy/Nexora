import mongoose from "mongoose";
import { Notification } from "../models/Notification.model.js";

export const getNotificationForUser = async (req, res) => {
  try {
    const user= req.user;
    const userI=user.userId
    console.log("user", userI);
    const userId=new mongoose.Types.ObjectId(userI)
    console.log("userId", userId);
    const notification = await Notification.find({ recipient: userId });
    if (!notification) {
      res
        .status(404)
        .json({ message: "No notification found", success: false });
    }
    res
      .status(200)
      .json({
        message: "notification fetch successfully",
        data: notification,
        success: true,
      });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch notification",
      error: error.message,
      success: false,
    })
  }
};

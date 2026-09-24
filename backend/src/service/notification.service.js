import { Notification } from "../models/Notification.model.js";
import Shop from "../models/shop.model.js";
import { User } from "../models/user.model.js";
import vendorModel from "../models/vendor.model.js";

export const platformUserForNotificaton = async () => {
  try {
    const user = await User.find({
      $or: [{ role: "superAdmin" }, { role: "admin" }],
    });
    const userId = new Set();
    user.forEach((user) => {
      userId.add(user._id);
    });
    return [...userId];
    userId;
  } catch (error) {
    console.log("Error in PlatformUser Notification", error);
  }
};
export const getVendorUserforNotification = async (vendorId) => {
  try {
    const vendor = await vendorModel.findById(vendorId);
    const userId = new Set();
    if (!vendor.owner) {
      return console.log("Add first vendor owner", vendor.owner);
    } else {
      userId.add(vendor.owner.ToString());
    }
    if (Array.isArray(vendor.admins)) {
      vendor.admins.forEach((admin) => {
        userId.add(admin.ToString());
      });
    }
    return [...userId];
  } catch (error) {
    console.log("Error in getVendorUser Notification", error);
  }
};
export const getShopUserForNotification = async (shopId) => {
  try {
    const shop = await Shop.findById(shopId);
    const userId = new Set();
    if (!shop.owner) {
      return console.log("Add first shop owner", shop.owner);
    } else {
      userId.add(shop.owner);
    }
    if (Array.isArray(shop.admins)) {
      shop.admins.forEach((admin) => {
        userId.add(admin);
      });
    }
    return [...userId];
  } catch (error) {
    console.log("Error in getShopUser Notification", error);
  }
};
export const createShopNotification = async ({
  shop: shopId,
  message,
  title,
  type,
  io,
  link
}) => {
  try {
    const user = await platformUserForNotificaton();
    if (!user || user.length === 0) {
      return console.log("Add first platform user", []);
    }
    const notificationData = user.map((user) => ({
      recipient: user,
      shop: shopId,
      message,
      title,
      type,
      link
    }));
    const notification = await Notification.insertMany(notificationData);
    console.log("notificationData", notification);

    if (io)
      notification.forEach((notification) => {
        io.to(`user:${notification.recipient.toString()}`).emit("newNotification", {
          notification,
        });
      });
    return notification;
  } catch (error) {
    console.log("Error in createShopNotification", error);
  }
};

export const shopNotification = async ({
  shop: shopId,
  order,
  product,
  message,
  admin,
  owner,
  category,
  title,
  type,
  io,
  link
}) => {
  try {
    // 1. Get users who should receive notification
    const userIds = await getShopUserForNotification(shopId);

    // 2. Check if users exist
    if (!userIds || userIds.length === 0) {
      console.log("No shop users found for notification");
      return [];
    }

    // 3. Create notification documents
    const notificationData = userIds.map((user) => ({
      recipient: user,
      shop: shopId,
      order,
      product,
      message,
      admin,
      owner,
      category,
      title,
      type,
      link
    }));

    // 4. Save all notifications
    const notifications = await Notification.insertMany(notificationData);

    // 5. Send realtime notification
    if (io) {
      notifications.forEach((notification) => {
        io.to(`user:${notification.recipient.toString()}`).emit(
          "newNotification",
          notification,
        );
      });
    }

    return notifications;
  } catch (error) {
    console.error("Error in ShopNotification:", error);
    throw error;
  }
};
export const adminNotification = async ({ user, title, message, type,link }) => {
  try {
    const users = await platformUserForNotificaton();

    const notificationData = user.map((users) => ({
      recipient: users,
      admin: user,
      message,
      title,
      type,
      link,
    }));
    const notification = await Notification.insertMany(notificationData);
    if (io)
      notification.forEach((notification) => {
        io.to(`user:${notification.recipient}`).emit("newNotification", {
          notification,
        });
      });
    return notification;
  } catch (error) {
    console.log("Error in adminNotification", error);
  }
};
 
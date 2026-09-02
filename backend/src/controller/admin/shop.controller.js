import { User } from "../../models/user.model.js";

import fs from "fs";
import Shop from "../../models/shop.model.js";
import cloudinary from "../../config/cloudinary.js";
import mongoose from "mongoose";
import otp from "../../models/otpVerification.model.js";

export const createShop = async (req, res) => {
  try {
    const { name, email, phone, description, address } = req.body;

    if (!name)
      return res.status(400).json({ message: "Shop name is required" });
    if (!email && !phone)
      return res.status(400).json({ message: "Email or phone is required" });

    // Check if shop exists
    const shop = await Shop.findOne({
      $or: [
        { name },
        ...(email ? [{ email }] : []),
        ...(phone ? [{ phone }] : []),
      ],
    });
    if (shop) return res.status(400).json({ message: "Shop already exists" });

    let logoUrl = null;

    if (req.files && req.files.length > 0) {
      const file = req.files[0];

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "shops",
      });
      logoUrl = result.secure_url;

      // Remove local file after upload
      fs.unlink(file.path, (err) => {
        if (err) console.error("Failed to delete local file:", err);
      });
    }

    // Save shop with Cloudinary URL
    const newShop = new Shop({
      name,
      email,
      phone,
      description,
      address,
      logo: logoUrl,
    });

    await newShop.save();

    return res.status(201).json({
      message: "Shop created successfully",
      success: true,
      shop: newShop,
    });
  } catch (error) {
    console.error(error);
    if (!res.headersSent) {
      return res.status(500).json({
        message: "Internal server error, shop is not created",
        success: false,
        error: error.message,
      });
    }
  }
};
export const shopOwnerRegistration = async (req, res) => {
  const admin = new mongoose.Types.ObjectId(req.user.userId);
  console.log("lkjfkdoeiioep", admin);
  const { email, phone } = req.body;
  try {
    if (!admin || !email || !phone)
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    const user = await User.findOne({ email }).populate("createdBy");

    if (!user)
      return res.status(400).json({
        message: "User not exist,plz register first",
        success: false,
      });
    if (user.role === "owner") {
      return res.status(400).json({
        message: "User is already a shop owner",
        success: false,
      });
    }

    const otpRecord = await otp.findOne({ email });
    console.log("otpRecord", otpRecord);
    if (!otpRecord || !otpRecord.emailVerified) {
      return res.status(400).json({
        message: "Please verify email and phone first",
        success: false,
      });
    }
    user.role = "owner";
    user.createdBy = admin;
    await user.save();
    res.status(200).json({
      message: "Owner registered successfully,please wait for approval",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error,Owner is not registered",
      success: false,
      error: error.message,
    });
  }
};
export const shopAdminRegistration = async (req, res) => {
  const ownerId = new mongoose.Types.ObjectId(req.user.userId);
  const { email, phone } = req.body;
  try {
    if (!ownerId || !email || !phone)
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    const user = await User.findOne({ email }).populate("createdBy");

    if (!user)
      return res.status(400).json({
        message: "User not exist,plz register first",
        success: false,
      });
    if (user.role === "shopAdmin") {
      return res.status(400).json({
        message: "User is already a shop admin",
        success: false,
      });
    }

    const otpRecord = await otp.findOne({ email });
    console.log("otpRecord", otpRecord);
    if (!otpRecord || !otpRecord.emailVerified) {
      return res.status(400).json({
        message: "Please verify email and phone first",
        success: false,
      });
    }
    user.role = "shopAdmin";
    user.createdBy = ownerId;
    await user.save();
    res.status(200).json({
      message: "Admin registered successfully,please wait for approval",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error,Admin is not registered",
      success: false,
      error: error.message,
    });
  }
};
export const getshopAdminsByOwner = async (req, res) => {
  try {
    const ownerId = new mongoose.Types.ObjectId(req.user.userId);

    const shopAdmins = await User.find({
      createdBy: ownerId,
      role: "owner",
    })
      .populate("createdBy", "firstName email")
      .select("-password");
    console.log("ghjkmncccsq", shopAdmins);
    if (!shopAdmins.length) {
      return res.status(404).json({
        message: "No shop admins found",
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      shopAdmins,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
export const getshopAdmins = async (req, res) => {
  try {
    const ownerId = new mongoose.Types.ObjectId(req.user.userId);

    const shopAdmins = await User.find({
      $or: [
        {
          createdBy: ownerId,
          role: "shopAdmin",
        },
      ],
    })
      .populate("createdBy", "firstName email")
      .select("-password");
    console.log("ghjkmncccsq", shopAdmins);
    if (!shopAdmins.length) {
      return res.status(404).json({
        message: "No shop admins found",
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      shopAdmins,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
export const getShops = async (req, res) => {
  try {
    const shops = await Shop.find().populate("owner").populate("admins");
    res.status(200).json({
      message: "Shops retrieved successfully",
      success: true,
      shops,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error,shops are not retrieved",
      success: false,
      error: error.message,
    });
  }
};
export const getActiveShops = async (req, res) => {
  try {
    // const shops = await Shop.find({ isActive: true })
    //   .populate("owner")
    //   .populate("admins");
    const shops = await Shop.find().populate("owner").populate("admins");
    res.status(200).json({
      message: "Shops retrieved successfully",
      success: true,
      shops,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error,shops are not retrieved",
      success: false,
      error: error.message,
    });
  }
};
export const getShopById = async (req, res) => {
  try {
    const { shopId } = req.params;
    const shop = await Shop.findById(shopId)
      .populate("owner")
      .populate("admins");
    if (!shop) return res.status(404).json({ message: "Shop not found" });
    res.status(200).json({
      message: "Shop retrieved successfully",
      success: true,
      shop,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error,shop is not retrieved",
      success: false,
      error: error.message,
    });
  }
};
export const updateShop = async (req, res) => {
  const { shopId } = req.params;
  try {
    const shop = await Shop.findByIdAndUpdate(shopId, req.body, {
      new: true,
    });
    if (!shop) return res.status(404).json({ message: "Shop not found" });
    res.status(200).json({
      message: "Shop updated successfully",
      success: true,
      shop,
    });
  } catch (e) {
    res.status(500).json({
      message: "Internal server error,shop is not updated",
      success: false,
      error: e.message,
    });
  }
};
export const deleteShop = async (req, res) => {
  const { isActive } = req.body;
  try {
    const { shopId } = req.params;
    const shop = await Shop.findById(shopId);
    if (!shop) return res.status(404).json({ message: "Shop not found" });
    if (shop.isActive === false)
      return res.status(400).json({ message: "Shop is not active" });
    shop.isActive = isActive;
    await shop.save();
    res.status(200).json({
      message: "Shop deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error,shop is not deleted",
      success: false,
      error: error.message,
    });
  }
};
export const assignOwner = async (req, res) => {
  try {
    const { userId, shopId } = req.params;
    const user = await User.findById(userId).populate("shops");
    if (!user)
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    // if (!user.isActive || !user.isVerified)
    //   return res.status(400).json({
    //     message: "user is not active or verified",
    //     success: false,
    //   });
    const shop = await Shop.findById(shopId).populate("owner");

    if (!shop)
      return res.status(400).json({
        message: "Shop is not registered",
        sucess: false,
      });
    if (shop.owner)
      return res.status(400).json({
        message: "Shop already has an owner",
        success: false,
      });

    const result = await User.updateOne(
      {
        _id: userId,
        shops: { $ne: shopId }, // only if NOT exists
      },
      {
        $addToSet: { shops: shopId },
        role: "owner",
      },
    );

    if (result.modifiedCount === 0) {
      return res.status(400).json({
        message: "user is already assigned to this shop",
      });
    }
    shop.owner = user._id;
    await shop.save();
    res.status(200).json({
      message: "User is assigned to shop successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error,user is not assigned to shop",
      success: false,
      error: error.message,
    });
  }
};

export const removeOwner = async (req, res) => {
  try {
    const { userId, shopId } = req.params;
    const user = await User.findById(userId).populate("shops");
    if (!user)
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    // if (!user.isActive || !user.isVerified)
    //   return res.status(400).json({
    //     message: "user is not active or verified",
    //     success: false,
    //   });
    const shop = await Shop.findById(shopId).populate("owner");
    if (!shop)
      return res.status(400).json({
        message: "Shop is not registered",
        sucess: false,
      });
    if (user.shops.some((p) => p.toString() === shop._id.toString())) {
      return res.status(400).json({
        message: "User is not assigned this shop",
        success: false,
      });
    }
    await User.findByIdAndUpdate(userId, { $pull: { shops: shop._id } });
    // await Shop.findByIdAndUpdate(shopId,{$pull:{owner:user._id}});

    // user.shops = user.shops.filter((p) => p.toString() !== shop._id.toString());
    shop.owner = null;

    await user.save();
    await shop.save();
    res.status(200).json({
      message: "User is removed from shop successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error,user is not removed from shop",
      success: false,
      error: error.message,
    });
  }
};
export const assignAdmin = async (req, res) => {
  try {
    const { userId, shopId } = req.params;
    const user = await User.findById(userId);
    if (!user)
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    if (!user.isVerified)
      // if (!user.isActive || !user.isVerified)

      return res.status(400).json({
        message: "user is not active or verified",
        success: false,
      });
    const shop = await Shop.findById(shopId).populate("admins");
    if (!shop)
      return res.status(400).json({
        message: "Shop is not registered",
        sucess: false,
      });
    if (user.shops.some((p) => p.toString() === shop._id.toString())) {
      return res.status(400).json({
        message: "user is already assigned to this shop",
        success: false,
      });
    }
    if (shop.admins.some((p) => p.toString() === user._id.toString())) {
      res.status(400).json({
        message: "this user is already assign the shop",
        success: false,
      });
    }
    user.shops.push(shop._id);
    await user.save();
    shop.admins.push(user._id);
    await shop.save();
    res.status(200).json({
      message: "User is assigned to shop successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error,user is not assigned to shop",
      success: false,
      error: error.message,
    });
  }
};

export const removeAdmin = async (req, res) => {
  try {
    const { userId, shopId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    if (!user.isVerified) {
      return res.status(400).json({
        message: "User is not verified",
        success: false,
      });
    }

    const shop = await Shop.findById(shopId);

    if (!shop) {
      return res.status(400).json({
        message: "Shop is not registered",
        success: false,
      });
    }

    // Check user has this shop
    const userHasShop = user.shops.some(
      (shop) => shop.toString() === shopId.toString(),
    );

    if (!userHasShop) {
      return res.status(400).json({
        message: "User is not assigned to this shop",
        success: false,
      });
    }

    // Check user is admin of this shop
    const isAdmin = shop.admins.some(
      (adminId) => adminId.toString() === user._id.toString(),
    );

    if (!isAdmin) {
      return res.status(400).json({
        message: "This user is not assigned as an admin of this shop",
        success: false,
      });
    }

    // Remove shop from user's shops
    user.shops = user.shops.filter(
      (shopId) => shopId.toString() !== shop._id.toString(),
    );

    // Remove user from shop admins
    shop.admins = shop.admins.filter(
      (adminId) => adminId.toString() !== user._id.toString(),
    );

    await user.save();
    await shop.save();

    return res.status(200).json({
      message: "User removed from shop successfully",
      success: true,
    });
  } catch (error) {
    console.error("removeAdmin error:", error);

    return res.status(500).json({
      message: "Internal server error while removing user from shop",
      success: false,
      error: error.message,
    });
  }
};

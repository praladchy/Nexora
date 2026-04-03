import mongoose from "mongoose";
import Otp from "../../models/otpVerification.model.js";
import { User } from "../../models/user.model.js";
import Vendor from "../../models/vendor.model.js";
import { sendEmail } from "../../utils/emailVerification.js";
import { sendOtpSms } from "../../utils/phoneVerification.js";
export const vendorRegistration = async (req, res) => {
  const userId = req.user.userId;
  console.log("vendor data", userId);
  const { vendorName, email, phone, commisssionRate } = req.body;
  try {
    if (!vendorName || !email || !phone)
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    const vendor = await Vendor.findOne({ email }).populate("owner");
    if (vendor)
      return res.status(400).json({
        message: "Vendor already exists,please enter Bussiness email",
        success: false,
      });

    const otpRecord = await Otp.findOne({ email });
    console.log("otpRecord", otpRecord);
    if (!otpRecord || !otpRecord.emailVerified) {
      return res.status(400).json({
        message: "Please verify email and phone first",
        success: false,
      });
    }
    const user = await User.findById(userId);
    if (!user)
      return res.status(400).json({
        message: "User not exist,register first",
        success: false,
      });
    if (user.role === "vendor") {
      return res.status(400).json({
        message: "User is already a vendor",
        success: false,
      });
    }
    const newVendor = new Vendor({
      owner: user._id,
      vendorName,
      email,
      phone,
      commisssionRate,
      createdDate: new Date(),
    });
    await newVendor.save();
    user.role = "vendor";
    await user.save();

    res.status(200).json({
      message: "Vendor registered successfully,please wait for approval",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error,vendor is not registered",
      success: false,
      error: error.message,
    });
  }
};
export const vendorAdminRegistration = async (req, res) => {
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
    if (user.role === "vendorAdmin") {
      return res.status(400).json({
        message: "User is already a vendor admin",
        success: false,
      });
    }

    const otpRecord = await Otp.findOne({ email });
    console.log("otpRecord", otpRecord);
    if (!otpRecord || !otpRecord.emailVerified) {
      return res.status(400).json({
        message: "Please verify email and phone first",
        success: false,
      });
    }
    user.role = "vendorAdmin";
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
  export const getVendorAdmins = async (req, res) => {
  try {
    const ownerId = new mongoose.Types.ObjectId(req.user.userId);
    const vendorAdmins = await User.find({
      createdBy: ownerId,
      role: "vendorAdmin",
    })
      .populate("createdBy", "firstName email")
      .select("-password");
    if (!vendorAdmins.length) {
      return res.status(404).json({
        message: "No vendor admins found",
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      vendorAdmins,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const getVendors = async (req, res) => {
  try {
    const vendor = await Vendor.find();
    if (!vendor && vendor.length === 0)
      return res
        .status(404)
        .json({ message: "No vendors found", success: false });
    res.status(200).json({
      message: "Vendors retrieved successfully",
      success: true,
      vendor,
    });
  } catch (error) {}
};
export const getVendorById = async (req, res) => {
  const { id } = req.params;
  try {
    const vendor = await Vendor.findById(id);
    if (!vendor)
      return res
        .status(404)
        .json({ message: "Vendor not found", success: false });
    res.status(200).json({
      message: "Vendor retrieved successfully",
      success: true,
      vendor,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error,vendor is not retrieved",
      success: false,
      error: error.message,
    });
  }
};

export const updateVendor = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedVendor = await Vendor.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedVendor)
      return res.status(404).json({
        message: "Vendor not found",
        success: false,
      });
    updatedVendor.updatedDate = new Date();
    await updatedVendor.save();
    res.status(200).json({
      message: "Vendor updated successfully",
      success: true,
      updatedVendor,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error,vendor is not updated",
      success: false,
      error: error.message,
    });
  }
};
export const deleteVendor = async (req, res) => {
  const { id } = req.params;
  try {
    const vendor = await Vendor.findById(id);
    if (!vendor)
      return res
        .status(404)
        .json({ message: "Vendor not found", success: false });
    vendor.isActive = false;
    await vendor.save();
    res
      .status(200)
      .json({ message: "Vendor deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error,vendor is not deleted",
      success: false,
      error: error.message,
    });
  }
};

export const sendEmailOtp = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await sendEmail({ email, otp });

    await Otp.findOneAndUpdate(
      { email },
      { emailOtp: otp },
      { upsert: true, new: true },
    );

    res.json({
      message: "Email OTP sent successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to send email OTP",
      success: false,
    });
  }
};

export const verifyEmailOtp = async (req, res) => {
  const { email, otp } = req.body;
  console.log(email, otp);
  const vendor = await Otp.findOne({ email });

  if (!vendor)
    return res.json({
      message: "Vendor not found",
      success: false,
    });

  if (vendor.emailOtp !== otp)
    return res.json({
      message: "Invalid email OTP",
      success: false,
    });

  vendor.emailVerified = true;
  vendor.emailOtp = null;
  await vendor.save();

  res.json({
    message: "Email verified successfully",
    success: true,
  });
};

export const sendPhoneOtp = async (req, res) => {
  const { phone } = req.body;

  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await sendOtpSms(phone, otp);

    await otpVerificationModel.findOneAndUpdate({ phone }, { phoneOtp: otp });

    res.json({
      message: "Phone OTP sent successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to send phone OTP",
      success: false,
    });
  }
};

export const verifyPhoneOtp = async (req, res) => {
  const { phone, otp } = req.body;

  const vendor = await Otp.findOne({ phone });

  if (!vendor)
    return res.json({
      message: "Vendor not found",
      success: false,
    });

  if (vendor.phoneOtp !== otp)
    return res.json({
      message: "Invalid phone OTP",
      success: false,
    });

  vendor.phoneVerified = true;
  await vendor.save();

  res.json({
    message: "Phone verified successfully",
    success: true,
  });
};

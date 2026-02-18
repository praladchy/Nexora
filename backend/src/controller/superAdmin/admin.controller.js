import bcrypt from "bcrypt";
import { User } from "../../models/user.model.js";
import {generateOTP} from "../../utils/otp.js"
import { sendEmail } from "../../utils/emailVerification.js";
import { sendOtpSms } from "../../utils/phoneVerification.js";
export const createAdmin=async (req, res) => {
    const { firstName, lastName, email, phone, password, verifyBy,isActive } = req.body;
    const role = "admin";
  try {
    if (!email && !phone && !password && !firstName) {
      return res.status(400).json({
        message: "Email or phone is required",
      });
    }

    // Create an array of conditions for $or
    const orConditions = [];
    if (email) orConditions.push({ email });
    if (phone) orConditions.push({ phone });

    // Check if user exists with EITHER the same email OR same phone
    const existingUser = await User.findOne({
      $or: orConditions,
    });
    if (existingUser && existingUser.isVerified)
      return res.status(400).json({
        message: "User is already registered",
      });
    let verificationMethod = "email";

    if (verifyBy === "phone") {
      verificationMethod = "phone";
    } else if (verifyBy == "email") {
      verificationMethod = "email";
    }

    const otp = generateOTP();
    console.log("OTP:", otp);
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 min

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      verificationMethod,
      otp,
      otpExpireAt: otpExpiry,
      role,
      isActive
    });

    await user.save();

    try {
      if (verificationMethod === "email") {
        sendEmail({ email, otp });
      } else {
        sendOtpSms(phone, otp);
      }
    } catch (error) {
      console.error("Error sending OTP:", error.message);
    }

    res.status(201).json({
      message: `User registered successfully, OTP sent via ${verificationMethod}`,
      success: true,
      userid: user._id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Registration failed",
      data: error.message,
    });
  }
};

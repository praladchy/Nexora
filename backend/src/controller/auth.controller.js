import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import { sendEmail } from "../utils/emailVerification.js";
import { sendOtpSms } from "../utils/phoneVerification.js";
import { generateOTP } from "../utils/otp.js";
import jwt from "jsonwebtoken";
import { generateAccessToken, generaterefreshToken,
} from "../utils/jwttoken.js";

export const registerUser = async (req, res) => {
  const { firstName, lastName, email, phone, password, verifyBy } = req.body;
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
export const superAdmin=async(req,res)=>{
  const email=process.env.superAdmin;
  const password=process.env.superAdminPassword;
  const role="superAdmin";
  try {
    if(!email&& !password){ 
      return console.log("enter super email and passworrd");}
    const user=await User.findOne({email,role});
    if(role==="superAdmin" && user){
      return  }
    const hashedPassword = await bcrypt.hash(password, 10);
    const superAdmin=new User({
      firstName:"Super",
      lastName:"Admin",
      email,
      password:hashedPassword,
      role,
      isActive:true,
      isVerified:true,

    })
    await superAdmin.save();
  } catch (error) {
    console.log("server error not able to create super admin",error.message);
  }
}
export const login = async (req, res) => {
  const { email, phone, password } = req.body;
  try {
    const query = {};
    if (email) query.email = email;
    // if (phone) query.phone = phone;
    const user = await User.findOne(query).select("+password");
    if (!user)
      return res
        .status(401)
        .json({ message: "User not found", success: false });

    if (!user.isVerified)
      return res
        .status(403)
        .json({ message: "User not verified", success: false });
 
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res
        .status(401)
        .json({ message: "Invalid password", success: false });



    const refreshToken = await generaterefreshToken(user);
    const accessToken = await generateAccessToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax", // for localhost
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    const safeuser = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
    };

    res.status(200).json({
      message: "User Login successfully",
      success: true,
      safeuser,
      accessToken,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error, user not login",
      success: false,
      data: error.message,
    });
  }
};
export const forgotPassword = async (req, res) => {
  const { email, phone, password, confirmPassword } = req.body;
  
  try {
    if (!email || !phone || !password || !confirmPassword)
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    const user = await User.findOne({ $or: [{ email }, { phone }] });
    if (!user)
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    if (user.isVerified === false)
      return res.status().json({
        message: "User is not verified",
        success: false,
      });
    if (password !== confirmPassword)
      return res.status(400).json({
        message: "NewPassword and ConfirmPassword do not match",
        success: false,
      });
    if (password.length < 6)
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
        success: false,
      });
    user.password = password;
    await user.save();
    res.status(200).json({
      message: "Password reset successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      success: false,
      error: error.message,
    });
  }
};
export const logout = (req, res) => {
  try {
    res.clearCookie("token");

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};
export const sendOtp = async (req, res) => {
  const { email: email, phone: phone, verifyBy } = req.body;

  try {
    if (!email || !phone)
      return res.status(400).json({
        message: "Email or phone is required",
        success: false,
      });
    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    if (user.isVerified === true)
      return res.status(400).json({
        message: "User is already verified",
        success: false,
      });
    const otp = Math.floor(10000 + Math.random() * 90000).toString();
    if (verifyBy === "phone") {
      sendOtpSms(phone, otp);
    } else {
      sendEmail({ email, otp });
    }
    user.otp = otp;
    user.isVerified = false;
    user.otpExpireAt = new Date();
    await user.save();
    res.status(200).json({
      message: "Otp sent to your email successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      success: false,
      error: error.message,
    });
  }
};
export const reSendOtp = async (req, res) => {
  const { userId } = req.body;
  console.log(userId);
  try {
    const user = await User.findById(userId);

    if (!user)
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    if (user.isVerified === true)
      return res.status(400).json({
        message: "User is already verified",
        success: false,
      });
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    if (user.verifyBy === "phone") {
      sendOtpSms({ phone: user.phone, otp });
    } else {
      sendEmail({ email: user.email, otp });
    }
    user.otp = otp;
    user.isVerified = false;
    user.otpExpireAt = new Date();
    await user.save();
    res.status(200).json({
      message: "Otp sent to your email successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      success: false,
      error: error.message,
    });
  }
};
export const verifyOtp = async (req, res) => {
  const { userId, otp } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    if (!user.otpExpireAt || user.otpExpireAt < new Date()) {
      return res.status(400).json({
        message: "OTP has expired",
        success: false,
      });
    }
    if (String(user.otp) !== String(otp))
      return res.status(400).json({
        message: "Invalid OTP",
        success: false,
      });
    // const refreshToken = await generaterefreshToken(user);
    // const accessToken = await generateAccessToken(user);

    // user.refreshToken = refreshToken;

    user.otp = null;
    user.otpExpireAt = null;
    user.isVerified = true;
    // res.cookie("refreshToken", refreshToken, {
    //   httpOnly: true,
    //   sameSite: "lax", // for localhost
    //   secure: false,
    //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    // });
    await user.save();
    res.status(200).json({
      message: "User verified successfully",
      success: true,
      // accessToken,
    });
  } catch (error) {
    res.status(500).json({
      message: "OTP verification failed server error",
      data: error.message,
      success: false,
    });
  }
};
export const refresh = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const user = await User.findOne({ refreshToken: token });
    if (!user) return res.status(403).json({ message: "User not found" });
const safeuser={
  id:user._id,
  firstName:user.firstName,
  lastName:user.lastName,
  email:user.email,
  phone:user.phone,
}
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    if (user._id.toString() !== decoded.userId)
      return res.status(403).json({ message: "Forbidden" });

    const newAccessToken = await generateAccessToken(user);

    res.json({ accessToken: newAccessToken ,safeuser});
  } catch (err) {
    return res.status(403).json({ message: "Forbidden" });
  }
};


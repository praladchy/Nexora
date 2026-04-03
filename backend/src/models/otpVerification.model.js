import mongoose from "mongoose";

const otpVerification = new mongoose.Schema(
  {
    email: String,
    phone: String,
    emailOtp: String,
    phoneOtp: String,
    emailVerified: { type: Boolean, default: false },
    phoneVerified: { type: Boolean, default: false },
  },
  { timeStamps: true },
);
export default mongoose.model("Otp", otpVerification);

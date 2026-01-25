import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      lowercase: true,
    },

    phone: {
      type: String,
    },

    password: {
      type: String,
      required: true,
    },
    refreshToken:{
      type: String,
    },
    otp: {
      type: String,
    },
    otpExpireAt: {
      type: Date,
    },
    
    verificationMethod: {
      type: String,
      enum: ["email", "phone"],
      default: "email",
    },
    role: {
      type: String,
      enum: ["superAdmin", "admin", "user", "deliveryMan"],
      default: "user",
    },

    isActive: {
      type: Boolean,
      default: false,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    shops: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
      },
    ],

    deliveryProfile: {
      vehicleType: {
        type: String,
        enum: ["bike", "scooter", "car", "van"],
      },
      licenseNumber: String,
      assignedShops: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Shop",
        },
      ],
    },

    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      postalCode: String,
    },
  },
  { timestamps: true }
);

export const User= mongoose.model("User", userSchema);

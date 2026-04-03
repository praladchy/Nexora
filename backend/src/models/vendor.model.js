import mongoose from "mongoose";
const vendorSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    vendorName: { type: String, required: true },
    email: String,
    phone: String,

    status: {
      type: String,
      enum: ["PENDING", "ACTIVE", "SUSPENDED"],
      default: "PENDING",
    },
    otp: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Otp",
    },
    isActive: { type: Boolean, default: false },
    commissionRate: { type: Number }, // platform cut %
    createdDate: {
      type: Date,
    },
    updatedDate: {
      type: Date,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Vendor", vendorSchema);

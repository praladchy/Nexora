const vendorSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // role = ADMIN
    },

    vendorName: { type: String, required: true },
    email: String,
    phone: String,

    status: {
      type: String,
      enum: ["PENDING", "ACTIVE", "SUSPENDED"],
      default: "PENDING",
    },

    commissionRate: { type: Number, default: 10 }, // platform cut %
  },
  { timestamps: true }
);

export default mongoose.model("Vendor", vendorSchema);

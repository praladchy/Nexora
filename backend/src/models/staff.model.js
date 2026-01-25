const staffSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // role = USER
    },

    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },

    permissions: [
      {
        type: String,
        enum: ["PRODUCT", "ORDER", "INVENTORY", "SUPPORT"],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Staff", staffSchema);

const paymentSchema = new mongoose.Schema(
  {
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
    client: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    method: { type: String, enum: ["COD", "ESEWA", "KHALTI", "STRIPE"] },
    amount: Number,
    status: { type: String, enum: ["PENDING", "SUCCESS", "FAILED"] },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);

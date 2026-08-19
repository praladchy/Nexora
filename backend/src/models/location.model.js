import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

locationSchema.index({ location: "2dsphere" });

export default mongoose.model("Location", locationSchema);
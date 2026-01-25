import mongoose from "mongoose";

const variantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Size, Color
    value: { type: String, required: true }, // M, L, Red
    price: { type: Number }, // optional override price
    stock: { type: Number, default: 0 },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    /* ---------------- BASIC INFO ---------------- */
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },

    description: {
      type: String,
      required: true,
    },

    /* ---------------- PRICING ---------------- */
    price: {
      type: Number,
      required: true,
    },

    discount: {
      type: Number, // percentage
      default: 0,
    },

    finalPrice: {
      type: Number,
    },

    /* ---------------- PRODUCT MEDIA ---------------- */
    images: [
      {
        url: String,
        public_id: String,
      },
    ],

    thumbnail: {
      url: String,
      public_id: String,
    },

    /* ---------------- INVENTORY ---------------- */
    stock: {
      type: Number,
      required: true,
    },

    stockLimit: {
      type: Number,
      default: 5, // low stock warning
    },

    sku: {
      type: String,
      unique: true,
    },

    variants: [variantSchema],

    /* ---------------- CATEGORY ---------------- */
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },

    brand: {
      type: String,
    },

    /* ---------------- MULTI VENDOR ---------------- */
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },

    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    /* ---------------- RATING & REVIEWS ---------------- */
    rating: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    /* ---------------- STATUS & CONTROL ---------------- */
    status: {
      type: String,
      enum: ["draft", "active", "inactive", "blocked"],
      default: "draft",
    },

    isApproved: {
      type: Boolean,
      default: false, // approved by super admin
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

/* ---------------- PRICE CALCULATION ---------------- */
productSchema.pre("save", function (next) {
  this.finalPrice = this.price - (this.price * this.discount) / 100;
  next();
});

export default mongoose.model("Product", productSchema);

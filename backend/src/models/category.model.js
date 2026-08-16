import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },

    description: {
      type: String,
    },

    image: [
      {
        url: String,
        public_id: String,
      },
    ],

    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },

    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      default: null,
      /*
        null  => Global category (created by super admin)
        value => Shop specific category
      */
    },
    isParent: {
      type: Boolean,
      default: false,
    },
    isGlobal: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updatedAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Category", categorySchema);

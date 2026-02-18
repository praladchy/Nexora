import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: {
    type: String,
  },
  status: {
    type: Boolean,
    default: false,
  },
});
export default mongoose.model("Permission", permissionSchema);

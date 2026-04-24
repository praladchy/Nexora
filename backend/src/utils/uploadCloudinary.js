// utils/uploadToCloudinary.js
import fs from "fs";
import cloudinary from "../config/cloudinary.js";

export const uploadToCloudinary = async (localFilePath) => {
  try {
    const result = await cloudinary.uploader.upload(localFilePath, {
      folder: "products", // optional
    });
    // delete local file after upload
    fs.unlinkSync(localFilePath);

    return result;
  } catch (error) {
    fs.unlinkSync(localFilePath); // delete even if failed
    throw error;
  }
};

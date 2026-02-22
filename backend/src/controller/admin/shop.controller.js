import shopModel from "../../models/shop.model.js";

export const createShop = async (req, res) => {
  const {
    name,
    email,
    phone,
    owner,
    admins,
    description,
    logo,
    address,
    isActive,
  } = req.body;
  try {
    let query = {};
    if (email) query.email = email;
    if (phone) query.phone = phone;
    if (name) query.name = name;
    if (!email && !phone)
      return res.status().json({ message: "Email or phone is required" });
    if (!name) return res.status().json({ message: "Shop name is required" });
   
    const shop = await shopModel
      .findOne(query)
      .populate("owner")
      .populate("admins");
    if (shop) return res.status(400).json({ message: "Shop already exists" });
    const newShop = new shopModel({
      name,
      owner,
      admins,
      description,
      logo,
      address,
      isActive,
    });
    res.status(201).json({
      message: "Shop created successfully",
      success: true,
      shop: newShop,
    });
    await newShop.save();
  } catch (error) {
    res.status(500).json({
      message: "Internal server error,shop is not created",
      success: false,
      error: error.message,
    });
  }
};
export const getShops = async (req, res) => {
  try {
    const shops = await shopModel.find().populate("owner").populate("admins");
    res.status(200).json({
      message: "Shops retrieved successfully",
      success: true,
      shops,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error,shops are not retrieved",
      success: false,
      error: error.message,
    });
  }
};
export const getShopById = async (req, res) => {
  try {
    const { shopId } = req.params;
    const shop = await shopModel
      .findById(shopId)
      .populate("owner")
      .populate("admins");
    if (!shop) return res.status(404).json({ message: "Shop not found" });
    res.status(200).json({
      message: "Shop retrieved successfully",
      success: true,
      shop,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error,shop is not retrieved",
      success: false,
      error: error.message,
    });
  }
};
export const updateShop = async (req, res) => {
  const { shopId } = req.params;
  try {
    const shop = await shopModel.findByIdAndUpdate(shopId, req.body, {
      new: true,
    });
    if (!shop) return res.status(404).json({ message: "Shop not found" });
    res.status(200).json({
      message: "Shop updated successfully",
      success: true,
      shop,
    });
  } catch (e) {
    res.status(500).json({
      message: "Internal server error,shop is not updated",
      success: false,
      error: e.message,
    });
  }
};
export const deleteShop = async (req, res) => {
  const { isActive } = req.body;
  try {
    const { shopId } = req.params;
    const shop = await shopModel.findById(shopId);
    if (!shop) return res.status(404).json({ message: "Shop not found" });
    if (shop.isActive === false)
      return res.status(400).json({ message: "Shop is not active" });
    shop.isActive = isActive;
    await shop.save();
    res.status(200).json({
      message: "Shop deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error,shop is not deleted",
      success: false,
      error: error.message,
    });
  }
};

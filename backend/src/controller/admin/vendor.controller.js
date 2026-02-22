import Vendor from "../../models/vendor.model.js";

export const vendorRegistration = async (req, res) => {
  const owner = req.user;
  console.log("vendor data", owner);
  const { vendorName, email, phone, commisssionRate } = req.body;
  try {
    if (!vendorName || !email || !phone)
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    const vendor = await Vendor.findOne({ email }).populate("owner");
    if (vendor)
      return res.status(400).json({
        message: "Vendor already exists,please enter Bussiness email",
        success: false,
      });
    const newVendor = new Vendor({
      owner,
      vendorName,
      email,
      phone,
      commisssionRate,
      createdDate: new Date(),
    });
    await newVendor.save();
    await owner.save();
    res.status(200).json({
      message: "Vendor registered successfully,please wait for approval",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error,vendor is not registered",
      success: false,
      error: error.message,
    });
  }
};

export const getVendors = async (req, res) => {
  try {
    const vendor = await Vendor.find();
    if (!vendor && vendor.length === 0)
      return res
        .status(404)
        .json({ message: "No vendors found", success: false });
    res.status(200).json({
      message: "Vendors retrieved successfully",
      success: true,
      vendor,
    });
  } catch (error) {}
};
export const getVendorById = async (req, res) => {
  const { id } = req.params;
  try {
    const vendor = await Vendor.findById(id);
    if (!vendor)
      return res
        .status(404)
        .json({ message: "Vendor not found", success: false });
    res.status(200).json({
      message: "Vendor retrieved successfully",
      success: true,
      vendor,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error,vendor is not retrieved",
      success: false,
      error: error.message,
    });
  }
};

export const updateVendor = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedVendor = await Vendor.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedVendor)
      return res.status(404).json({
        message: "Vendor not found",
        success: false,
      });
    updatedVendor.updatedDate = new Date();
    await updatedVendor.save();
    res.status(200).json({
      message: "Vendor updated successfully",
      success: true,
      updatedVendor,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error,vendor is not updated",
      success: false,
      error: error.message,
    });
  }
};
export const deleteVendor = async (req, res) => {
  const { id } = req.params;
  try {
    const vendor = await Vendor.findById(id);
    if (!vendor)
      return res
        .status(404)
        .json({ message: "Vendor not found", success: false });
    vendor.isActive = false;
    await vendor.save();
    res
      .status(200)
      .json({ message: "Vendor deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error,vendor is not deleted",
      success: false,
      error: error.message,
    });
  }
};
export const approveVendor = async (req, res) => {
  const { id } = req.params;
  const { status, isActive } = req.body;
  try {
    const vendor = await Vendor.findById(id).populate("owner");
    if (!vendor)
      return res
        .status(404)
        .json({ message: "Vendor not found", success: false });
    vendor.status = status;
    vendor.isActive = isActive;
    vendor.updatedDate = new Date();
    if (vendor.status === "ACTIVE") {
      await User.findByIdAndUpdate(
        vendor.owner,
        { role: "VENDOR" },
        { new: true },
      );
    }
    await vendor.save();

    res
      .status(200)
      .json({ message: "Vendor approved successfully", success: true });
  } catch (error) {
    res.status().json({
      message: "server error ,not approved vendor",
      success: false,
    });
  }
};

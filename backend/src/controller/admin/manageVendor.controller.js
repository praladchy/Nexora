import { Vendor } from "../../model/vendor.model.js";
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

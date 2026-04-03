import { User } from "../../models/user.model.js";

export const getAppUser = async (req, res) => {
  try {
    const user = await User.findById();
    if (!user || !user.length === 0)
      return res.status(404).json({
        message: "user not found",
        success: false,
      });
    res.status(200).json({
      message: "user fetched successfully",
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      error: error.message,
    });
  }
};
export const getUsers = async (req, res) => {
  try {
    // const users = await User.find(
    //   {$or : [{ role: "vendoradmin" }, { role: "admin" }, { role: "vendor" }],isActive: true}
    // );
    const users = await User.find({
      $or: [
        { role: "vendoradmin" },
        { role: "admin" },
        { role: "vendor" },
        { role: "superAdmin" },
      ],
    }) ;

    if (!users || !users.length === 0)
      return res.status(404).json({
        message: "users not found",
        success: false,
      });
    res.status(200).json({
      message: "users fetched successfully",
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      error: error.message,
    });
  }
};

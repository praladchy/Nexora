import Permission from "../../models/permission.model.js";
import { User } from "../../models/user.model.js";
export const createPermission = async (req, res) => {
  const { name, description, status } = req.body;
  try {
    if (!name)
      return res.status(400).json({
        message: "name is required",
        success: false,
      });
    const permission = await Permission.findOne({ name });
    if (permission)
      return res.status(400).json({
        message: "permission is already created",
        success: false,
      });
    const newPermission = new Permission({ name, description, status });
    await newPermission.save();
    res.status(200).json({
      message: "permission created successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error to create permission",
    });
  }
};
export const getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find();

    if (!permissions.length)
      return res.status(404).json({
        message: "permissions not found",
        success: false,
      });
    res.status(200).json({
      message: "permissions fetched successfully",
      success: true,
      permissions,
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong",
      success: false,
    });
  }
};
export const getActivePermissions = async (req, res) => {
  try {
    const permissions = await Permission.find({status:true});
    if (!permissions.length)
      return res.status(404).json({
        message: "permissions not found",
        success: false,
      });
    res.status(200).json({
      message: "permissions fetched successfully",
      success: true,
      permissions,
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong",
      success: false,
    });
  }
};
export const getPermissionById = async (req, res) => {
  const { id } = req.params;
  try {
    const permission = await Permission.findById(id);
    if (!permission)
      return res.status(404).json({
        message: "permission not found",
        success: false,
      });
    res.status(200).json({
      message: "permission fetched successfully",
      success: true,
      permission,
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong",
      success: false,
    });
  }
};
// export const getPermissionByUser = async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const permissions = await Permission.find({ user: userId });
//     res.status(200).json({
//       message: "permissions fetched successfully",
//       success: true,
//       permissions,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "something went wrong",
//       success: false,
//     });
//   }
// };
export const assignPermissionUserById = async (req, res) => {
  const { id, userId } = req.params;

  try {
    const permission = await Permission.findById(id);
    if (!permission && !permission.status)
      return res.status(404).json({
        message: "permission not found",
        success: false,
      });
    const user = await User.findById(userId).populate("permissions");
    if (!user)
      return res.status(404).json({
        message: "user not found",
        success: false,
      });
     if (user.permissions.some(p => p._id.toString() === permission._id.toString())) {
  return res.status(400).json({
    message: "permission already assigned to user",
    success: false,
  });
}

    user.permissions.push(permission._id);
    await user.save();
    res.status(200).json({
      message: "permission assigned successfully",
      success: true,
      user,
      permission,
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong",
      success: false,
    });
  }
};
// export const assignPermissionUserById = async (req, res) => {
//   const { id, userId } = req.params;

//   try {
//     const permission = await Permission.findById(id);
//     console.log("sdfghjk",permission)
//     if (!permission && !permission.status)
//       return res.status(404).json({
//         message: "permission not found",
//         success: false,
//       });
//     const user = await User.findById(userId).populate("permissions");
//     console.log("zxcvbnn",user)
//     if (!user)
//       return res.status(404).json({
//         message: "user not found",
//         success: false,
//       });
//      if (user.permissions.some(p => p._id.toString() === permission._id.toString())) {
//   return res.status(400).json({
//     message: "permission already assigned to user",
//     success: false,
//   });
// }

//     user.permissions.push(permission._id);
//     await user.save();
//     res.status(200).json({
//       message: "permission assigned successfully",
//       success: true,
//       user,
//       permission,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "something went wrong",
//       success: false,
//     });
//   }
// };


export const removePermissionUserById = async (req, res) => {
  const { id, userId } = req.params;

  try {
    const permission = await Permission.findById(id);

    if (!permission || !permission.status) {
      return res.status(404).json({
        message: "Permission not found",
        success: false,
      });
    }

    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Prevent modifying Super Admin
    if (existingUser.role === "superAdmin") {
      return res.status(403).json({
        message: "Super Admin permissions cannot be modified.",
        success: false,
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          permissions: permission._id,
        },
      },
      { new: true }
    ).populate("permissions");

    return res.status(200).json({
      message: "Permission removed successfully",
      success: true,
      user: updatedUser,
      permission,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while removing permission.",
      success: false,
      error: error.message,
    });
  }
};
// export const removePermissionUserById = async (req, res) => {
//     const { id, userId } = req.params;

//   try {
//     const permission = await Permission.findById(id);
//     if (!permission && !permission.status)
//       return res.status(404).json({
//         message: "permission not found",
//         success: false,
//       });
//    const user = await User.findByIdAndUpdate(
//   userId,
//   { $pull: { permissions: permission._id } },
//   { new: true }
// );
// if (!user)
//       return res.status(404).json({
//         message: "user not found",
//         success: false,
//       });
      
//     res.status(200).json({
//       message: "permission removed successfully",
//       success: true,
//       user,
//       permission,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "server error,to remove permission",
//       success: false,
//     });
//   }
// };
export const updatePermission = async (req, res) => {
    const { id } = req.params;
  try {
    const permission = await Permission.findByIdAndUpdate(id, req.body, { new: true });
    if (!permission)      return res.status(404).json({
        message: "permission not found",
        success: false,
      });
    res.status(200).json({ 
      message: "permission updated successfully",
      success: true,
      permission,
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong",
      success: false,
    });
  }
};
export const deletePermission = async (req, res) => {
    const {id}=req.params

  try {
    const permission = await Permission.findById(id);
    if (!permission)
      return res.status(404).json({
        message: "permission not found",
        success: false,
      });
      permission.status=false;
      await permission.save();
    res.status(200).json({
      message: "permission deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong",
      success: false,
    });
  }
};

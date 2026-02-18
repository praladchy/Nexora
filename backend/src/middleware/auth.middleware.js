export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Auth Header:", authHeader);
  try {
    if (!authHeader && !authHeader.startsWith("Bearer "))
      return res.status(401).json({
        message: "Unauthorized, no token provided",
        success: false,
      });
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Unauthorized, invalid token",
      success: false,
      error: error.message,
    });
  }
};
export const adminMiddleware = async (req, res, next) => {
  const userRole = req.user;
  try {
    if (!userRole || userRole.role !== "admin") {
      return res.status(403).json({
        message: "Forbidden,unauthorized role",
        success: false,
      });
    }
    if (userRole.role === "admin") {
      next();
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server error ,not able to verify role",
      success: false,
      error: error.message,
    });
  }
};
export const checkPermission = (permission) => {
  return (req, res, next) => {
    if (!req.user.permissions.includes(permission)) {
      return res.status(403).json({ message: "Access Denied" });
    }
    next();
  };
};

export const superAdminMiddleware = async (req, res, next) => {
  const userRole = req.user;
  try {
    if (!userRole || userRole.role !== "superAdmin") {
      return res.status(403).json({
        message: "Forbidden,unauthorized role",
        success: false,
      });
    }
    if (userRole.role === "superAdmin") {
      next();
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server error ,not able to verify role",
      success: false,
      error: error.message,
    });
  }
};

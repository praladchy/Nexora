import jwt from "jsonwebtoken";
export const generateAccessToken = async (user) => {
  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
      phone: user.phone,
      role: user.role,
      permissions: user.permissions.map((p) => p.name),
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "15m",
    },
  );
};

export const generaterefreshToken = async (user) => {
  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
      phone: user.phone,
      role: user.role,
      permissions: user.permissions.map((p) => p.name),
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "7d",
    },
  );
};

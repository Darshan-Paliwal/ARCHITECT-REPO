import jwt from "jsonwebtoken";
export const signToken = (user) =>
  jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const verifyToken = (token) => {
  try { return jwt.verify(token, process.env.JWT_SECRET); }
  catch { return null; }
};

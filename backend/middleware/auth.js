const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../model/user");

const adminMiddleware = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ _id: req.userId });
  if (!user) {
    res.statusCode = 401;
    throw new Error("User not found. Login again");
  }
  if (user.role !== "admin") {
    res.statusCode = 401;
    throw new Error("User is not an admin");
  }
  next();
});

const authMiddleware = asyncHandler(async (req, res, next) => {
  const header = req.header("Authorization");
  if (!header) {
    res.statusCode = 400;
    throw new Error("Authentication is required");
  }
  const token = header.split(" ")[1];
  if (!header.startsWith("Bearer") || !token) {
    res.statusCode = 400;
    throw new Error("Authentication is required");
  }
  try {
    const payLoad = await jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payLoad.userId;
    next();
  } catch (error) {
    res.statusCode = 400;
    throw new Error(error);
  }
});

module.exports = { adminMiddleware, authMiddleware };

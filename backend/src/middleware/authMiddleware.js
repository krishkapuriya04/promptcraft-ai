const jwt = require("jsonwebtoken");
const User = require("../models/User");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");

const protect = asyncHandler(async (req, _res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("Unauthorized: token missing.", 401, "TOKEN_MISSING"));
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");
    if (!req.user) {
      return next(new AppError("Unauthorized: user not found.", 401, "USER_NOT_FOUND"));
    }
    next();
  } catch {
    next(new AppError("Unauthorized: invalid or expired token.", 401, "TOKEN_INVALID"));
  }
});

module.exports = { protect };

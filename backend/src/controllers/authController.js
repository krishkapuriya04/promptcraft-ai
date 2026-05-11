const User = require("../models/User");
const validator = require("validator");
const generateToken = require("../utils/generateToken");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const { validateLoginPayload, validateSignupPayload } = require("../utils/authValidation");
const { sendAuthSuccess, sendSuccess } = require("../utils/apiResponse");

const signup = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const validationError = validateSignupPayload({ name, email, password });
  if (validationError) {
    return next(new AppError(validationError, 400, "VALIDATION_ERROR"));
  }

  const normalizedEmail = email.toLowerCase().trim();
  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    return next(new AppError("User with this email already exists.", 409, "ACCOUNT_EXISTS"));
  }

  const user = await User.create({ name: name.trim(), email: normalizedEmail, password });
  const token = generateToken({ userId: user._id });

  return sendAuthSuccess(res, {
    statusCode: 201,
    message: "Signup successful.",
    token,
    user: { _id: user._id, name: user.name, email: user.email },
  });
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const validationError = validateLoginPayload({ email, password });
  if (validationError) {
    return next(new AppError(validationError, 400, "VALIDATION_ERROR"));
  }

  const normalizedEmail = email.toLowerCase().trim();
  const user = await User.findOne({ email: normalizedEmail }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    return next(new AppError("Invalid email or password.", 401, "INVALID_CREDENTIALS"));
  }

  const token = generateToken({ userId: user._id });
  return sendAuthSuccess(res, {
    message: "Login successful.",
    token,
    user: { _id: user._id, name: user.name, email: user.email },
  });
});

const profile = asyncHandler(async (req, res) =>
  sendSuccess(res, {
    message: "User profile fetched.",
    data: { user: req.user },
  })
);

const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  if (!email || !validator.isEmail(email)) {
    return next(new AppError("Please provide a valid email address.", 400, "VALIDATION_ERROR"));
  }

  // In production, generate reset token and send email.
  return sendSuccess(res, {
    message: "If this email exists, password reset instructions have been sent.",
    data: null,
  });
});

module.exports = { signup, login, profile, forgotPassword };

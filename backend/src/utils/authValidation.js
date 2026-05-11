const validator = require("validator");

function validateSignupPayload({ name, email, password }) {
  if (!name || name.trim().length < 2) {
    return "Name must be at least 2 characters long.";
  }
  if (!email || !validator.isEmail(email)) {
    return "Please provide a valid email address.";
  }
  if (!password || password.length < 8) {
    return "Password must be at least 8 characters long.";
  }
  if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password)) {
    return "Password must include uppercase, lowercase, and a number.";
  }
  return null;
}

function validateLoginPayload({ email, password }) {
  if (!email || !validator.isEmail(email)) {
    return "Please provide a valid email address.";
  }
  if (!password) {
    return "Password is required.";
  }
  return null;
}

module.exports = { validateSignupPayload, validateLoginPayload };

const AppError = require("./AppError");
const { OPTIMIZATION_CATEGORIES } = require("../constants/optimizationCategories");

function validateOptimizationPayload({ code, categories }) {
  if (!code || code.trim().length < 20) {
    throw new AppError("Code must be at least 20 characters for optimization.", 400, "VALIDATION_ERROR");
  }
  if (!Array.isArray(categories)) {
    throw new AppError("categories must be an array.", 400, "VALIDATION_ERROR");
  }
  const invalid = categories.filter((item) => !OPTIMIZATION_CATEGORIES.includes(item));
  if (invalid.length) {
    throw new AppError("Invalid optimization categories provided.", 400, "VALIDATION_ERROR");
  }
}

module.exports = { validateOptimizationPayload };

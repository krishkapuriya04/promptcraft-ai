const AppError = require("./AppError");
const { THEME_OPTIONS, WEBSITE_CATEGORIES } = require("../constants/aiGeneration");

function validateGenerationPayload({ prompt, category, theme }) {
  if (!prompt || prompt.trim().length < 20) {
    throw new AppError("Prompt must be at least 20 characters for quality generation.", 400, "VALIDATION_ERROR");
  }
  if (prompt.length > 4000) {
    throw new AppError("Prompt exceeds maximum length.", 400, "VALIDATION_ERROR");
  }
  if (!WEBSITE_CATEGORIES.includes(category)) {
    throw new AppError("Invalid website category.", 400, "VALIDATION_ERROR");
  }
  if (!THEME_OPTIONS.includes(theme)) {
    throw new AppError("Invalid theme option.", 400, "VALIDATION_ERROR");
  }
}

module.exports = { validateGenerationPayload };

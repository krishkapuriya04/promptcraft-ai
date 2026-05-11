const AppError = require("./AppError");
const { EXPORT_FORMATS } = require("../constants/exportFormats");

function validateExportPayload({ format, selectedFiles }) {
  const validFormats = Object.values(EXPORT_FORMATS);
  if (!validFormats.includes(format)) {
    throw new AppError("Invalid export format.", 400, "VALIDATION_ERROR");
  }
  if (selectedFiles && !Array.isArray(selectedFiles)) {
    throw new AppError("selectedFiles must be an array.", 400, "VALIDATION_ERROR");
  }
}

module.exports = { validateExportPayload };

const multer = require("multer");
const path = require("path");
const AppError = require("../utils/AppError");

const allowedMimeTypes = new Set(["image/png", "image/jpeg", "image/jpg", "image/webp"]);

function sanitizeFilename(name) {
  const base = path.basename(String(name || "upload")).replace(/[^\w.\-]+/g, "_");
  return base.slice(0, 180) || "upload";
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 8 * 1024 * 1024,
    files: 5,
  },
  fileFilter: (_req, file, cb) => {
    // eslint-disable-next-line no-param-reassign
    file.originalname = sanitizeFilename(file.originalname);
    if (!allowedMimeTypes.has(file.mimetype)) {
      return cb(new AppError("Only PNG, JPG, and WebP files are supported.", 400, "INVALID_UPLOAD_TYPE"));
    }
    cb(null, true);
  },
});

module.exports = { upload };

const express = require("express");
const rateLimit = require("express-rate-limit");
const {
  generateWebsite,
  getGenerationHistory,
  getGenerationOptions,
} = require("../controllers/aiController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

const generationLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 20,
  message: {
    success: false,
    code: "RATE_LIMITED",
    message: "Too many generation attempts. Please try again shortly.",
  },
});

router.use(protect);
router.get("/options", getGenerationOptions);
router.get("/history", getGenerationHistory);
router.post("/generate", generationLimiter, generateWebsite);

module.exports = router;

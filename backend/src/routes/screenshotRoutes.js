const express = require("express");
const { generateFromScreenshotController, getScreenshotHistory } = require("../controllers/screenshotController");
const { protect } = require("../middleware/authMiddleware");
const { upload } = require("../middleware/uploadMiddleware");

const router = express.Router();

router.use(protect);
router.get("/history", getScreenshotHistory);
router.post("/generate", upload.single("screenshot"), generateFromScreenshotController);

module.exports = router;

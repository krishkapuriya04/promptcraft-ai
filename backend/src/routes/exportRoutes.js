const express = require("express");
const { exportProjectArchive, getExportOptions } = require("../controllers/exportController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);
router.get("/:projectId/options", getExportOptions);
router.post("/:projectId/archive", exportProjectArchive);

module.exports = router;

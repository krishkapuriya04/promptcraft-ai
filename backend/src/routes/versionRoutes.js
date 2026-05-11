const express = require("express");
const {
  compareVersions,
  deleteVersion,
  listVersions,
  restoreVersion,
  saveCheckpoint,
  toggleFavoriteVersion,
} = require("../controllers/versionController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);
router.get("/:projectId", listVersions);
router.post("/:projectId/checkpoints", saveCheckpoint);
router.get("/:projectId/compare", compareVersions);
router.post("/:projectId/:versionId/restore", restoreVersion);
router.delete("/:projectId/:versionId", deleteVersion);
router.patch("/:projectId/:versionId/favorite", toggleFavoriteVersion);

module.exports = router;

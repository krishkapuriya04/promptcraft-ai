const express = require("express");
const { getOptimizationOptions, optimizeProjectUi, revertOptimization } = require("../controllers/optimizationController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);
router.get("/options", getOptimizationOptions);
router.post("/:projectId/improve", optimizeProjectUi);
router.post("/:projectId/revert", revertOptimization);

module.exports = router;

const express = require("express");
const {
  createDeployment,
  getDeploymentProviders,
  getDeploymentStatus,
  listDeployments,
  redeploy,
} = require("../controllers/deploymentController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);
router.get("/providers", getDeploymentProviders);
router.get("/:projectId", listDeployments);
router.post("/:projectId", createDeployment);
router.get("/:projectId/:deploymentId", getDeploymentStatus);
router.post("/:projectId/:deploymentId/redeploy", redeploy);

module.exports = router;

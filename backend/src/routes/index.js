const express = require("express");
const aiRoutes = require("./aiRoutes");
const analyticsRoutes = require("./analyticsRoutes");
const authRoutes = require("./authRoutes");
const deploymentRoutes = require("./deploymentRoutes");
const exportRoutes = require("./exportRoutes");
const optimizationRoutes = require("./optimizationRoutes");
const projectRoutes = require("./projectRoutes");
const screenshotRoutes = require("./screenshotRoutes");
const versionRoutes = require("./versionRoutes");

const router = express.Router();

router.get("/health", (_req, res) => {
  res.status(200).json({ success: true });
});

router.use("/auth", authRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/projects", projectRoutes);
router.use("/ai", aiRoutes);
router.use("/deployments", deploymentRoutes);
router.use("/exports", exportRoutes);
router.use("/optimizations", optimizationRoutes);
router.use("/versions", versionRoutes);
router.use("/screenshots", screenshotRoutes);

module.exports = router;

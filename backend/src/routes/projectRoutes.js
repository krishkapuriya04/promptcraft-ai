const express = require("express");
const {
  createProject,
  deleteProject,
  duplicateProject,
  getProjectById,
  getProjects,
  toggleFavoriteProject,
  updateProject,
} = require("../controllers/projectController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);
router.post("/", createProject);
router.get("/", getProjects);
router.patch("/:id", updateProject);
router.patch("/:id/favorite", toggleFavoriteProject);
router.post("/:id/duplicate", duplicateProject);
router.delete("/:id", deleteProject);
router.get("/:id", getProjectById);

module.exports = router;

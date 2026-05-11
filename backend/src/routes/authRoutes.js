const express = require("express");
const { forgotPassword, login, profile, signup } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/register", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.get("/profile", protect, profile);
router.get("/me", protect, profile);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  signupUser,
  loginUser,
  getProfile,
  updateProfile
} = require("../controllers/userController");

const verifyToken = require("../middleware/authMiddleware");

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/profile/:email", verifyToken, getProfile);
router.put("/update-profile", verifyToken, updateProfile);

module.exports = router;
const express = require("express");
const router = express.Router();


const {
  signupUser,
  loginUser,
  getProfile
} = require("../controllers/userController");
const verifyToken = require("../middleware/authMiddleware");

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/profile/:email", verifyToken, getProfile);

module.exports = router;
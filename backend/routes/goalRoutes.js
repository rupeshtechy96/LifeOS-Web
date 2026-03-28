const express = require("express");
const router = express.Router();

const {
  addGoal,
  getGoals,
  updateGoal,
  clearAllGoals,
  deleteGoal
} = require("../controllers/goalController");

const verifyToken = require("../middleware/authMiddleware");
router.post("/", verifyToken, addGoal);
router.get("/:email", verifyToken, getGoals);
router.put("/:id", verifyToken, updateGoal);
router.delete("/user/:email", verifyToken, clearAllGoals);
router.delete("/:id", verifyToken, deleteGoal);

module.exports = router;
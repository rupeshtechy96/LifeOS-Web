const express = require("express");
const router = express.Router();

const {
  submitFeedback,
  getAllFeedbacks
} = require("../controllers/feedbackController");

// Submit feedback
router.post("/submit", submitFeedback);

// Get all feedbacks
router.get("/all", getAllFeedbacks);

module.exports = router;
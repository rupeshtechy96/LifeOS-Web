const Feedback = require("../models/Feedback");

const submitFeedback = async (req, res) => {
  try {
    const { name, rating, message } = req.body;

    if (!name || !rating || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, rating and message are required"
      });
    }

    const numericRating = Number(rating);

    if (numericRating < 1 || numericRating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5"
      });
    }

    const feedback = new Feedback({
      name: name.trim(),
      rating: numericRating,
      message: message.trim()
    });

    const savedFeedback = await feedback.save();

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      feedback: savedFeedback
    });
  } catch (error) {
    console.error("Submit Feedback Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while submitting feedback"
    });
  }
};

const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });

    const totalReviews = feedbacks.length;

    let averageRating = 0;
    if (totalReviews > 0) {
      const totalRating = feedbacks.reduce((sum, item) => sum + item.rating, 0);
      averageRating = (totalRating / totalReviews).toFixed(1);
    } else {
      averageRating = "0.0";
    }

    res.status(200).json({
      success: true,
      totalReviews,
      averageRating,
      feedbacks
    });
  } catch (error) {
    console.error("Fetch Feedback Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching feedbacks"
    });
  }
};

module.exports = {
  submitFeedback,
  getAllFeedbacks
};
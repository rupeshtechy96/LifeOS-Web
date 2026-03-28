const Goal = require("../models/Goal");

const addGoal = async (req, res) => {
  try {
    const { userEmail, text } = req.body;

    if (!userEmail || !text) {
      return res.status(400).json({
        message: "User email and goal text are required"
      });
      }
      
      if (req.user.email !== userEmail) {
  return res.status(403).json({
    message: "Access denied. You can only add your own goals."
  });
}

    const newGoal = new Goal({
      userEmail,
      text
    });

    await newGoal.save();

    res.status(201).json({
      message: "Goal added successfully",
      goal: newGoal
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error while adding goal"
    });
  }
};

const getGoals = async (req, res) => {
  try {
      const userEmail = req.params.email;
      
      if (req.user.email !== userEmail) {
  return res.status(403).json({
    message: "Access denied. You can only view your own goals."
  });
      }
      
    const goals = await Goal.find({ userEmail });
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({
      message: "Server error while fetching goals"
    });
  }
};

const updateGoal = async (req, res) => {
  try {
    const goalId = req.params.id;
    const { completed } = req.body;

    const existingGoal = await Goal.findById(goalId);

    if (!existingGoal) {
      return res.status(404).json({
        message: "Goal not found"
      });
    }

    if (req.user.email !== existingGoal.userEmail) {
      return res.status(403).json({
        message: "Access denied. You can only update your own goals."
      });
    }

    existingGoal.completed = completed;
    await existingGoal.save();

    res.status(200).json({
      message: "Goal updated successfully",
      goal: existingGoal
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error while updating goal"
    });
  }
};

const clearAllGoals = async (req, res) => {
  try {
      const userEmail = req.params.email;
      
      if (req.user.email !== userEmail) {
  return res.status(403).json({
    message: "Access denied. You can only delete your own goals."
  });
}

    await Goal.deleteMany({ userEmail });

    res.status(200).json({
      message: "All goals deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error while deleting all goals"
    });
  }
};

const deleteGoal = async (req, res) => {
  try {
    const goalId = req.params.id;

    const existingGoal = await Goal.findById(goalId);

    if (!existingGoal) {
      return res.status(404).json({
        message: "Goal not found"
      });
    }

    if (req.user.email !== existingGoal.userEmail) {
      return res.status(403).json({
        message: "Access denied. You can only delete your own goals."
      });
    }

    await Goal.findByIdAndDelete(goalId);

    res.status(200).json({
      message: "Goal deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error while deleting goal"
    });
  }
};

module.exports = {
  addGoal,
  getGoals,
  updateGoal,
  clearAllGoals,
  deleteGoal
};
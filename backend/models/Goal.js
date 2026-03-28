const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Goal = mongoose.model("Goal", goalSchema);

module.exports = Goal;
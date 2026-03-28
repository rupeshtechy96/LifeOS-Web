const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
    unique: true
  },
  content: {
    type: String,
    default: ""
  }
}, {
  timestamps: true
});

const Journal = mongoose.model("Journal", journalSchema);

module.exports = Journal;
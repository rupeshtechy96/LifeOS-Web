const Journal = require("../models/Journal");

const saveJournal = async (req, res) => {
  try {
    const { userEmail, content } = req.body;

    if (!userEmail) {
      return res.status(400).json({
        message: "User email is required"
      });
      }
      
      if (req.user.email !== userEmail) {
  return res.status(403).json({
    message: "Access denied. You can only save your own journal."
  });
}

    const updatedJournal = await Journal.findOneAndUpdate(
      { userEmail },
      { content: content || "" },
      { new: true, upsert: true }
    );

    res.status(200).json({
      message: "Journal saved successfully",
      journal: updatedJournal
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error while saving journal"
    });
  }
};

const getJournal = async (req, res) => {
  try {
      const userEmail = req.params.email;
      
      if (req.user.email !== userEmail) {
  return res.status(403).json({
    message: "Access denied. You can only view your own journal."
  });
}

    const journal = await Journal.findOne({ userEmail });

    if (!journal) {
      return res.status(200).json({
        content: ""
      });
    }

    res.status(200).json({
      content: journal.content
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error while fetching journal"
    });
  }
};

module.exports = {
  saveJournal,
  getJournal
};
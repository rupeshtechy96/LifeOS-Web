const express = require("express");
const router = express.Router();

const {
  saveJournal,
  getJournal
} = require("../controllers/journalController");

const verifyToken = require("../middleware/authMiddleware");

router.post("/", verifyToken, saveJournal);
router.get("/:email", verifyToken, getJournal);

module.exports = router;
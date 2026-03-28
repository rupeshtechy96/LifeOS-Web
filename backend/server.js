const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const goalRoutes = require("./routes/goalRoutes");
const journalRoutes = require("./routes/journalRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("LifeOS backend is running");
});

app.get("/api/test", (req, res) => {
  res.json({
    message: "Test API is working"
  });
});

app.use("/api", userRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/journal", journalRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
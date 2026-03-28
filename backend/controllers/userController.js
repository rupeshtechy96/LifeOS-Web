const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({
      message: "Signup successful",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error during signup"
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const matchedUser = await User.findOne({ email });

    if (!matchedUser) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, matchedUser.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      {
        userId: matchedUser._id,
        email: matchedUser.email
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token: token,
      user: {
        id: matchedUser._id,
        name: matchedUser.name,
        email: matchedUser.email
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error during login"
    });
  }
};

const getProfile = async (req, res) => {
  try {
      const userEmail = req.params.email;
      
      if (req.user.email !== userEmail) {
  return res.status(403).json({
    message: "Access denied. You can only view your own profile."
  });
}

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const Goal = require("../models/Goal");
    const Journal = require("../models/Journal");

    const totalGoals = await Goal.countDocuments({ userEmail });
    const completedGoals = await Goal.countDocuments({
      userEmail,
      completed: true
    });

    const journal = await Journal.findOne({ userEmail });

    res.status(200).json({
      name: user.name,
      email: user.email,
      totalGoals,
      completedGoals,
      journalStatus: journal && journal.content.trim() !== "" ? "Saved" : "No Entry"
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error while fetching profile"
    });
  }
};



module.exports = {
  signupUser,
  loginUser,
  getProfile
};
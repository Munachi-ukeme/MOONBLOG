const express = require("express"); 
const router = express.Router(); 
const User = require("../models/User"); 
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Login Route (Exclusive Admin Entry Point)
router.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;

    // Locate the administrator account matching the username parameters
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(404).json({ message: "Administrator account not found." });
    }

    // Compare entered password string with securely hashed database string
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid administrative password credentials." });
    }

    // Generate Admin JWT token scoped with 7-day session validity bounds
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      role: user.role
    });
  } catch (err) {
    res.status(400).json({ message: "Error logging in", error: err.message });
  }
});

module.exports = router;

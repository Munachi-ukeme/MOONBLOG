//auth.js → generates JWT when user logs in.
//status codes:
// 401 is correct for invalid password.
// 404 is correct for user not found.
// 400 is fine for general errors.

const express = require("express"); //Loads Express so you can create routes.
const router = express.Router(); //Creates a mini router object to hold your signup/login routes.
const User = require("../models/User"); //Loads your User model (auth schema).
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Signup route
router.post("/signup", async (req, res) => {
  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role // comes from hidden input in your form
    });

    await newUser.save(); //save the user in mongodb
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: "Error signing up", error: err });
  }
});


// Login route
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Compare entered password with stored hash
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    // Generate JWT
    const token = jwt.sign(
      {id: user._id, role: user.role},
      process.env.JWT_SECRET,
      {expiresIn: "1h"}
    );

    res.json({
      message: "Login successful",
      token,
      role: user.role //send role to frontend
    });
  } catch (err) {
    res.status(400).json({ message: "Error logging in", error: err.message });
  }
});
//Backend sends JWT + role to frontend after login.

module.exports = router;

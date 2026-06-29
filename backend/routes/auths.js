//auth.js → generates JWT when user logs in.
//status codes:
// 401 invalid password.
// 404 not found.
// 400  general errors.

const express = require("express"); //Loads Express so you can create routes.
const router = express.Router(); //Creates a mini router object to hold your signup/login routes.
const User = require("../models/User"); //Loads your User model (auth schema).
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

// Signup route
router.post("/signup", async (req, res) => {
  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const role = req.body.adminCode === process.env.ADMIN_SECRET ? "admin" : "user";

    const newUser = new User({
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      email: req.body.email.trim(),
      password: hashedPassword.trim(),
      
      userName: req.body.userName,

      role: role // comes from hidden input in your form
    });

    await newUser.save(); //save the user in mongodb

    const token = jwt.sign(
      {id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      {expiresIn: "1h"}
    );

    res.status(201).json({ message: "Signup successful", token, role:newUser.role });
  } catch (err) {
   console.error("Signup error:", err); res.status(400).json({ message: "Error signing up", error: err.message });
  }
  // console.log("Signup request body:", req.body);

});


// Login route
router.post("/login", async (req, res) => {
  try { //This code check if user already existed
    const user = await User.findOne({
      $or: [
        {email: req.body.email },
        {userName: req.body.userName },
        
      ] 
    });
    if (!user) return res.status(404).json({ message: "User not found. Please sign up" });

    // ✅ add these two lines here
console.log("Entered password:", req.body.password);
console.log("Stored hash:", user.password);
    // Compare entered password with stored hash
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    // Generate JWT and user login will expire in 1 hr
    const token = jwt.sign(
      {id: user._id, role: user.role},
      process.env.JWT_SECRET,
      {expiresIn: "7d"}
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

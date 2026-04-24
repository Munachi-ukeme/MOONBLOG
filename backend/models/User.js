// User.js define the structure of the signup and signin form in the database

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  lastName:  { type: String, sparse: true},
  firstName: { type: String, sparse: true},
  userName: { type: String, sparse: true, unique: true},
  email:     { 
    type: String,   
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"] 
  },
  password:  { type: String, required: true, minLength: 12 },
  role:      { type: String, required: true, enum: ["user", "admin"]},
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
// User.js define the structure of the signup and signin form in the database

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname:  { type: String, required: true },
  username:  { type: String, required: true, unique: true },
  email:     { 
    type: String, 
    required: true, 
    unique: true, 
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"] 
  },
  password:  { type: String, required: true },
  role:      { type: String, enum: ["user", "admin"], default: "user" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
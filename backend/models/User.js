const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  userName: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true // Automatically cleans accidental trailing blank spaces from input strings
  },

  password: { 
    type: String, 
    required: true, 
    minlength: 12 
  },
  role: { 
    type: String, 
    required: true, 
    default: "admin", 
    enum: ["admin"] // Locks document parameters exclusively to administrative authorization access tokens
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model("User", adminSchema);

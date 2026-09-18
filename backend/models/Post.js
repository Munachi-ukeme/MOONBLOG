const mongoose = require("mongoose");

// Define the mongoose schema blueprint for a blog post
const postSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true // Cleans accidental trailing whitespaces from titles
  },
  category: { 
    type: String, 
    enum: ["Tech", "Business", "Education"], 
    required: true 
  },
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Ukeme Munachi", // Correctly points to your User collection (which holds your Admin details)
    required: true 
  },
  body: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now // Automatically saves timestamp parameter on document launch
  }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;

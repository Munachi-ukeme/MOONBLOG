const express = require("express");
const router = express.Router();
const Post = require("../models/Post"); 
const authMiddleware = require("../middleware/authMiddleware");

// Create post (Protected Admin Route)
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      category: req.body.category,
      body: req.body.body,
      author: req.user.id // Binds your admin database ID parameter automatically
    });
    
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.error("Full error:", err); 
    res.status(500).json({ message: "Error creating post", error: err.message });
  }
});

// Get all posts (Public Viewport Endpoint)
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "userName email").sort({ createdAt: -1 }); // Added sorting to naturally return newest posts first
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching posts", error: err.message });
  }
});

// Get posts by category (Public Viewport Endpoint)
router.get("/category/:category", async (req, res) => {
  try {
    const posts = await Post.find({ category: req.params.category }).populate("author", "userName email");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching posts by category", error: err.message });
  }
});

// Get single post by ID (Public Viewport Endpoint)
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "userName email");
    if (!post) return res.status(404).json({ message: "Blog post entry not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Error fetching post", error: err.message });
  }
});

// Edit post (Protected Admin Route)
router.put("/:id/edit", authMiddleware, async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id, 
      {
        title: req.body.title,
        category: req.body.category,
        body: req.body.body
      }, 
      { new: true, runValidators: true } // Ensures data updates adhere strictly to schema rules
    ); 
    
    if (!updatedPost) return res.status(404).json({ message: "Blog post entry not found" });
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: "Error editing post", error: err.message });
  }
});

// Delete post (Protected Admin Route)
router.delete("/:id/delete", authMiddleware, async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ message: "Blog post entry not found" });
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Error deleting post", error: err.message });
  }
});

module.exports = router;

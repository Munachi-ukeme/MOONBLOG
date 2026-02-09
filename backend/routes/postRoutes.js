//postRoutes.js → uses both middlewares to secure admin-only routes.

const express = require("express");
const router = express.Router();
const Post = require("../models/Post"); // import Post model
const authMiddleware = require("../middleware/authMiddleware");
const checkAdmin = require("../middleware/checkAdmin"); //import middleware

// Create post (only admin)
router.post("/create", authMiddleware, checkAdmin, async (req, res) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      category: req.body.category,
      body: req.body.body,
      author: req.user.id // admin user ID
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: "Error creating post", error: err });
  }
});

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username email");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching posts", error: err });
  }
});

// Get posts by category
router.get("/category/:category", async (req, res) => {
  try {
    const posts = await Post.find({ category: req.params.category });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching posts by category", error: err });
  }
});

// Get single post by ID
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "username email");
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Error fetching post", error: err });
  }
});

// Edit post (only admin)
router.put("/:id/edit", authMiddleware, checkAdmin, async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true }); //{ new: true } → ensures the updated post is returned, not the old one. 
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: "Error editing post", error: err });
  }
});

// Delete post (only admin)
router.delete("/:id/delete", authMiddleware, checkAdmin, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Error deleting post", error: err });
  }
});

module.exports = router;

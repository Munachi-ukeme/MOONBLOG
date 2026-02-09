// Post.JS Model defines the structure of the blog post in the database (title, content, category, author, etc.).

const mongoose = require("mongoose");

//Define mongoose the schema (blueprint) for a blog post
const postSchema =new mongoose.Schema({
    title: {type: String, required: true},
    category: {type: String, enum: ["Tech", "Business", "Education"], required: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    body: {type:String, required: true},

    createdAt: {type: Date, default: Date.now} // Automatically saves the date/time when the post was created.
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;


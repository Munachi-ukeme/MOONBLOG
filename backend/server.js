require("dotenv").config(); //dotenv is a Node.js package. It helps keep sensitive information (like database URLs, API keys, JWT secrets) outside your code.

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());



// Example route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

//import route files
const authRoutes = require("./routes/auth"); 
const postRoutes = require("./routes/postRoutes");


//Mount routes
app.use("/api/auth", authRoutes); // all auth endpoints start with /api/auth
app.use("/api/posts", postRoutes); // all post endpoints start with /api/posts

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
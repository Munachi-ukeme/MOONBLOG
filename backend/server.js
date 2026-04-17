require("dotenv").config(); //dotenv is a Node.js package. It helps keep sensitive information (like database URLs, API keys, JWT secrets) outside your code.

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
connectDB();

const app = express();

// Middleware
app.use(cors({
origin: "https://moonblogs.netlify.app" || "http://localhost:5173", // allow any route in frontend
credentials: true}));
app.use(express.json());



// Example route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

//import route files
const postRoutes = require("./routes/postRoutes");
const authsRoutes = require("./routes/auths");
console.log("AuthsRoutes:", authsRoutes);



//Mount routes
app.use("/api/auths", authsRoutes); // all auth endpoints  start with /api/auths
app.use("/api/blogs", postRoutes); // all post endpoints start with /api/blogs

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
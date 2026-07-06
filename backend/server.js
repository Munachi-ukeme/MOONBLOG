// 1. Load environment variables FIRST before anything else looks for process.env
require("dotenv").config(); 

// 2. Force Node.js to use Google DNS globally
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']); 

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// 3. Now it is completely safe to run the database connection
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: "https://moonblog-beta.vercel.app", 
  credentials: true
}));
app.use(express.json());

// Example route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Import route files
const postRoutes = require("./routes/postRoutes");
const authsRoutes = require("./routes/auths");
console.log("AuthsRoutes:", authsRoutes);

// Mount routes
app.use("/api/auths", authsRoutes); 
app.use("/api/blogs", postRoutes); 

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
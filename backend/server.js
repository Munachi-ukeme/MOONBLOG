require("dotenv").config(); 

const dns = require('dns');
// Overriding native DNS servers ensures Render instances bypass localized network blocks when connecting to MongoDB Atlas clusters
dns.setServers(['8.8.8.8', '8.8.4.4']); 

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Establish baseline connectivity to your MongoDB Atlas Cluster
connectDB();

const app = express();

// CORS CONFIGURATION
app.use(cors({
  origin: "https://moonblog-beta.vercel.app", 
  credentials: true
}));

app.use(express.json());

// Heartbeat probe route used by Render instance lifecycles to trace health statuses
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ROUTING PIPELINES
const postRoutes = require("./routes/postRoutes");
const authsRoutes = require("./routes/auths");

app.use("/api/auths", authsRoutes); 
app.use("/api/blogs", postRoutes); 

// Fallback runtime handle capture routing blocks (404 Resource Not Found)
app.use((req, res) => {
  res.status(404).json({ message: "API endpoint route path resource not found." });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

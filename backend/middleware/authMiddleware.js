const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  // Extract token from authorization headers safely
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Access denied. No authentication token provided." });
  }

  try {
    // Decode and verify parameters using the server environment variable secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Explicitly verify the payload signature contains an authorized administrative role parameter
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access forbidden. Administrative privileges required." });
    }

    // Attach validated administrator data payload safely to the incoming server request context
    req.user = decoded; 
    
    next(); // Pass control forward securely to the controller routes
  } catch (err) {
    return res.status(401).json({ message: "Session expired or invalid authentication token." }); // Swapped status 400 to standard 401 unauthenticated code
  }
}

module.exports = authMiddleware;

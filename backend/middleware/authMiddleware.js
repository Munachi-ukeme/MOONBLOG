//authMiddleware.js → verifies JWT on protected routes.

const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next){
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ message: "No token provided"});

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // attach user info to request
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid token"});
    }
}

module.exports = authMiddleware;
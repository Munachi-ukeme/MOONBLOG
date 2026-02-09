
// Middleware to check if user is admin
//It checks if the logged-in user has the role "admin".
//If not, it sends back a 403 Forbidden response.
//If yes, it calls next() to continue to the route handler.
function checkAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Only admin can perform this action" });
  }
  next();
}
module.exports = checkAdmin;
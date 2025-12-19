const jwt = require("jsonwebtoken");
const User = require("../models/Users");

const adminMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access Denied: Not Admin" });
    }

    req.user = user;
    next(); // allow to continue
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = adminMiddleware;

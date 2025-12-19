const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const User = require("../models/Users.js");
router.get("/getuser", async (req, res) => {
  try {
    // Get token from Authorization header: "Bearer <token>"
    const token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }

    // Decode the token without verifying
    const decoded = jwt.decode(token);
    const user = await User.findById(decoded.id);

    res.json({
      message: "Token decoded successfully",
      user: user,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error decoding token", error: err.message });
  }
});

module.exports = router;

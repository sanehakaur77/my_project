const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const request = require("../models/Request");
const User = require("../models/Users");

// FRONTEND SE TOKEN LEKE USER KI REQUESTS LAO
router.get("/my-requests", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Bearer token
    if (!token) return res.status(401).json({ message: "No token provided" });

    // TOKEN DECRYPT
    const decoded = jwt.verify(token, "saneha#123"); // same key used while signing
    const userId = decoded.id;
    const user = await User.findById(userId);
    const email = user.email;

    const userRequests = await request.find({ email });
    res.status(200).json({ Request: userRequests });
  } catch (err) {
    res
      .status(401)
      .json({ message: "Invalid or expired token", error: err.message });
  }
});

module.exports = router;

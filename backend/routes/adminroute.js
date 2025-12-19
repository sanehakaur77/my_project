const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/Users");

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found!" });
    }

    // Check role
    if (user.role !== "admin") {
      return res.json({
        success: false,
        message: "Access denied! Not an admin.",
      });
    }

    // Check password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password!" });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      "SECRET123", // change later from env
      { expiresIn: "7d" }
    );

    return res.json({
      success: true,
      message: "Admin login successful!",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: "Something went wrong!" });
  }
};

router.post("/admin/login", adminLogin);
module.exports = router;

const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/Users");
const sendOtptoEmail = require("../utils/sendOtp");
const dotenv = require("dotenv");
dotenv.config();

// Generate 6-digit OTP
const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const signup = async (req, res) => {
  try {
    const { name, email, password, city, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = generateOtp();
    const otpexpires = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      city,
      otp,
      role,
      otpexpires,
    });

    // Send OTP
    await sendOtptoEmail(email, otp);

    res.status(201).json({
      message: "OTP sent to your email",
      userId: newUser._id,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// --- VERIFY OTP ---
const verifyOtp = async (req, res) => {
  try {
    const { userId, otp } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "User not found" });

    // Check OTP validity
    if (user.otp !== otp || user.otpexpires < new Date())
      return res.status(400).json({ message: "Invalid or expired OTP" });

    // Verify user and clear OTP fields
    user.isVerified = true;
    user.otp = null;
    user.otpexpires = null;
    await user.save();

    // Generate JWT token

    res.json({
      message: "Account verified successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
// --- LOGIN (with OTP if unverified) ---
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ message: "User not found! Sign up to continue" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });

    if (user.role === "admin") {
      const token = jwt.sign(
        { id: user._id, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.json({
        success: true,
        message: "Admin Login Successful",
        token,
        role: "admin",
      });
    }

    if (!user.isVerified) {
      const otp = generateOtp();
      user.otp = otp;
      user.otpexpires = new Date(Date.now() + 10 * 60 * 1000); // 10 mins
      await user.save();

      await sendOtptoEmail(user.email, otp);

      return res.status(200).json({
        message: "OTP sent to email",
        userId: user._id,
        success: true,
      });
    }

    const token = jwt.sign(
      { id: user._id, role: "user" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      role: "user",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  signup,
  verifyOtp,
  login,
};

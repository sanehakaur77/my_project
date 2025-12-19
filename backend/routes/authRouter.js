const { signup, verifyOtp, login } = require("../controllers/authController");
const express = require("express");
const verifytoken = require("../middlewares/verifyToken");

const router = express.Router();
router.post("/signup", signup);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);
router.get("/home/data", verifytoken, (req, res) => {
  res.status(200).json({ message: "Verified user", success: true });
});
module.exports = router;

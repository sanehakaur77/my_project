const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const donor = require("../models/Donors");
const streamifier = require("streamifier");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

// Use memory storage for multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const {
      name,
      email,
      city,
      state,
      phone,
      address,
      gender,
      nationality,
      lastDonationDate,
      comments,
      bloodGroup,
    } = req.body;

    const file = req.file;
    if (!file) return res.status(400).json({ message: "File required" });

    // ✅ 1. Check duplicate email BEFORE upload
    const existingUser = await donor.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Email already exists", success: false });
    }

    // ✅ 2. Upload to Cloudinary only if email is unique
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto", folder: "user_photos" },
      async (error, result) => {
        if (error) return res.status(500).json({ message: error.message });

        const user = new donor({
          name,
          email,
          city,
          state,
          nationality,
          gender,
          lastDonationDate,
          address,
          phone,
          comments,
          bloodGroup,
          fileUrl: result.secure_url,
        });

        await user.save();
        res.json({ message: "Upload successful", data: user, success: true });
      }
    );

    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;

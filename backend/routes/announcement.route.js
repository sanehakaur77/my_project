const express = require("express");
const router = express.Router();
const Announcement = require("../models/Announcement");

// CREATE Announcement (ADMIN)
router.post("/create", async (req, res) => {
  try {
    const { title, message, createdBy } = req.body;

    if (!title || !message)
      return res.status(400).json({ message: "All fields are required" });

    const newAnn = await Announcement.create({
      title,
      message,
      createdBy,
    });

    res.status(201).json({ message: "Announcement created!", newAnn });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET All Announcements (USER / PUBLIC)
router.get("/all", async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.status(200).json({ announcements });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

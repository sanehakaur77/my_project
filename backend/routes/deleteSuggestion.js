const express = require("express");
const router = express.Router(); // ✅ add this line
const Suggestion = require("../models/Suggestions");
const mongoose = require("mongoose");
// DELETE suggestion by ID
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deleted = await Suggestion.findByIdAndDelete(id);
    if (!deleted)
      return res.status(404).json({ message: "Suggestion not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to delete" });
  }
});

module.exports = router;

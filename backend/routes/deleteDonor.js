const express = require("express");
const router = express.Router();
const Donor = require("../models/Donors");

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Donor.findByIdAndDelete(id);

    res.json({
      message: "Donor has been deleted successfully!",
      success: true,
    });
  } catch (err) {
    res.json({
      message: "Donor cannot be deleted",
      success: false,
      error: err,
    });
  }
});
module.exports = router;

const express = require("express");
const request = require("../models/Request");
const router = express.Router();

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await request.findByIdAndDelete(id);
    res.json({
      message: "Request has been deleted successfully!",
      success: true,
    });
  } catch (err) {
    res.json({
      message: "cannot delete the request",
      error: err,
      success: false,
    });
  }
});
module.exports = router;

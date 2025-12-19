const request = require("../models/Request");
const router = require("express").Router();
router.put("/update-request/:id", async (req, res) => {
  const { status } = req.body;
  try {
    const updatedRequest = await request.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true } // updated document return kare
    );
    res.json(updatedRequest);
  } catch (err) {
    res.status(500).json({ error: "Error updating request" });
  }
});
module.exports = router;

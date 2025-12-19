const express = require("express");
const router = express.Router();
const request = require("../models/Request");
const getRequest = async (req, res) => {
  try {
    const req = await request.find();
    if (!req) {
      return res.json({ message: "no request yet!", success: true });
    } else {
      res.json({ req: req, success: true });
    }
  } catch (err) {
    res.json({ message: "error", success: false });
  }
};
router.get("/req", getRequest);
module.exports = router;

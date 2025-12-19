const Suggestions = require("../models/Suggestions");
const Donor = require("../models/Donors");
const request = require("../models/Request");
const Users = require("../models/Users");
const express = require("express");
const router = express.Router();
const fetchData = async (req, res) => {
  try {
    const userCount = await Users.countDocuments();
    const suggestionCount = await Suggestions.countDocuments();
    const reqCount = await request.countDocuments();
    const donorCount = await Donor.countDocuments();
    res.json({
      userCount: userCount,
      suggestionCount: suggestionCount,
      reqCount: reqCount,
      donorCount: donorCount,
      success: true,
    });
  } catch (err) {
    res.json({ message: "error", error: err });
  }
};
router.get("/getdata", fetchData);
module.exports = router;

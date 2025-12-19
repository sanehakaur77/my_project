const express = require("express");
const Donor = require("../models/Donors.js");
const searchDonor = async (req, res) => {
  const { state, city, bloodGroup } = req.body;
  try {
    const data = await Donor.find({ state, city, bloodGroup });
    if (!data) {
      return res.json({ message: "data is not found!", sucess: false });
    }
    res.json({ message: "data is found", data: data, success: true });
  } catch (err) {
    res.json({ message: "erorr....", error: err });
  }
};
module.exports = searchDonor;

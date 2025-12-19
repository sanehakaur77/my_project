const Donor = require("../models/Donors");
const getDonors = async (req, res) => {
  try {
    const donors = await Donor.find();
    if (!donors) {
      res.json({ message: "no donor found!", success: false });
    } else {
      res.json({ message: "donor are found!", donors: donors, success: true });
    }
  } catch (err) {
    res.json({ message: "server error", error: err });
  }
};
module.exports = getDonors;

const express = require("express");
const router = express.Router();
const searchDonor = require("../controllers/findController.js");
router.post("/search/donor", searchDonor);
module.exports = router;

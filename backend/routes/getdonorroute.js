const express = require("express");
const router = express.Router();
const getDonors = require("../controllers/getDonorController");
router.get("/donor", getDonors);
module.exports = router;

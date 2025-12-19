const express = require("express");
const router = express.Router();
const { getSuggestions } = require("../controllers/SuggesstionController");
router.get("/req", getSuggestions);

module.exports = router;

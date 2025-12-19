const express = require("express");
const router = express.Router();
const { PostSuggestions } = require("../controllers/SuggesstionController.js");
router.post("/post/suggesstion", PostSuggestions);

module.exports = router;

const express = require("express");
const router = express.Router();
const Request = require("../controllers/requestController");
router.post("/upload", Request);
module.exports = router;

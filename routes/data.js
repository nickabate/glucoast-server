const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

// Get all items
router.route("/").get(controller.index);

module.exports = router;

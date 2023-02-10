const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

// Get all items
router.route("/").get(controller.index);

router
  .route("/:id")
  .get(controller.dateById)
  .put(controller.editById)
  .delete(controller.deleteById);

module.exports = router;

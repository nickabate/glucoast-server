const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

// Routes for calling existing dates and posting a new date
router.route("/").get(controller.index).post(controller.newDate);

// Routes for existing date manipulation
router
  .route("/:id")
  .get(controller.dateById)
  .put(controller.editById)
  .delete(controller.deleteById);

module.exports = router;

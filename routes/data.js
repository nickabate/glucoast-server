const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

router.route("/").get(controller.index).post(controller.newDate);

router
  .route("/:id")
  .get(controller.dateById)
  .put(controller.editById)
  .delete(controller.deleteById);

module.exports = router;

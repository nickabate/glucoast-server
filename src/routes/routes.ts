import express from 'express';
import controller from "../controllers/controller.js";

const router = express.Router();

// Routes for calling existing dates and posting a new date
router.route("/")
  .get(controller.index)
  .post(controller.newDate);

// Routes for existing date manipulation
router
  .route("/:id")
  .get(controller.dateById)
  .put(controller.editById)
  .delete(controller.deleteById);

export default router;

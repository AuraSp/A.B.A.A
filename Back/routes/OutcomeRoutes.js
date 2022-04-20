const express = require("express");

const {
  getAllOutcomes,
  createOutcome,
  getOutcomeById,
  updateOutcome,
  deleteOutcome,
} = require("../controllers/outcomesController");

const router = express.Router();

router.route("/").get(getAllOutcomes).post(createOutcome);

router
  .route("/:id")
  .get(getOutcomeById)
  .put(updateOutcome)
  .delete(deleteOutcome);

module.exports = router;

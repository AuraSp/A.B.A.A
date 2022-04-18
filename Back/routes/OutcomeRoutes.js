const express = require("express");

const {
  getAllOutcomes,
  createOutcome,
  getOutcomeById,
} = require("../controllers/outcomesController");

const router = express.Router();

router.route("/").get(getAllOutcomes).post(createOutcome);

router
  .route("/:id")
  .get(getOutcomeById)

module.exports = router;

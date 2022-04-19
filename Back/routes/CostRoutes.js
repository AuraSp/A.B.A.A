const express = require("express");

const {
  getAllCosts,
  createCost,
  getCostById,
  updateCost,
} = require("../controllers/costsController");

const router = express.Router();

router.route("/").get(getAllCosts).post(createCost);

router
  .route("/:id")
  .get(getCostById)
  .put(updateCost)

module.exports = router;

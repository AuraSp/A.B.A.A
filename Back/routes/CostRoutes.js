const express = require("express");

const {
  getAllCosts,
  createCost,
  getCostById,
} = require("../controllers/costsController");

const router = express.Router();

router.route("/").get(getAllCosts).post(createCost);

router
  .route("/:id")
  .get(getCostById)

module.exports = router;

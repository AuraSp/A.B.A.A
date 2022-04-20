const express = require("express");

const {
  getAllIncomes,
  createIncome,
  getIncomeById,
  updateIncome,
  deleteIncome
} = require("../controllers/incomesController");

const router = express.Router();

router.route("/").get(getAllIncomes).post(createIncome);

router
  .route("/:id")
  .get(getIncomeById)
  .put(updateIncome)
  .delete(deleteIncome);

module.exports = router;

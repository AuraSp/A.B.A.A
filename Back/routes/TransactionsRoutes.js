const express = require("express");

const {
  getAllTransactions,
  createTransactions,
  getTransactionsById,
  updateTransactions,
  deleteTransactions,
} = require("../controllers/TransactionsController");

const router = express.Router();

router.route("/").get(getAllTransactions);
// .post(createTransactions)

router
  .route("/:id")
  .get(getTransactionsById)
  .put(createTransactions)
  .delete(deleteTransactions)
  // .edit(updateTransactions)
module.exports = router;
const express = require("express");
const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

const {
  //User
  getAllUsers,
  createNewUser,
  getUserById,
  updateUser,
  // updateUserId,
  deleteUserById,

  //User's transactions
  deleteIncomeTransactions,
  deleteExpenseTransactions,
  findIncomesAndUpdate,
  findExpensesAndUpdate,
  addNewIncome,
  addNewExpense,
  getUserIncomeByMonth,
  getUserExpenseByMonth,
  getAllUserIncomesOffAllMonth,
  getAllUserExpenseOffAllMonth
} = require("../controllers/TransactionsController");

const { signup } = require("../controllers/auth.controller")

const router = express.Router();

//User
router.route("/").get(getAllUsers);
router.route("/:id").get(getUserById).patch(updateUser);
router.route("/newUsers/create").patch(createNewUser);
router.route("/:id/update").patch(updateUser);
router.route("/deleteUser/:id").patch(deleteUserById);

//User's transactions
router.route("/:id/income/delete/:subId").patch(deleteIncomeTransactions);
router.route("/:id/expense/delete/:subId").patch(deleteExpenseTransactions);

router.route("/:id/income/update/:subId").patch(findIncomesAndUpdate);
router.route("/:id/expense/update/:subId").patch(findExpensesAndUpdate);

router.route("/:id/user/addNewIncome").patch(addNewIncome);
router.route("/:id/user/addNewExpense").patch(addNewExpense);

router.route("/:id/user/addNewIncome").patch(addNewIncome).get(getUserIncomeByMonth);
router.route("/:id/user/addNewExpense").patch(addNewExpense).get(getUserExpenseByMonth);

router.route("/:id/income/getByCurrentMonth").get(getUserIncomeByMonth);
router.route("/:id/expense/getByCurrentMonth").get(getUserExpenseByMonth);

router.route("/:id/income/getOfAllMonths").get(getAllUserIncomesOffAllMonth);
router.route("/:id/expense/getOfAllMonths").get(getAllUserExpenseOffAllMonth);

router.route('/auth/signup').post([
  verifySignUp.checkDuplicateUsernameOrEmail,
  verifySignUp.checkRolesExisted
],
  controller.signup)

router.route("/auth/signin").post(controller.signin);

module.exports = router;

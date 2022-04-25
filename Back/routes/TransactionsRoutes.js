const express = require("express");

const {
  //User
  getAllUsers,
  createNewUser,
  getUserById,
  updateUser,

  //User's transactions
  deleteIncomeTransactions,
  deleteExpenseTransactions,
  findIncomesAndUpdate,
  findExpensesAndUpdate,
  addNewIncome,
  addNewExpense,
} = require("../controllers/TransactionsController");

const router = express.Router();

//User
router.route("/").get(getAllUsers);
router.route("/:id").get(getUserById).patch(updateUser);
router.route("/:id/user/update").patch(updateUser);

//User's transactions
router.route("/:id/income/delete/:subId").patch(deleteIncomeTransactions);
router.route("/:id/expense/delete/:subId").patch(deleteExpenseTransactions);

router.route("/:id/income/update/:subId").patch(findIncomesAndUpdate);
router.route("/:id/expense/update/:subId").patch(findExpensesAndUpdate);

router.route("/:id/user/addNewIncome").patch(addNewIncome);
router.route("/:id/user/addNewExpense").patch(addNewExpense);

//Auth
// app.get("/login", (req, res) => {
//   res.render("login");
// });
// app.post("/login", passport.authenticate("local", {
//   successRedirect: "/userprofile",
//   failureRedirect: "/login"
// }), function (req, res) {

// });

router.route('/register').post(createNewUser)
// app.post("/register", (req, res) => {

//   User.register(new User({ name: req.body.name }), req.body.password, function (err, user) {
//     if (err) {
//       console.log(err);
//       res.render("register");
//     }
//     passport.authenticate("local")(req, res, function () {
//       res.redirect("/login");
//     })
//   })
// })
module.exports = router;


const e = require("express");
const Transactions = require("../models/TransactionsModel");

//======USER======//
exports.getAllUsers = async (req, res) => {
  try {
    const users = await Transactions.find();
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        transactions: users,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// // Atnaujinti esamą kategorija
// exports.updateUserId = async (req, res) => {
//   console.log( req.params.id)
//   console.log( req.params.subId)
//   try {
//     const user = await Transactions.findOneAndUpdate(
//       {'users._id': req.params.subId},
//       {
//         $set: {
//           "user.$.value": req.body.value,
//         },    
//     });

//     res.status(200).json({
//       status: "success",
//       transaction: {
//         users: user,
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: "fail",
//       message: err,
//     });
//   }
// };

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    // .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password!" });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });
      var authorities = [];
      //   for (let i = 0; i < user.roles.length; i++) {
      //     authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      //   }
      req.session.token = token;
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        income: user.income,
        expense: user.expense
        // roles: authorities,
      });
    });
};

// router.route("/").get(getAllTransactions).post(createTransactions)
exports.createNewUser = async (req, res) => {
  console.log(req.body)
  try {
    const newUsers = await Transactions.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        transactions: newUsers,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const users = await Transactions.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        transactions: users,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateUser = async (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  try {
    const user = await Transactions.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: false,
    });

    res.status(200).json({
      status: "success",
      data: {
        transactions: user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteUserById = async (req, res) => {
  console.log(req.params.id)
  try {
    const users = await Transactions.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

//======USER'S TRANSACTIONS======//
exports.addNewIncome = async (req, res) => {
  console.log(req.params.id);
  console.log(req.params.subId);
  try {
    const updated = await Transactions.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { income: req.body } },
      {
        new: true,
      }
    );
    console.log(updated);
    res.status(200).json({
      status: "success",
      data: {
        transactions: updated,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.addNewExpense = async (req, res) => {
  console.log(req.params.id);
  console.log(req.params.subId);
  try {
    const updated = await Transactions.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { expense: req.body } },
      {
        new: true,
      }
    );
    console.log(updated);
    res.status(200).json({
      status: "success",
      data: {
        transactions: updated,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};


exports.deleteIncomeTransactions = async (req, res) => {
  console.log(req.params.id);
  console.log(req.params.subId);

  try {
    await Transactions.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { income: { _id: req.params.subId } } }
    );
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteExpenseTransactions = async (req, res) => {
  console.log(req.params.id);
  console.log(req.params.subId);

  try {
    await Transactions.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { expense: { _id: req.params.subId } } }
    );
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.findIncomesAndUpdate = async (req, res) => {
  console.log(req.params.id);
  console.log(req.params.subId);
  console.log(req.body);
  try {
    const updateIncomes = await Transactions.findOneAndUpdate(
      { _id: req.params.id, "income._id": req.params.subId },
      {
        $set: {
          "income.$.description": req.body.description,
          "income.$.category": req.body.category,
          "income.$.date": req.body.date,
          "income.$.amount": req.body.amount,
        },
      }
    );

    res.status(200).json({
      status: "success",
      data: {
        transactions: updateIncomes,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.findExpensesAndUpdate = async (req, res) => {
  console.log(req.params.id);
  console.log(req.params.subId);
  console.log(req.body);
  try {
    const updateExpenses = await Transactions.findOneAndUpdate(
      { _id: req.params.id, "expense._id": req.params.subId },
      {
        $set: {
          "expense.$.description": req.body.description,
          "expense.$.category": req.body.category,
          "expense.$.date": req.body.date,
          "expense.$.amount": req.body.amount,
        },
      }
    );
    res.status(200).json({
      status: "success",
      data: {
        transactions: updateExpenses,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getUserIncomeByMonth = async (req, res) => {
  try {
    const users = await Transactions.find({ _id: req.params.id });
    const { income } = users[0];

    const currentYear = new Date().getFullYear(); // 2022
    const currentMonth = new Date().getMonth() + 1; // 5

    const filteredYear = income.filter((item) => new Date(item.date).getFullYear() === currentYear);
    const filteredMonth = filteredYear.filter((item) => new Date(item.date).getMonth() + 1 === currentMonth);

    const allIncomeCurrentMonth = filteredMonth.reduce((n, { amount }) => n + amount, 0);

    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        income: allIncomeCurrentMonth,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err,
    });
  }
};

exports.getUserExpenseByMonth = async (req, res) => {
  console.log(req.params.id)
  try {
    const users = await Transactions.find({ _id: req.params.id });
    const { expense } = users[0];

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const filteredYear = expense.filter((item) => new Date(item.date).getFullYear() === currentYear)
    const filteredMonth = filteredYear.filter((item) => new Date(item.date).getMonth() + 1 === currentMonth);
    const allExpenseCurrentMonth = filteredMonth.reduce((n, { amount }) => n + amount, 0);

    res.status(200).json({
      status: "success",
      results: filteredMonth.length,
      data: {
        expense: allExpenseCurrentMonth
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err,
    });
  }
};


exports.getAllUserIncomesOffAllMonth = async (req, res) => {
  try {
    const users = await Transactions.findById(req.params.id);
    if (users.income.length > 0) {
      const { income } = users;

      var sortedExpenseByDate = income.sort(function (a, b) {
        var c = new Date(a.date);
        var d = new Date(b.date);
        return c - d;
      });

      const startYear = new Date(sortedExpenseByDate[0].date).getFullYear();
      console.log(startYear)
      const endYear = new Date(sortedExpenseByDate[sortedExpenseByDate.length - 1].date).getFullYear();
      console.log(endYear)
      const incomeArray = [];

      for (var i = startYear; i <= endYear; i++) {
        var filteredYear = sortedExpenseByDate.filter((item) => new Date(item.date).getFullYear() === i);
        console.log(filteredYear)
        var yearArray = [];
        yearArray.push({ year: i });
        var monthArray = [];

        for (var y = 1; y <= 12; y++) {
          if (filteredYear.filter((item) => new Date(item.date).getMonth() + 1 === y)) {
            var filteredMonth = filteredYear.filter((item) => new Date(item.date).getMonth() + 1 === y);
            var allIncome = filteredMonth.reduce((n, { amount }) => n + amount, 0);
            monthArray.push(allIncome);
          } else {
            monthArray.push(0);
          }
        }

        var merged = [];

        yearArray.map((year) => {
          merged.push({
            yearInc: year.year,
            dataInc: monthArray,
          });
        });
        incomeArray.push(...merged);
      }

      res.status(200).json({
        status: "success",
        results: users.length,
        data: {
          income: incomeArray,
        },
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err,
    });
  }
};

exports.getAllUserExpenseOffAllMonth = async (req, res) => {
  try {
    const users = await Transactions.findById(req.params.id);
    if (users.expense.length > 0) {
      const { expense } = users;

      var sortedExpenseByDate = expense.sort(function (a, b) {
        var c = new Date(a.date);
        var d = new Date(b.date);
        return c - d;
      });

      const startYear = new Date(sortedExpenseByDate[0].date).getFullYear();
      const endYear = new Date(sortedExpenseByDate[sortedExpenseByDate.length - 1].date).getFullYear();
      const expenseArray = [];

      for (var i = startYear; i <= endYear; i++) {
        var filteredYear = sortedExpenseByDate.filter((item) => new Date(item.date).getFullYear() === i);

        var yearArray = [];
        yearArray.push({ year: i });
        var monthArray = [];

        for (var y = 1; y <= 12; y++) {
          if (filteredYear.filter((item) => new Date(item.date).getMonth() + 1 === y)) {
            var filteredMonth = filteredYear.filter((item) => new Date(item.date).getMonth() + 1 === y);
            var allExpense = filteredMonth.reduce((n, { amount }) => n + amount, 0);
            monthArray.push(-allExpense);
          } else {
            monthArray.push(0);
          }
        }

        var merged = [];

        yearArray.map((year) => {
          merged.push({
            yearEx: year.year,
            dataEx: monthArray,
          });
        });
        expenseArray.push(...merged);
      }
      console.log(expenseArray)
      res.status(200).json({
        status: "success",
        results: users.length,
        data: {
          expense: expenseArray,
        },
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err,
    });
  }
};
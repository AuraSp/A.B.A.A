
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



  //   name: name
  //   email: email
  // password: psw

  // limit: kuriant naujus transaction irasus
  // income: createnewIncome
  // expense:createNewExpense
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
  try {
    const user = await Transactions.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
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
          "income.$.income": req.body.income,
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
          "expense.$.expense": req.body.expense,
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
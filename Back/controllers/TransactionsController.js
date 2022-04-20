const Transactions = require("../models/TransactionsModel");

// Gauti visas pajamas
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transactions.find();
    res.status(200).json({
      status: "success",
      results: transactions.length,
      data: {
        transactions: transactions,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// Sukurti pajamų išrašą
exports.createTransactions = async (req, res) => {
  try {
    const newTransactions = await Transactions.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        transactions: newTransactions,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

// Gauti studentą pagal ID
exports.getTransactionsById = async (req, res) => {
  try {
    const transactions = await Transactions.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        transactions: transactions,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// Atnaujinti esamą studentą
exports.updateTransactions = async (req, res) => {
  try {
    const transactions = await Transactions.findByIdAndUpdate(req.params.id, req.body, {
      // atnaujinus duomenis - gauti atnaujintą studento informaciją
      new: true,
      // papildomai patikrintų duomenis pagal DB schemą (studentModel)
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        transactions: transactions,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// Pašalinti studentą pagal ID
exports.deleteTransactions = async (req, res) => {
  try {
    await Transactions.findByIdAndDelete(req.params.id);

    res.status(204).json({
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
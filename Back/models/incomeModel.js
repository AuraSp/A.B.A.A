const mongoose = require("mongoose");

// DB schema
const incomesSchema = new mongoose.Schema({
  amount: {
    type: String,
  },
  date: {
    type: Date,
  },
  name: {
    type: String,
  }
});

// Modelis DB lentelės pavadinimas
const income = new mongoose.model('Users-Incomes-Info', incomesSchema);

module.exports = income;

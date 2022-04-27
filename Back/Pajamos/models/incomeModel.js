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
},

  { collection: 'Users-Incomes-Info' }
);

// Modelis DB lentelės pavadinimas
const income = new mongoose.model(studentsSchema);

module.exports = income;

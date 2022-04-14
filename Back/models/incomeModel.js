const mongoose = require("mongoose");

//Convert Date format to only date without time
const Date = {
  timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
};
// DB schema
const incomesSchema = new mongoose.Schema({
  amount: {
    type: Number,
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

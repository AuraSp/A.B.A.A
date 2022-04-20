const mongoose = require("mongoose");

//Convert Date format to only date without time
const Date = {
  timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
};
// DB schema
const incomesSchema = new mongoose.Schema({
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  date: {
    type: Date,
  },
  inamount: {
    type: String,
  }
});

// Modelis DB lentelės pavadinimas
const income = new mongoose.model('Users-Incomes-Info', incomesSchema);

module.exports = income;

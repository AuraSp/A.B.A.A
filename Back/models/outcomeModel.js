const mongoose = require("mongoose");

//Convert Date format to only date without time
const Date = {
  timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
};
// DB schema
const outcomesSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  category2: {
    type: String,
  },
  date2: {
    type: Date,
  },
  cost: {
    type: String,
  }
});

// Modelis DB lentelės pavadinimas
const outcome = new mongoose.model('costs', outcomesSchema);

module.exports = outcome;

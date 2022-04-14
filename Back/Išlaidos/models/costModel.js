const mongoose = require("mongoose");

// DB schema
const costsSchema = new mongoose.Schema({
  cost: {
    type: String,
  },
  date: {
    type: String,
  },
  name: {
    type: String,
  }
});

// Modelis DB lentelės pavadinimas
const costs = new mongoose.model("cost", costsSchema);

// Duomenų siuntimas į DB
// const testStudents = new vartotojai({
//   name: "awoogaasd",
//   surname: "testaitis",
//   pajamos: "1000",
// });

// testStudents.save();

module.exports = costs;

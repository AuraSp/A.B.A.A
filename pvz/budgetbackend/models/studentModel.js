const mongoose = require("mongoose");

// DB schema
const studentsSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  surname: {
    type: String,
  },
  pajamos: {
    type: String,
  }
});

// Modelis DB lentelės pavadinimas
const vartotojai = new mongoose.model("vartotojai", studentsSchema);

// Duomenų siuntimas į DB
// const testStudents = new vartotojai({
//   name: "awoogaasd",
//   surname: "testaitis",
//   pajamos: "1000",
// });

// testStudents.save();

module.exports = vartotojai;

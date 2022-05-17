const mongoose = require("mongoose");

// DB schema
const categoriesSchema = new mongoose.Schema({
  value: {
    type: String,
  },
  text: {
    type: String,
  },
});

// Modelis DB lentelės pavadinimas
const Categories = new mongoose.model("Categories", categoriesSchema);

// Duomenų siuntimas į DB
// const testCategories = new Categories({
//   value: 'Alga',
//   text: 'Alga'
// });

// testCategories.save();


module.exports = Categories;
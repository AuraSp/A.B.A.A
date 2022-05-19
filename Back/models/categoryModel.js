const mongoose = require("mongoose");

// DB schema

const categorySchema = mongoose.Schema(
  {
    value: { type: String, }
  }
);

const CategoriesSchema = new mongoose.Schema(
{
  category: [categorySchema]
}
);

// Modelis DB lentelės pavadinimas
const CategoryModel = new mongoose.model("Categories", CategoriesSchema);

// // Duomenų siuntimas į DB
// const testCategories = CategoryModel({
//   category: [
//     {
//       value: 'Drabužiai',
//       text: 'Drabužiai',
//     }
//   ]
// });

// testCategories.save();


module.exports = CategoryModel;
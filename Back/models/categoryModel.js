const mongoose = require("mongoose");

// DB schema

const categorySchema = mongoose.Schema(
  {
    value: { type: String, },
    text: { type: String,  },
  },
  { timestamps: true }
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
//       value: 'Išsiėmimas',
//       text: 'Pinigų išsiėmimas',
//     }
//   ]
// });

// testCategories.save();


module.exports = CategoryModel;
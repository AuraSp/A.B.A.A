const mongoose = require("mongoose");

// DB schema
const Date = {
  timestamps: { currentTime: () => new Date() },
};

const categorySchema = mongoose.Schema(
  {
    value: { type: String, },
    date: { type: Date },
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
//       value: 'Drabužiai',
//       text: 'Drabužiai',
//     }
//   ]
// });

// testCategories.save();


module.exports = CategoryModel;
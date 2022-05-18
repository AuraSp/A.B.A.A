const express = require("express");

const {
  getAllCategories,
  deleteCategory,
  createCategory,
  addNewCategory,
} = require("./../controllers/categoryController");

const router = express.Router();

router.route("/").get(getAllCategories).post(createCategory);
router.route("/").get(getAllCategories).post(addNewCategory);

router.route("/categories/delete/:subId").patch(deleteCategory);

module.exports = router;
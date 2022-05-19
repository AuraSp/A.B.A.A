const express = require("express");

const {
  updateCategory,
  getAllCategories,
  deleteCategory,
  createCategory,
  addNewCategory,
  getCategoryById,
} = require("./../controllers/categoryController");

const router = express.Router();
router.route("/").get(getAllCategories);
// router.route("/").get(getAllCategories).post(createCategory);
// router.route("/").get(getAllCategories).post(addNewCategory);
router.route("/:id").get(getCategoryById).patch(updateCategory);

router.route("/:id/category/update").patch(updateCategory);
router.route("/:id/categories/delete/:subId").patch(deleteCategory);

router.route("/:id/addNewCategory").patch(addNewCategory);

module.exports = router;
const express = require("express");

const {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("./../controllers/categoryController");

const router = express.Router();

router.route("/").get(getAllCategories).post(createCategory);

router
  .route("/:id")
  .get(getCategoryById)
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router;
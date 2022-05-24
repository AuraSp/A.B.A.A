const express = require("express");

const {
  updateCategory,
  getAllCategories,
  deleteCategory,
  addNewCategory,
  getCategoryById,
} = require("./../controllers/categoryController");

const router = express.Router();
router.route("/").get(getAllCategories);

// router.route("/").get(getAllCategories).patch(addNewCategory);
router.route("/:id").get(getCategoryById).patch(updateCategory);

router.route("/category/:subId/update").patch(updateCategory);
router.route("/category/:subId/delete").patch(deleteCategory);

router.route("/:id/addNewCategory").patch(addNewCategory);

module.exports = router;
const express = require("express");

const {
  getAllStudents,
  createStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require("./../controllers/studentsController");

const router = express.Router();

router.route("/").get(getAllStudents).post(createStudent);

router
  .route("/:id")
  .get(getStudentById)
  .put(updateStudent)
  .delete(deleteStudent);

module.exports = router;

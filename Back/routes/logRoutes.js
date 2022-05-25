const express = require("express");

const {
  deleteLog,
  getAllLogs,
  addNewLog,
} = require("./../controllers/logController");

const router = express.Router();

router.route("/").get(getAllLogs);

router.route("/addNewLog").post(addNewLog);
router.route("/:id/deleteLog").delete(deleteLog);

module.exports = router;
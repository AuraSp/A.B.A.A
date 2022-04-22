const express = require("express");
const { get } = require("http");

const studentsRoutes = require("./routes/studentsRoutes");

const app = express();

app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

app.use("/api/v1/database", studentsRoutes);

module.exports = app;

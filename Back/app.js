const express = require("express");
const { get } = require("http");


const IncomeRoutes = require("./routes/IncomeRoutes");
const CostRoutes = require("./routes/CostRoutes");
const TransactionsRoutes = require("./routes/TransactionsRoutes");


const app = express();

app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });


app.use("/api/v1/income", IncomeRoutes);
app.use("/api/v1/cost", CostRoutes);

app.use("/api/v1/users/", TransactionsRoutes);


module.exports = app;

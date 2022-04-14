const Costs = require("./../models/costModel");

// Gauti visas islaidas
exports.getAllCosts = async (req, res) => {
  try {
    const costs = await Costs.find();
    res.status(200).json({
      status: "success",
      results: costs.length,
      data: {
        costs: costs,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// Sukurti islaida
exports.createCost = async (req, res) => {
  try {
    const newCost = await Costs.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        cost: newCost,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

// Gauti islaida pagal ID
exports.getCostById = async (req, res) => {
  try {
    const cost = await Costs.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        cost: cost,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

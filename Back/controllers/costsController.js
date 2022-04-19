const Costs = require("./../models/costModel");

// Gauti visas pajamas
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

// Sukurti pajamų išrašą
exports.createCost = async (req, res) => {
  try {
    const newCost = await Costs.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        costs: newCost,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

// Gauti studentą pagal ID
exports.getCostById = async (req, res) => {
  try {
    const cost = await Costs.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        costs: cost,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// Atnaujinti esamą studentą
exports.updateCost = async (req, res) => {
  try {
    const cost = await Costs.findByIdAndUpdate(req.params.id, req.body, {
      // atnaujinus duomenis - gauti atnaujintą studento informaciją
      new: true,
      // papildomai patikrintų duomenis pagal DB schemą (studentModel)
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        costs: cost,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
const Outcomes = require("./../models/outcomeModel");

// Gauti visas pajamas
exports.getAllOutcomes = async (req, res) => {
  try {
    const outcomes = await Outcomes.find();
    res.status(200).json({
      status: "success",
      results: outcomes.length,
      data: {
        outcomes: outcomes,
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
exports.createOutcome = async (req, res) => {
  try {
    const newOutcome = await Outcomes.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        outcomes: newOutcome,
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
exports.getOutcomeById = async (req, res) => {
  try {
    const outcome = await Outcomes.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        outcomes: outcome,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

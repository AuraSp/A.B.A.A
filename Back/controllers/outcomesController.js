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

// Atnaujinti esamą studentą
exports.updateOutcome = async (req, res) => {
  try {
    const outcome = await Outcome.findByIdAndUpdate(req.params.id, req.body, {
      // atnaujinus duomenis - gauti atnaujintą studento informaciją
      new: true,
      // papildomai patikrintų duomenis pagal DB schemą (studentModel)
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        outcome: outcome,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// Pašalinti studentą pagal ID
exports.deleteOutcome = async (req, res) => {
  try {
    await outcome.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
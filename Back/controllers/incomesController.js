const Incomes = require("./../models/incomeModel");

// Gauti visas pajamas
exports.getAllIncomes = async (req, res) => {
  try {
    const incomes = await Incomes.find();
    res.status(200).json({
      status: "success",
      results: incomes.length,
      data: {
        incomes: incomes,
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
exports.createIncome = async (req, res) => {
  try {
    const newIncome = await Incomes.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        incomes: newIncome,
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
exports.getIncomeById = async (req, res) => {
  try {
    const income = await Incomes.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        incomes: income,
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
exports.updateStudent = async (req, res) => {
  try {
    const income = await Incomes.findByIdAndUpdate(req.params.id, req.body, {
      // atnaujinus duomenis - gauti atnaujintą studento informaciją
      new: true,
      // papildomai patikrintų duomenis pagal DB schemą (studentModel)
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        incomes: income,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
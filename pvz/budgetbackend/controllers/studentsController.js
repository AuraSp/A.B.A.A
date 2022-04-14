const Students = require("./../models/studentModel");

// Gauti visus studentus
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Students.find();
    res.status(200).json({
      status: "success",
      results: students.length,
      data: {
        students: students,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// Sukurti studentą
exports.createStudent = async (req, res) => {
  try {
    const newStudent = await Students.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        user: newStudent,
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
exports.getStudentById = async (req, res) => {
  try {
    const student = await Students.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        user: student,
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
    const student = await Students.findByIdAndUpdate(req.params.id, req.body, {
      // atnaujinus duomenis - gauti atnaujintą studento informaciją
      new: true,
      // papildomai patikrintų duomenis pagal DB schemą (studentModel)
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        users: student,
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
exports.deleteStudent = async (req, res) => {
  try {
    await Students.findByIdAndDelete(req.params.id);

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

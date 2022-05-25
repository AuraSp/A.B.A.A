const Categories = require("./../models/categoryModel");



// Gauti visus kategorias
exports.getAllCategories = async (req, res) => {
  try {
    const category = await Categories.find();
    res.status(200).json({
      status: "success",
      results: category.length,
      data: {
        categories: category,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};


exports.addNewCategory = async (req, res) => {
  console.log(req.params.id);
  console.log(req.params.subId);
  try {
    const updated = await Categories.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { category: req.body } },
      {
        new: true,
      }
    );
    console.log(req.params.id);
   console.log(req.params.subId);
    console.log(updated);
    res.status(200).json({
      status: "success",
      data: {
        category: updated,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// Gauti kategorija pagal ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Categories.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        categories: category,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// Atnaujinti esamą kategorija
exports.updateCategory = async (req, res) => {
  console.log( req.params.id)
  console.log( req.params.subId)
  try {
    const category = await Categories.findOneAndUpdate(
      {'category._id': req.params.subId},
      {
        $set: {
          "category.$.value": req.body.value,
        },    
    });

    res.status(200).json({
      status: "success",
      data: {
        categories: category,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await Categories.findOneAndUpdate(
      {'category._id': req.params.subId},
      { $pull: { category: { _id: req.params.subId } } }
    );
    res.status(200).json({
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
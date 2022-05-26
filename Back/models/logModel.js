const mongoose = require("mongoose");

// DB schema
const Date = {
  timestamps: { currentTime: () => new Date() },
};

const logSchema = mongoose.Schema(
  {
    userId: { type: String, },
    text: { type: String, },
    amount: { type: Number, },
    value: {type: String, }
  },
  { timestamps: true }
);


// Modelis DB lentelės pavadinimas
const LogModel = new mongoose.model("Logs", logSchema);



module.exports = LogModel;
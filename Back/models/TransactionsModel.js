const mongoose = require("mongoose");

//Convert Date format to only date without time
const Date = {
  timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
};
// DB schema

const IncomesSchema = mongoose.Schema(
  {
    description: { type: String, trim: true, },
    category: { type: String },
    date: { type: Date },
    income: { type: Number, required: true },
    type: { type: String, default: "income" },
  },
  { timestamps: true }
);

const ExpensesSchema = mongoose.Schema(
  {
    description: { type: String, trim: true, },
    category: { type: String },
    date: { type: Date },
    expense: { type: Number, required: true },
    type: { type: String, default: "expense" },
  },
  { timestamps: true }
);

const LimitSchema = mongoose.Schema(
  {
    limit: { type: Number },
    category: { type: String },
  },
  { timestamps: true }
);

const usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
    },

    limit: [LimitSchema],
    income: [IncomesSchema],
    expense: [ExpensesSchema],
  },
  { timestamps: true }
);

// Modelis DB lentelės pavadinimas
const TransactionsModel = new mongoose.model('Users', usersSchema);

// const testUsers = new TransactionsModel({
//   name: "Atomas Gediminas",
//   email: "antanas@gmail.com",
//   password: "123",
//   balance: 0,
//   limit: [{ category: "transport", limit: 200 }],
//   income: [
//     {
//       type: 'income',
//       description: "alga",
//       category: "alga",
//       date: "2022-04-10",
//       income: "1500",
//     }
//   ],
//   expense: [
//     {
//       type: 'expense',
//       description: 'pica',
//       category: "pramogos",
//       date: "2022-04-14",
//       expense: "100",
//     }
//   ]
// });

// testUsers.save();

module.exports = TransactionsModel;

const mongoose = require("mongoose");


const LimitSchema = mongoose.Schema(
    {
      limit: { type: Number },
      category: { type: String },
    },
    { timestamps: true }
  );
  const ExpensesSchema = mongoose.Schema(
    {
      description: { type: String, trim: true, },
      category: { type: String },
      date: { type: Date },
      amount: { type: Number, required: true },
      type: { type: String, default: "expense" },
    },
    { timestamps: true }
  );
  const IncomesSchema = mongoose.Schema(
    {
      description: { type: String, trim: true, },
      category: { type: String },
      date: { type: Date },
      amount: { type: Number, required: true },
      type: { type: String, default: "income" },
    },
    { timestamps: true }
  );

const User = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
      },
      email: {
        type: String
        // required: true,
      },
      password: {
        type: String,
        required: true,
      },
      roles:{
          // type: mongoose.Schema.Types.ObjectId,
          // ref: "Role",
          type: String,
          default:'user',
          enum: ["user", "admin"]
        },
        
      limit: [LimitSchema],
      income: [IncomesSchema],
      expense: [ExpensesSchema],
    },
    { timestamps: true }
  ))
module.exports = User;
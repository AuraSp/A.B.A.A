
const mongoose = require("mongoose");
var bcrypt = require('bcryptjs');
SALT_WORK_FACTOR = 10;

// DB schema

const Date = {
  timestamps: { currentTime: () => new Date() },
};

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

usersSchema.pre('save', function (next) {
  var user = this
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);
    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
})

usersSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

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

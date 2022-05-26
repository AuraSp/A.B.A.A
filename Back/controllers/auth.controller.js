const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
exports.signup = async (req, res) => {
  try {
    let email = req.body.email;
    let user = await User.findOne({ email });
    if (user) return res.status(400).send("User already registered.");
    // var roles = await Role.create({
    //   roles: req.body.roles
    // })
    var result = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const token = jwt.sign({ id: result._id }, "labas", {
      expiresIn: "90d",
    });
    //const newUser = awai`t Users.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        user: result,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
// exports.signup = (req, res) => {
//   const user = new User({
//     username: req.body.username,
//     email: req.body.email,
//     password: bcrypt.hashSync(req.body.password, 8),
//   });
//   user.save((err, user) => {
//     if (err) {
//       res.status(500).send({ message: err });
//       return;
//     }
//     if (req.body.roles) {
//       Role.find(
//         {
//           name: { $in: req.body.roles },
//         },
//         (err, roles) => {
//           if (err) {
//             res.status(500).send({ message: err });
//             return;
//           }
//           user.roles = roles.map((role) => role._id);
//           user.save((err) => {
//             if (err) {
//               res.status(500).send({ message: err });
//               return;
//             }
//             res.send({ message: "User was registered successfully!" });
//           });
//         }
//       );
//     } else {
//       Role.findOne({ name: "user" }, (err, role) => {
//         if (err) {
//           res.status(500).send({ message: err });
//           return;
//         }
//         user.roles = [role];
//         user.save((err) => {
//           if (err) {
//             res.status(500).send({ message: err });
//             return;
//           }
//           res.send({ message: "User was registered successfully!" });
//         });
//       });
//     }
//   });
// };
exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    // .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return (
          res.status(401).send({ message: "Invalid Password!" })
        ) 
        console.log("lol")
        
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });
      var authorities = [];
    //   for (let i = 0; i < user.roles.length; i++) {
    //     authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
    //   }
      req.session.token = token;
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        income: user.income,
        expense: user.expense
        // roles: authorities
      });
    });
};
exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};
const mongoose = require("mongoose");
const app = require("./app");

const db = require("./models");
const Role = db.role;

const DB =
  "mongodb+srv://vilnius:Qq3eZqIwvjdQ1ZA8@users.va1ta.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Prisijungta prie DB...:)");
  });

  function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
          console.log("added 'user' to roles collection");
        });
        new Role({
          name: "moderator"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
          console.log("added 'moderator' to roles collection");
        });
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
          console.log("added 'admin' to roles collection");
        });
      }
    });
  }

  
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

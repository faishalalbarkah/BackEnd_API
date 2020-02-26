const jwt = require("jsonwebtoken");
const Logins = require("../models").user;

// const login = [
//   {
//     id: 1,
//     title: "Walking with Lucinta",
//     isDone: true
//   }
// ];

exports.index = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  Logins.findOne({ where: { email: email, password: password } }).then(
    login => {
      if (login) {
        const token = jwt.sign({ userId: login.id }, "my-secret-key");
        res.send({
          email: login.email,
          token
        });
      } else {
        res.send({ error: true, message: "Wrong Email and Password" });
      }
    }
  );
};

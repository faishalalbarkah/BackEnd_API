const jwt = require("jsonwebtoken");
const model = require("../models");
const User = model.user;
const Pet = model.pet;

exports.regis = async (req, res) => {
  try {
    const { breeder, email, password, phone, address } = req.body;
    const { name, gender, aboutpet } = req.body.pet;
    User.findOne({ where: { email } }).then(Email => {
      if (!Email) {
        const user = User.create({
          breeder: breeder,
          email: email,
          password: password,
          phone: phone,
          address: address
        }).then(user => {
          Pet.create({
            name: name,
            gender: gender,
            aboutpet: aboutpet,
            user_id: user.id,
            spesies_id: req.body.pet.spesies.id,
            age_id: req.body.pet.age.id
          }).then(pet => {
            const token = jwt.sign({ userId: user.id }, "my-secret-key");
            res.status(200).send({
              status: 200,
              message: "success",
              email: user.email,
              token
            });
          });
        });
      } else {
        res.status(201).send({
          status: 201,
          message: "email is already in use",
          data: req.body
        });
      }
    });
  } catch (error) {
    res.status(400).send({
      status: 400,
      email: "unique",
      password: "unique",
      message: "Bad Request",
      data: req.body
    });
  }
};

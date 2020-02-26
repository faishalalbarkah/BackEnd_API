const model = require("../models");
const User = model.user;

//Detail
exports.Insert = (req, res) => {
  const Id = req.params.id;
  User.findAll({ where: { Id } }).then(DetUsers => {
    res.send({ DetUsers });
  });
};

//Update User
exports.UpdateData = (req, res) => {
  const id = req.params.id;
  const { breeder, address, phone } = req.body;
  const dataUp = { breeder, address, phone };
  User.update(dataUp, { where: { id: id } }).then(result => {
    if (result) {
      User.findOne({
        where: { id: id }
      }).then(Update => {
        res.send({ Message: "Success", Update });
      });
    }
  });
};

//Delete User
exports.Deleted = (req, res) => {
  const id = req.params.id;
  User.destroy({ where: { id } }).then(DelUser => {
    if (DelUser) {
      res.send({ message: "Success", DelUser });
    } else {
      res.send({ status: "404", message: "not found" });
    }
  });
};

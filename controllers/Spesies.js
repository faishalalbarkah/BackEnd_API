const Spesiess = require("../models").spesies;

exports.spesies = (req, res) => {
  // const id = req.body.id;
  //   const name = .name;

  Spesiess.create(req.body).then(spes => {
    res.send({
      message: "Success",
      spes
    });
  });
};

exports.spesiesss = (req, res) => {
  Spesiess.findAll().then(spes => {
    res.send({
      message: "Success",
      spes
    });
  });
};

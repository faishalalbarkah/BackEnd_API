const models = require("../models");
const Match = models.match;
const Pet = models.pet;
const Spesies = models.spesies;
const Age = models.age;
const User = models.user;

// --- show data match task 1. Check Match
exports.ChekMat = async (req, res) => {
  try {
    const { pet_id, pet_id_liked } = req.query;
    const resultMatch = await Match.findOne({
      where: { pet_id, pet_id_liked }
    });
    if (resultMatch) {
      const pet = await Pet.findOne({
        where: { id: resultMatch.pet_id },
        attributes: ["id", "name", "gender", "aboutpet", "photo"],
        include: [
          { model: Spesies, attributes: ["id", "name"] },
          { model: Age, attributes: ["name"] },
          { model: User, attributes: ["id", "breeder", "address", "phone"] }
        ]
      });
      const pet_liked = await Pet.findOne({
        where: { id: resultMatch.pet_id_liked },
        attributes: ["id", "name", "gender", "aboutpet", "photo"],
        include: [
          { model: Spesies, attributes: ["id", "name"] },
          { model: Age, attributes: ["name"] },
          { model: User, attributes: ["id", "breeder", "address", "phone"] }
        ]
      });
      res.status(200).send({
        status: 200,
        message: "success",
        data: {
          id: resultMatch.id,
          status: resultMatch.status,
          pet,
          pet_liked,
          createdAt: resultMatch.createdAt,
          updatedAt: resultMatch.updatedAt
        }
      });
    } else {
      res.status(404).send({
        status: 404,
        message: "not found"
      });
    }
  } catch (error) {}
  res.status(400).send({
    status: 400,
    message: "bad request"
  });
};
// !--- end show data match

// --- Create data match
exports.InsertMat = async (req, res) => {
  try {
    const { pet_id, pet_id_liked } = req.body;
    if (pet_id != "" && pet_id_liked != "") {
      const storePet = await Match.create(req.body);
      if (storePet) {
        const pet = await Pet.findOne({
          where: { id: storePet.pet_id },
          attributes: ["id", "name", "gender", "aboutpet", "photo"],
          include: [
            { model: Spesies, attributes: ["id", "name"] },
            { model: Age, attributes: ["name"] },
            { model: User, attributes: ["id", "breeder", "address", "phone"] }
          ]
        });
        const pet_liked = await Pet.findOne({
          where: { id: storePet.pet_id_liked },
          attributes: ["id", "name", "gender", "aboutpet", "photo"],
          include: [
            { model: Spesies, attributes: ["id", "name"] },
            { model: Age, attributes: ["name"] },
            { model: User, attributes: ["id", "breeder", "address", "phone"] }
          ]
        });
        res.status(200).send({
          status: 200,
          message: "success",
          data: {
            id: storePet.id,
            status: storePet.status,
            pet,
            pet_liked,
            createdAt: storePet.createdAt,
            updatedAt: storePet.updatedAt
          }
        });
      } else {
        res.status(404).send({
          status: 404,
          message: "not found",
          id
        });
      }
    }
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: "bad request"
    });
  }
};
// !--- Create data match

// --- Update data match
exports.UpMat = async (req, res) => {
  try {
    const matchId = req.params.id;
    // console.log(req.params.id);
    const result = await Match.update(req.body, { where: { id: matchId } });
    if (result) {
      const resultMatch = await Match.findOne({
        where: { id: matchId }
      });

      const pet = await Pet.findOne({
        where: { id: resultMatch.pet_id },
        attributes: ["id", "name", "gender", "aboutpet", "photo"],
        include: [
          { model: Spesies, attributes: ["id", "name"] },
          { model: Age, attributes: ["name"] },
          { model: User, attributes: ["id", "breeder", "address", "phone"] }
        ]
      });
      const pet_liked = await Pet.findOne({
        where: { id: resultMatch.pet_id_liked },
        attributes: ["id", "name", "gender", "aboutpet", "photo"],
        include: [
          { model: Spesies, attributes: ["id", "name"] },
          { model: Age, attributes: ["name"] },
          { model: User, attributes: ["id", "breeder", "address", "phone"] }
        ]
      });
      res.status(200).send({
        status: 200,
        message: "success",
        data: {
          id: resultMatch.id,
          status: resultMatch.status,
          pet,
          pet_liked,
          createdAt: resultMatch.createdAt,
          updatedAt: resultMatch.updatedAt
        }
      });
    } else {
      res.status(204).send({
        status: 204,
        message: "no content"
      });
    }
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: "bad request"
    });
  }
};
// !--- end Update data match

//Get By Status True
exports.TrueMat = async (req, res) => {
  try {
    const { pet_id, status } = req.query;
    const match = await Match.findAll({
      where: { pet_id: pet_id, status: status }
    });

    const pet = await Pet.findOne({
      where: { id: pet_id },
      attributes: ["id", "name", "gender", "aboutpet", "photo"],
      include: [
        { model: Spesies, attributes: ["id", "name"] },
        { model: Age, attributes: ["name"] },
        { model: User, attributes: ["id", "breeder", "address", "phone"] }
      ]
    });

    const pet_liked = [];
    for (let i = 0; i < match.length; i++) {
      const liked = await Pet.findOne({
        where: { id: match[i].pet_id_liked },
        attributes: ["id", "name", "gender", "aboutpet", "photo"],
        include: [
          { model: Spesies, attributes: ["id", "name"] },
          { model: Age, attributes: ["name"] },
          { model: User, attributes: ["id", "breeder", "address", "phone"] }
        ]
      });
      pet_liked.push(liked);
    }

    const petMatch = [];
    match.map((e, i) => {
      data = {
        status: 200,
        message: "success",
        data: {
          id: e.id,
          status: e.status,
          pet,
          pet_liked,
          createdAt: e.createdAt,
          updatedAt: e.updatedAt
        }
      };
      petMatch.push(data);
    });

    res.status(200).send(petMatch); //sen response
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: "bad request"
    });
  }
};

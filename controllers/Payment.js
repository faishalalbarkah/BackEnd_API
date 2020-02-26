const Model = require("../models");
const Payment = Model.payment;
const User = Model.user;
const jwt = require("jsonwebtoken");

// const { secretKey } = require("../middleware");

// function decode jwt
const verifyJwt = jwtHeader => {
  let jwtData;
  let authorization = jwtHeader.split(" ")[1],
    decoded;
  try {
    decoded = jwt.verify(authorization, "my-secret-key");
    jwtData = {
      error: false,
      values: decoded
    };
  } catch (e) {
    jwtData = {
      error: true,
      values: null
    };
  }
  return jwtData;
};

// Insert One Species
exports.InsertPay = (req, res) => {
  const jwtData = verifyJwt(req.headers.authorization);
  if (!jwtData.error) {
    const Insertdate = {
      no_rek: req.body.no_rek,
      proof_of_transfer: req.body.proof_of_transfer,
      user_id: jwtData.values.userId,
      status: req.body.status
    };
    Payment.create(Insertdate).then(dataPayment => {
      if (dataPayment) {
        Payment.findOne({
          include: [
            {
              model: User,
              attributes: [
                "id",
                "breeder",
                "address",
                "phone",
                "createdAt",
                "updatedAt"
              ]
            }
          ],
          where: { id: dataPayment.id },
          attributes: ["no_rek", "proof_of_transfer", "status"]
        }).then(data => res.send(data));
      } else {
        res.status(400).send({
          error: true,
          message: "Error Insert Data"
        });
      }
    });
  } else {
    res.status(401).send({
      error: true,
      message: "Error Not Authorized"
    });
  }
};

// Update Paymanet
exports.UpgradePay = (req, res) => {
  const id = req.params.id;
  const jwtData = verifyJwt(req.headers.authorization);
  if (!jwtData.error) {
    User.findOne({ where: { id: jwtData.values.userId, admin: true } }).then(
      data => {
        if (data) {
          Payment.update(req.body, { where: { id: id } }).then(updated => {
            if (updated) {
              Payment.findOne({
                include: [
                  {
                    model: User,
                    attributes: ["id", "breeder", "address", "phone"]
                  }
                ],
                where: { id: id },
                attributes: ["id", "no_rek", "proof_of_transfer", "status"]
              }).then(respon => res.send(respon));
            }
          });
        } else {
          res.status(401).send({
            error: true,
            message: "Your Not Admin"
          });
        }
      }
    );
  } else {
    res.status(401).send({
      error: true,
      message: "Error Not Authorized"
    });
  }
};

//instantiate express module
const express = require("express");
require("express-group-routes");
//init bodyParser
const bodyParser = require("body-parser");

const expressJwt = require("express-jwt");
const { authenticated } = require("./middleware");

//use express in app variable
const app = express();
//define the server port
const port = process.env.PORT || 5001;

// app.use(cors());

//allow this app to receive incoming json request
app.use(bodyParser.json());

//import the controller
const LoginController = require("./controllers/Login");
const RegisterController = require("./controllers/Register");
const SpesiesController = require("./controllers/Spesies");
const PetController = require("./controllers/Pet");
const UserController = require("./controllers/User");
const PaymentController = require("./controllers/Payment");
const MatchController = require("./controllers/match");

app.group("/api/v1", router => {
  //todos API, call the controllers here in the callback
  router.post("/login", LoginController.index);
  router.post("/register", RegisterController.regis);
  router.post("/spesies", authenticated, SpesiesController.spesies);
  router.get("/spesies", authenticated, SpesiesController.spesiesss);
  //Crud Pet
  router.post("/pet", authenticated, PetController.Insert);
  router.get("/pet", authenticated, PetController.Get);
  router.patch("/pet/:id", authenticated, PetController.Update);
  router.delete("/pet/:id", authenticated, PetController.Deleted);
  //Detail Pet
  router.get("/pet/:id", authenticated, PetController.DetailPet);
  //User
  router.get("/user/:id", authenticated, UserController.Insert);
  router.patch("/user/:id", authenticated, UserController.UpdateData);
  router.delete("/user/:id", authenticated, UserController.Deleted);
  //Payment
  router.post("/payment", authenticated, PaymentController.InsertPay);
  router.patch("/payment/:id", authenticated, PaymentController.UpgradePay);
  //Match
  router.get("/match", authenticated, MatchController.ChekMat);
  router.post("/match", authenticated, MatchController.InsertMat);
  router.patch("/match/:id", authenticated, MatchController.UpMat);
  router.get("/match", authenticated, MatchController.TrueMat);
});

app.get("/", (req, res) => {
  res.send("Success");
});
// //use group routes here
// app.group("/api/v2", router => {
//   router.get("/todos", (req, res) => {
//     res.send(todos);
//   });
//   router.get("/todos/:id", (req, res) => {
//     const id = req.params.id;
//     const index = id - 1;
//     res.send(todos[index]);
//   });
// });

//create the homepage route
// app.get("/", (req, res) => {
//   //res means, response, and it send string "Hello Express!" to the API
//   res.send("Hello Express!");
// });
//make hardcoded array of obj todos
// const todos = [
//   {
//     id: 1,
//     title: "Walking with Lucinta",
//     isDone: true
//   },
//   {
//     id: 2,
//     title: "Sleeping with Lucinta",
//     isDone: false
//   }
// ];

//use group routes here
// app.group("/api/v1", (router) => {
//     router.get('/todos', (req, res) => {
//         res.send(todos)
//     }));

//when this nodejs app executed, it will listen to defined port
app.listen(port, () => console.log(`Listening on port ${port}!`));

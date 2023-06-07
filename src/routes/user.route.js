const route = require("express").Router();
const userController = require("../controllers/user.controller");

route.post("/", userController.createUser);
route.get("/", userController.findAllUsers);
route.get("/:id", userController.findUser);

module.exports = route;

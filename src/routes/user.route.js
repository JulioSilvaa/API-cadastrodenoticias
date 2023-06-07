const route = require("express").Router();
const userController = require("../controllers/user.controller");

route.get("/", userController.user);

module.exports = route;

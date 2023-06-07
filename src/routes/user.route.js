const route = require("express").Router();
const userController = require("../controllers/user.controller");

const { idIsValid, userIsValid } = require("../middlewares/global.middleware");

route.post("/", userController.createUser);
route.get("/", userController.findAllUsers);
route.get("/:id", idIsValid, userIsValid, userController.findUser);
route.patch("/:id", idIsValid, userIsValid, userController.updateUser);

module.exports = route;

const mongoose = require("mongoose");
const userService = require("../services/user.service");

const idIsValid = (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return (id = req.body.id);
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: "id inválido" });
  }

  next();
};

const userIsValid = async (req, res, next) => {
  const { id } = req.params;

  const user = await userService.findUserService(id);

  if (!user) {
    return res.status(400).send({ message: "Usuário não encontrado" });
  }

  req.id = id;
  req.user = user;

  next();
};

module.exports = {
  idIsValid,
  userIsValid,
};

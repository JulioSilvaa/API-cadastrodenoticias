const userService = require("../services/user.service");

const create = async (req, res) => {
  const { name, username, email, password } = req.body;

  if (!name || !username || !password || !email) {
    res.status(400).send({ message: "Favor preencher todos os campos" });
  }

  const user = await userService.create(req.body);

  if (!user) {
    return res.status(400).send({ message: "Erro ao criar usuário" });
  }

  res.status(201).send({
    message: "Usuário cadastrado com sucesso",
    user: {
      id: user._id,
      name,
      username,
      email,
    },
  });
};

module.exports = { create };

const create = (req, res) => {
  const { name, username, email, password } = req.body;

  if (!name || !username || !password || !email) {
    res.status(400).send({ message: "Favor preencher todos os campos" });
  }

  res.status(201).send({
    message: "Usuário cadastrado com sucesso",
    user: {
      name,
      username,
      email,
    },
  });
};

module.exports = { create };

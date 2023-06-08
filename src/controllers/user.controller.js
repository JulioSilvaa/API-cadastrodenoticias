import userService from "../services/user.service.js";

const createUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (!name || !username || !password || !email) {
      return res
        .status(400)
        .send({ message: "Favor preencher todos os campos" });
    }

    const user = await userService.createService(req.body);

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
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const findAllUsers = async (req, res) => {
  try {
    const users = await userService.findAllService();
    if (users.length === 0) {
      return res.status(400).send({ message: "não há usuários cadastrados" });
    }

    res.status(200).json(users.sort((a, b) => b.createdAt - a.createdAt));
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const findUser = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req;
    const { name, username, email } = req.body;

    if (!name && !username && !email) {
      return res.status(400).send({ message: "Nenhum campo foi alterado" });
    }

    await userService.updateUserService(id, name, username, email);

    res.status(200).send({ message: "Usuário atualizado com sucesso" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export default { createUser, findAllUsers, findUser, updateUser };

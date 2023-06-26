import bcrypt from "bcryptjs";
import { generateToken, loginService } from "../services/auth.service.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await loginService(email);

    if (!user) {
      return res.status(404).send({ message: "usuário ou senha inválidos" });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return res.status(404).send({ message: "Usuário ou senha inválidos" });
    }

    const token = generateToken(user.id);

    res.status(200).send({ token });
  } catch (error) {
    res.send(error.message);
  }
};

export { login };

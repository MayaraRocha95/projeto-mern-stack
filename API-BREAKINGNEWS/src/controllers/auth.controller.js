import bcrypt from "bcrypt";
import { loginService, generateToken } from "../services/auth.service.js";

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await loginService(email);

    if (!user) {
      return res.status(404).send({ message: "User or Password not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).send({ message: "User or Password not found" });
    }

    const token = generateToken(user.id);

    res.send({ token });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export { login };
import bcrypt from "bcrypt";
import { loginService } from "../services/auth.service.js";

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await loginService(email);

    if (!user) {
      return res.status(404).send({ message: "User or Password not found" });
    }

    const isPasswordIsValid = bcrypt.compareSync(password, user.password);


    if (!isPasswordIsValid || !user) {
      return res.status(400).send({ message: "User or Password not found" });
    }

    res.send("Login Ok");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export { login };

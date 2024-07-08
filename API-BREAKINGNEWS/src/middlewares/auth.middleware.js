import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import userService from "../services/user.service.js";
dotenv.config();

export const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.sendStatus(401);
    }
    const parts = authorization.split(" ");

    if (parts.length !== 2) {
      return res.sendStatus(401);
    }

    const [schema, token] = parts;

    if (schema !== "Bearer") {
      return res.sendStatus(401);
    }

    const decoded = await promisify(jwt.verify)(token, process.env.SECRETE_JWT);
    const user = await userService.findByIdUserService(decoded.id);

    if (!user || !user.id) {
      return res.status(401).send({ message: "Token Invalid!!" });
    }

    req.userId = user._id;

   return next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.status(401).send({ message: "Token Invalid!!" });
    }
    res.status(500).send(err.message);
  }
};
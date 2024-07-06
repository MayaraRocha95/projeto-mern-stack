import express from "express";
import connectDataBase from "./src/database/database.js";
import userRoute from "./src/routes/user.route.js";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

connectDataBase();
app.use(express.json());
app.use("/user", userRoute);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

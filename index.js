import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDatabase from "./src/database/db.js";
import useRoute from "./src/routes/user.route.js";
const app = express();
dotenv.config();

const port = process.env.PORT || 3000;
connectDatabase();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/user", useRoute);

app.listen(port, () => console.log(`Servidor rodando na porta: ${port}`));

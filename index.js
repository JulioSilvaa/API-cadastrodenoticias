const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const connectDatabase = require("./src/database/db");
const useRoute = require("./src/routes/user.route");
dotenv.config();

const port = 3000;
connectDatabase();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/user", useRoute);

app.listen(port, () => console.log(`Servidor rodando na porta: ${port}`));

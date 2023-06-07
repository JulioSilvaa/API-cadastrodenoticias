const express = require("express");
const app = express();
const useRoute = require("./src/routes/user.route");

const port = 3000;

app.use("/eu", useRoute);

app.listen(port, () => console.log(`Servidor rodando na porta: ${port}`));

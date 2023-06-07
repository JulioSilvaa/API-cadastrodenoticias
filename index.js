const express = require("express");
const app = express();
const useRoute = require("./src/routes/user.route");

app.use("/eu", useRoute);

app.listen(8080);

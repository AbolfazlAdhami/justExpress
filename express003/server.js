const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const expressValidator = require("express-validator");
global.config = require("./modules/config");

//  Connect to DB
mongoose.connect("mongodb://127.0.0.1:270170/education");
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: "application/json" }));
app.use(expressValidator);
app.use("/public", express.static("public"));

const apiRouter = require("./modules/routes/api");
const webRouter = require("./modules/routes/web");

app.use("/api", apiRouter);
app.use("/", webRouter);

app.listen(config.port, () => {
  console.log(`Server running on Port ${config.port}`);
});

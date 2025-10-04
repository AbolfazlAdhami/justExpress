const colors = require("colors");

const setColor = {
  GET: "green",
  POST: "blue",
  PUT: "yellow",
  DELETE: "red",
};

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`[setColor[req.method]]["white"]);
  next();
};

module.exports = { logger };

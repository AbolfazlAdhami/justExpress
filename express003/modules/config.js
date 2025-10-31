const path = require("path");

module.exports = {
  port: 8000,
  path: {
    controllers: {
      api: path.resolve("./controllers/api"),
      web: path.resolve("./controllers/web"),
    },
    model: path.resolve("./models"),
    controller: path.resolve("./controllers"),
  },
};

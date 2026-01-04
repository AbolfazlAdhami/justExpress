const path = require("path");

module.exports = {
  port: 8000,
  secret: "cdc3303daec23f94b368baa814cba1d8",
  path: {
    controllers: {
      api: path.resolve("./controllers/api"),
      web: path.resolve("./controllers/web"),
    },
    model: path.resolve("./models"),
    controller: path.resolve("./controllers"),
    transforms: path.resolve("./transforms"),
  },
};

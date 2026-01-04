module.exports = new (class HomeController {
  index(req, res) {
    res.json("Welcome to api");
  }
  version(req, res) {
    res.json("version 1");
  }
})();

// const Controller = require(`${config.path.controllers}/Controller`);

const Controller = require("../../Controller");

module.exports = new (class CourseController extends Controller {
  index(req, res) {
    this.model.Course.find({}, (err, courses) => {
      if (err) throw err;

      if (courses) return res.json(courses);
    });
  }
  single(req, res) {}
  store(req, res) {
    // Validation
    req.checkBody("title", "title could not empty").notEmpty();
    req.checkBody("body", "body could not empty").notEmpty();
    req.checkBody("price", "price could not empty").notEmpty();
    req.checkBody("image", "image could not empty").notEmpty();

    this.escapeAndTrim(req, "title price image");

    if (this.showValidationErrors(req, res)) return;

    const { title, body, price, image } = req.body;

    new this.model.User({ title, body, price, image }).save((err) => {
      if (err) throw err;

      return res.json({ message: "create courses successfully", success: true });
    });
  }
  update(req, res) {}
  destroy(req, res) {}
})();

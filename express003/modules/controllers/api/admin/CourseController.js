const Controller = require("../../Controller");

module.exports = new (class CourseController extends Controller {
  index(req, res) {
    this.model.Course.find({}, (err, courses) => {
      if (err) throw err;

      if (courses) return res.json(courses);
    });
  }

  single(req, res) {
    req.checkParams("id", "id is invalid ").isMongoId();

    if (this.showValidationErrors(req, res)) return;

    this.model.Course.findById(req.params.id).exec((err, course) => {
      if (err) throw err;

      if (course) return res.json({ data: course, success: true });

      return res.json({ message: "episode empty", success: false });
    });
  }

  store(req, res) {
    // Validation
    req.checkBody("title", "title could not empty").notEmpty();
    req.checkBody("body", "body could not empty").notEmpty();
    req.checkBody("price", "price could not empty").notEmpty();
    req.checkBody("image", "image could not empty").notEmpty();

    this.escapeAndTrim(req, "title price image");

    if (this.showValidationErrors(req, res)) return;

    const { title, body, price, image } = req.body;

    const newCourse = new this.model.User({ title, body, price, image });

    newCourse.save((err) => {
      if (err) throw err;
      req.user.courses.push(newCourse._id);
      req.user.save();
      return res.status(201).json({ message: "create courses successfully", success: true });
    });
  }

  update(req, res) {
    req.checkParams("id", "id is invalid").isMongoId();

    if (this.showValidationErrors(req, res)) return;

    const { title } = req.body;

    this.model.Course.findByIdAndUpdate(req.params.id, { title }, (err) => {
      if (err) throw err;

      return res.json({ message: "Course updated Successfully ", success: true });
    });
  }

  destroy(req, res) {
    req.checkParams("id", "id is invalid").isMongoId();

    if (this.showValidationErrors(req, res)) return;

    this.model.Course.findByIdAndRemove(req.params.id, (err) => {
      if (err) throw err;
      res.json({ message: "Course was Deleted Successfully", success: true });
    });
  }
})();

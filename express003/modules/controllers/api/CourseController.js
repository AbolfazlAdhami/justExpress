const Controller = require(`${config.path.controller}/Controller`);
const CourseTransform = require(`${config.path.transforms}/v1/CourseTransform`);

module.exports = new (class CourseController extends Controller {
  index(req, res) {
    this.model.Course.find({}, (err, courses) => {
      if (err) throw err;

      if (courses)
        return res.json({
          data: new CourseTransform().transforms(courses),
          success: true,
        });

      res.json({ message: "Courses empty!", success: false });
    });
  }
})();

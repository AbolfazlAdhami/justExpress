const Controller = require(`../Controller`);
const CourseTransform = require(`${config.path.controller}/v1/CourseTransform`);

module.exports = new (class CourseController extends Controller {
  index(req, res) {
    // this.model.Course.find({}, (err, courses) => {
    //   if (err) throw err;

    //   if (courses)
    //     return res.json({
    //       data: new CourseTransform().transforms(courses),
    //       success: true,
    //     });

    //   res.json({ message: "Courses empty!", success: false });
    // });

    const page = req.query.page || 1;
    this.model.Course.paginate({}, { page, limit: 2, populate: ["episode"] })
      .then((result) => {
        if (result)
          return res.json({
            // data: {
            //   courses: new CourseTransform().transformCollection(result.docs),
            //   total: result.total,
            //   limit: result.limit,
            //   page: result.page,
            //   pages: result.pages,
            // },
            success: true,
            data: new CourseTransform().withPaginate().transformCollection(result.docs),
          });

        res.json({ message: "Courses empty!", success: false });
      })
      .catch((err) => {
        console.log(err);
      });
  }
})();

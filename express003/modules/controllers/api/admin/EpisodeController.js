// const Controller = require(`${config.path.controllers}/Controller`);

const Controller = require("../../Controller");
const EpisodeTransform = require("../../../transforms/v1/EpisodeTransform");
module.export = new (class EpisodeController extends Controller {
  index(req, res) {
    const page = req.query.page || 1;

    this.model.Episode.paginate({}, { page, limit: 2 })
      .then((result) => {
        if (result) return res.json({ Date: new EpisodeTransform().withPaginate().transformCollection(result), success: true });

        return res.status(404).json({
          message: "episode not found try later",
          success: false,
        });
      })
      .catch((err) => console.log(err));
  }

  single(req, res) {
    req.checkParams("id", "id is invalid").isMongoId();

    if (this.showValidationErrors(req, res)) return;

    this.model.Episode.findById(req, params.id, (err, episode) => {
      if (err) throw err;

      if (episode) return res.json({ data: episode, success: true });

      return res.status(404).json({ message: "not Found!", success: false });
    });
  }

  store(req, res) {
    req.checkBy("title", "title could not be empty").notEmpty();
    req.checkBy("body", "you must fill a description for episode").notEmpty();
    req.checkBy("course_id", "course id must send").notEmpty();
    req.checkBy("videoUrl", "Url address could not be empty").notEmpty();
    req.checkBy("number", "episode must have number").notEmpty();

    this.escapeAndTrim(req, "title body course_id number");

    if (this.showValidationErrors(req, res)) return;


    const { course_id } = req.body;
    let course = this.model.Course.findById();
  }
  update(req, res) {
    req.checkParams("id", "id is invalid").isMongoId();

    if (this.showValidationErrors(req, res)) return;

    const { title } = req.body;
    this.model.Episode.findByIdAndUpdate(req.params.id, { title }, (err, episode) => {
      if (err) throw err;

      if (episode) return req.json({ message: "episode updated successfully", success: true });

      return res.status(400).json({ message: "Something is wrong check later", success: false });
    });
  }
  destroy(req, res) {
    req.checkParams("id", "id is invalid").isMongoId();

    if (this.showValidationErrors(req, res)) return;

    this.model.Episode.findById(req.params.id)
      .populate("course")
      .exec((err, episode) => {
        if (err) throw err;

        if (episode) {
          let course = episode.course;
          let pos = course.episodes.indexOf(episode._id);
          course.episode.splice(pos, 1);

          course.save((err) => {
            if (err) throw err;
            episode.remove();

            return res.json({ message: "Episode was deleted successfully", success: true });
          });
          return res.status(400).json({ message: "Something wrong try later", success: false });
        }
        return res.status(404).json({ message: "Not found episode by this id ", success: false });
      });
  }
})();

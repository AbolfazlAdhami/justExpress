// const Controller = require(`${config.path.controllers}/Controller`);

const Controller = require("../../Controller");

module.export = new (class EpisodeController extends Controller {
  index(req, res) {
    this.model.Episode.find({}, (err, episodes) => {
      if (err) throw err;

      if (episodes) return res.json({ data: episodes, success: true });
    });
  }

  single(req, res) {
    req.checkParams("id", "id is invalid").isMongoId();

    if (this.showValidationErrors(req, res)) return;

    this.model.Episode.findById(req, params.id, (err, episode) => {
      if (err) throw err;

      if (episode) return res.json({ data: episode, success: true });

      return res.json({ message: "not Found!", success: false });
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

con

      let course=this.model.Course.findById()



  }
  update(req, res) {}
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
          return res.json({ message: "Something wrong try later", success: false });
        }
        return res.json({ message: "Not found episode by this id ", success: false });
      });
  }
})();

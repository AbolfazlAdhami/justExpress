const config = require("../../config");

const Controller = require(`../Controller`);
const EpisodeTransform = require(`${config.path.controller}/EpisodeTransform`);


module.exports = new (class EpisodeController extends Controller {
  single(req, res) {
    req.checkParams("id", "id is invalid ").isMongoId();

    if (this.showValidationErrors(req, res)) return;

    this.model.Episode.findById(req, params.id)
      .populate("course")
      .exec((err, episode) => {
        if (err) throw err;

        if (episode) return req.json({ data: new EpisodeTransform().transform(episode), success: true });

        return res.json({ message: "episode empty", success: false });
      });
  }
})();
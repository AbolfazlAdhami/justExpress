const Controller = require(`${config.path.controllers}/Controller`);
const UserTransform = require(`${config.path.transforms}/v1/UserTransform`);

module.exports = new (class UserController extends Controller {
  index(req, res) {
    return res.json({
      data: new UserTransform().transform(req.user),
    });
  }
  uploadImage(req, res) {
    res.json(req.file);
    if (req.file) {
      res.json({
        message: "File Uploaded Successfully",
        data: {
          imagePath: `http://localhost:8080/${req.file.path.replace(/\\/g, "/")}`,
        },
        success: true,
      });
    } else {
      res.json;
      res.json({
        message: "File Could not upload!",
      });
    }
  }
})();

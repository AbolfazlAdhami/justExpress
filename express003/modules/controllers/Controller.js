// Models
const Course = require(`${config.path.modal}/course`);
const Episode = require(`${config.path.modal}/episode`);
const User = require(`${config.path.modal}/User`);

module.exports = class Controller {
  constructor() {
    this.model = { Course, Episode, User };
  }

  showValidationErrors(req, res, callback) {
    let errors = req.validationErrors();
    if (errors) {
      res.status(422).json({
        message: errors.map((err) => {
          return {
            field: err.param,
            message: err.msg,
          };
        }),
        success: false,
      });
      return true;
    }

    return false;
  }

  escapeAndTrim(req, items) {
    items.split(" ").forEach((item) => {
      req.sanitize(item).escape();
      req.sanitize(item).trim();
    });
  }
};

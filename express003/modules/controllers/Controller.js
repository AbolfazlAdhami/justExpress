const Course = require(`${config.path.modal}/course`);

module.exports = class Controller {
  constructor() {
    this.model = { Course };
  }
};

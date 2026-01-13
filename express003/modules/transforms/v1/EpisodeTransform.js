const Transform = require("../Transform");
const CourseTransform = require("./CourseTransform");

module.exports = class EpisodeTransform extends Transform {
  transform(item) {
    return {
      title: item.title,
      body: item.body,
      ...this.showCourse(item),
    };
  }
  showCourse(item) {
    if (this.withCourseStatus) return { course: new CourseTransform().transform(item.course) };
    return {};
  }

  withCourse() {
    this.withCourseStatus = true;
    return this;
  }
};

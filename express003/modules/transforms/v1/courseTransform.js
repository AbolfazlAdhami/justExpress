const Transform = require("../Transform");

module.exports = class CourseTransform extends Transform {
  transform(item) {
    return {
      title: item.title,
      body: item.body,
      price: item.price,
      ...this.showEpisodes(item),
    };
  }
  showEpisodes(item) {
    const EpisodeTransform = require("./EpisodeTransform");
  }

  withEpisodes() {}
};

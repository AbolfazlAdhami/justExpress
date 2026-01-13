const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamps = require("mongoose-timestamp");
const mongoosePaginate = require("mongoose-paginate");


const EpisodeSchema = new Schema({
  course: { type: Schema.Types.ObjectId, ref: "Course" },
  title: { type: String, required: true },
  body: { type: String, required: true },
  videoUrl: { type: String, required: true },
  number: { type: String, required: true },
  viewCount: { type: Number, default: 0 },
  commentCount: { type: Number, default: 0 },
});

EpisodeSchema.plugin(timestamps);
EpisodeSchema.plugin(mongoosePaginate);

module.exports = mongoose.models("Episode", EpisodeSchema);

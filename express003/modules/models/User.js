const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamps = require("mongoose-timestamp");

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  course: [{ type: Schema.Types.ObjectId, ref: "Course" }],
});

UserSchema.plugin(timestamps);

module.exports = mongoose.model("User", UserSchema);

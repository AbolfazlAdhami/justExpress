const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamps = require("mongoose-timestamp");
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  course: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  type: { type: String, default: "user" },
});

UserSchema.plugin(timestamps);

UserSchema.pre("save", (next) => {
  bcrypt.hash(this.password, 10, (err, hash) => {
    this.password = hash;
    next();
  });
});

module.exports = mongoose.model("User", UserSchema);
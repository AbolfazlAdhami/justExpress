import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { hash } from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    avatar: { type: String },
  },
  { timestamps: true }
);

//  Password check method
userSchema.methods.matchPassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.getSalt(10);
  this.password = await hash(this.password, salt);
  next();
});

//  hide password when converting to JSON
userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

export const User = mongoose.model("User", userSchema);

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const OAuthSchema = new mongoose.Schema(
  {
    provider: {
      type: String,
      enum: ["google", "discord"],
    },
    providerId: String,
    email: String,
    avatar: String,
  },
  { _id: false },
);

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
    },
    displayname: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      lowercase: true,
      index: true,
    },
    password: { type: String, minlength: 8, select: false },
    oauth: OAuthSchema,
    role: {
      type: String,
      enum: ["customer", "shopkeeper", "admin"],
      default: "customer",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

//  Hash Password and save
UserSchema.pre("save", async (next) => {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//  Password Compare Method
UserSchema.methods.comparePassword = async function (plainPassword) {
  if (!this.password) return false;
  return bcrypt.compare(plainPassword, this.password);
};

UserSchema.methods.toJson = () => {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const User = mongoose.model("User", UserSchema);
export default User;

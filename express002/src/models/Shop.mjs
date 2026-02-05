import mongoose from "mongoose";

const ShopSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
    isActive: { type: Boolean, default: true },
    address: {
      country: String,
      city: String,
      street: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Shop", ShopSchema);

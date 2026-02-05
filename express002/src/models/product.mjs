import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    descriptions: String,
    price: { type: Number, require: true },
    stock: { type: Number, default: 0 },
    images: [String],
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      require: true,
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default mongoose.model("Product", ProductSchema);

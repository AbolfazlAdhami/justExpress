import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" },

  price: Number,
  quantity: Number,
});

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [OrderItemSchema],

    totalAmount: { type: Number, required: true },

    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
      default: "pending",
    },

    paymentIntentId: String,

    shippingAddress: {
      country: String,
      city: String,
      street: String,
      postalCode: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Order", OrderSchema);

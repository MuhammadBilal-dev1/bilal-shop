const mongoose = require("mongoose");

const addToCartSchema = mongoose.Schema(
  {
    productId: {
      type: String,
      ref: "product",
    },
    quantity: Number,
    userId: String,
  },
  { timestamps: true }
);

const addToCartModel = mongoose.model("addToCart", addToCartSchema);

module.exports = addToCartModel;

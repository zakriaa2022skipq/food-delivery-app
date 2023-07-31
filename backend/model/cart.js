const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.ObjectId, ref: "user", required: true },
  items: [
    {
      itemId: {
        type: mongoose.ObjectId,
        ref: "item",
      },
      quantity: {
        type: Number,
      },
    },
  ],
});

const Cart = mongoose.model("cart", cartSchema);

module.exports = Cart;

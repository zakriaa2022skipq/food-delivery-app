const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: [35, "Max length is 35"],
    trim: true,
    required: true,
  },
  categoryId: {
    type: mongoose.ObjectId,
    ref: "category",
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
  },
  price: {
    type: Number,
  },
});

const Item = mongoose.model("item", itemSchema);
module.exports = Item;

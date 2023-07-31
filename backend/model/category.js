const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: [35, "Max length is 35"],
    trim: true,
    required: true,
  },
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;

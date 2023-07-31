const Item = require("../model/item");
const asyncHandler = require("express-async-handler");

const createItem = asyncHandler(async (req, res) => {
  const { name, categoryId, price, calories } = req.body;
  const img = req.file?.filename;
  if (!name || !categoryId || !price || !calories || !img) {
    res.statusCode = 400;
    throw new Error(
      "Item name, categoryId, price, calories and img is required"
    );
  }
  const menuItem = await Item.create({
    name,
    categoryId,
    price,
    calories,
    img,
  });
  if (!menuItem) {
    res.statusCode = 400;
    throw new Error("Item not added");
  }
  res.status(201).json({ menuItem });
});
const updateItem = asyncHandler(async (req, res) => {
  const { itemId } = req.params;
  const { name, categoryId, price, calories } = req.body;
  const img = req.file?.filename;
  if (!name || !categoryId || !price || !calories) {
    res.statusCode = 400;
    throw new Error("Item name, categoryId, price and calories  are required");
  }
  const update = { name, categoryId, price, calories };
  if (img) {
    update.img = img;
  }
  const menuItem = await Item.findOneAndUpdate({ _id: itemId }, update, {
    new: true,
  });

  if (!menuItem) {
    res.statusCode = 400;
    throw new Error("Item not updated");
  }
  res.status(200).json({ menuItem });
});
const deleteItem = asyncHandler(async (req, res) => {
  const { itemId } = req.params;
  const item = await Item.findOneAndDelete({ _id: itemId });
  res.status(200).json({ msg: "Item deleted sucessfully" });
});

module.exports = {
  createItem,
  updateItem,
  deleteItem,
};

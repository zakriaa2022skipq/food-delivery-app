const Category = require("../model/category");
const asyncHandler = require("express-async-handler");
const Item = require("../model/item");
const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.statusCode = 400;
    throw new Error("Category name is required");
  }
  const categoryExists = await Category.findOne({ name });
  if (categoryExists) {
    res.statusCode = 409;
    throw new Error("Category already exists");
  }
  const category = await Category.create({ name });
  if (category) {
    res.status(201).json({ category });
  }
});
// all categories
const getCategory = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.status(200).json({ categories });
});
const updateCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const { name } = req.body;
  if (!name) {
    res.statusCode = 400;
    throw new Error("Category name is required");
  }
  const category = await Category.findOneAndUpdate(
    { _id: categoryId },
    { name },
    { new: true }
  );
  res.status(200).json({ category });
});
const deleteCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const category = await Category.findOneAndDelete({ _id: categoryId });
  res.status(200).json({ category });
});
const allCategoryItems = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const items = await Item.find({ categoryId });
  res.status(200).json({ items });
});

module.exports = {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  allCategoryItems,
};

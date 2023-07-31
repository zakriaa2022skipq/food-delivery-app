const express = require("express");
const { authMiddleware, adminMiddleware } = require("../middleware/auth");

const {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  allCategoryItems,
} = require("../controller/category");

const router = express.Router();

router.route("/create").post(authMiddleware, adminMiddleware, createCategory);
router
  .route("/:categoryId")
  .get(allCategoryItems)
  .put(authMiddleware, adminMiddleware, updateCategory)
  .delete(authMiddleware, adminMiddleware, deleteCategory);
router.route("/").get(getCategory);

module.exports = router;

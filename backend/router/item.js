const express = require("express");
const { createItem, deleteItem, updateItem } = require("../controller/item");
const upload = require("../middleware/fileUpload");
const { adminMiddleware, authMiddleware } = require("../middleware/auth");
const router = express.Router();

router
  .route("/create")
  .post(authMiddleware, adminMiddleware, upload.single("img"), createItem);
router
  .route("/:itemId")
  .patch(authMiddleware, adminMiddleware, upload.single("img"), updateItem)
  .delete(authMiddleware, adminMiddleware, deleteItem);
module.exports = router;

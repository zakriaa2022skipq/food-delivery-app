const express = require("express");
const {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
} = require("../controller/cart");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();
router.route("/").get(authMiddleware, getCart);
router.route("/additem").patch(authMiddleware, addToCart);
router.route("/removeitem").patch(authMiddleware, removeFromCart);
router.route("/clear").patch(authMiddleware, clearCart);

module.exports = router;

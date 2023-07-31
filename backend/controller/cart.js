const Cart = require("../model/cart");
const asyncHandler = require("express-async-handler");

const getCart = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const cart = await Cart.findOne({ userId });
  res.status(200).json({ cart });
});
const addToCart = asyncHandler(async (req, res) => {
  const { itemId, quantity } = req.body;
  const userId = req.userId;
  const cart = await Cart.findOne({ userId });
  if (cart) {
    const itemExists = cart.items.find((item) => {
      return item.itemId.toString() === itemId;
    });
    if (itemExists) {
      itemExists.quantity = itemExists.quantity + parseInt(quantity);
    } else {
      const item = { itemId, quantity };
      cart.items.push(item);
    }
    const updatedCart = await Cart.findOneAndUpdate({ userId }, cart, {
      new: true,
    });
    res.status(200).json({ cart: updatedCart });
  } else {
    const newCart = await Cart.create({
      userId,
      items: [{ itemId, quantity }],
    });
    res.status(200).json({ cart: newCart });
  }
});
const removeFromCart = asyncHandler(async (req, res) => {
  const { itemId } = req.body;
  const userId = req.userId;
  let cart = await Cart.findOne({ userId });

  const updateItemIndex = cart.items.findIndex(
    (item) => item.itemId.toString() === itemId
  );
  if (updateItemIndex >= 0) {
    const oldItem = cart.items[updateItemIndex];
    if (oldItem.quantity > 1) {
      oldItem.quantity = oldItem.quantity - 1;
    } else {
      cart.items.splice(updateItemIndex, 1);
    }
    cart = await Cart.findOneAndUpdate({ userId }, cart, {
      new: true,
    });
  }
  res.status(200).json({ cart });
});
const clearCart = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const cart = await Cart.findOneAndUpdate(
    { userId },
    { items: [] },
    { new: true }
  );
  console.log(cart, "cart");
  if (cart) {
    res.status(200).json({ cart });
  } else {
    res.statusCode = 400;
    throw new Error("Cart cannot be cleared");
  }
});

module.exports = { getCart, addToCart, removeFromCart, clearCart };

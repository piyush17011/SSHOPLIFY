const Cart = require("../model/cartModel");

// ADD TO CART
const addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [{ productId, quantity: 1 }]
      });
      return res.json(cart);
    }

    const existingItem = cart.items.find(item => item.productId == productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ productId, quantity: 1 });
    }

    await cart.save();
    res.json(cart);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// REMOVE ITEM
const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ userId });

    cart.items = cart.items.filter(item => item.productId != productId);

    await cart.save();
    res.json(cart);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE QUANTITY
const updateQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId });

    const item = cart.items.find(item => item.productId == productId);
    item.quantity = quantity;

    await cart.save();
    res.json(cart);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET USER CART
const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId }).populate("items.productId");

    res.json(cart);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const clearCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $set: { items: [] } },
      { new: true }
    );
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  updateQuantity,
  getCart,
  clearCart
};

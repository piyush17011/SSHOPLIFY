const express = require("express");
const {
  addToCart,
  removeFromCart,
  updateQuantity,
  getCart,
  clearCart
} = require("../controller/cartController");

const router = express.Router();

router.post("/add", addToCart);
router.delete("/remove", removeFromCart);
router.put("/update", updateQuantity);
router.get("/:userId", getCart);
router.delete("/clear", clearCart);

module.exports = router;

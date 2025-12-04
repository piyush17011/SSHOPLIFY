
const Order = require('../model/orderModel');
const Cart = require("../model/cartModel");


const createOrder = async (req, res) => {
    const { userId,orderItems, amount} = req.body;
    try {
      const newProduct = new Order({ userId,orderItems,amount});
      await newProduct.save();
      // clear cart items for this user
      await Cart.findOneAndUpdate(
        { userId },
        { $set: { items: [] } },
        { new: true }
      );
      res.status(201).json(newProduct);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

// Get all orders

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId') // Populate userId with selected fields
      .populate('orderItems.product', 'title price'); // Populate orderItems.product with selected fields

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
 
const getUserOrders = async (req, res) => {
  try {
    const userId = req.params.id;
    const orders = await Order.find({userId})
      .populate('userId') // Populate userId with selected fields
      .populate('orderItems.product', 'title price'); // Populate orderItems.product with selected fields

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
   
module.exports = {createOrder,getAllOrders,getUserOrders};  //use curly brackets to export more than one var,fn
 











































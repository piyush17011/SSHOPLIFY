const Razorpay = require("razorpay");

// Create Razorpay instance using keys from .env
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Simplest: create an order and return details to frontend
const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body; // amount in INR

    if (!amount) {
      return res.status(400).json({ message: "Amount is required" });
    }

    const options = {
      amount: Math.round(amount * 100), // convert to paise
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error("Error creating Razorpay order:", err);
    return res.status(500).json({ message: "Failed to create payment order" });
  }
};

module.exports = { createRazorpayOrder };



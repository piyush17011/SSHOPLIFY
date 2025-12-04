const express = require("express");
const { createRazorpayOrder } = require("../controller/paymentController");

const router = express.Router();

// POST /api/payment/create-order
router.post("/create-order", createRazorpayOrder);

module.exports = router;



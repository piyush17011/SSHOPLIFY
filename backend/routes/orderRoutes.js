const express = require('express');


const { createOrder, getAllOrders, getUserOrders } = require('../controller/orderController');

const router = express.Router();


router.post("/addorder",createOrder)
router.get("/allorder",getAllOrders)
router.get("/userorder/:id",getUserOrders)


module.exports = router;
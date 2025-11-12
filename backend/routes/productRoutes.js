const express = require('express');


const { createProduct, getAllProducts, getCategoryProducts,getSingleProduct } = require('../controller/productController');

const router = express.Router();

console.log("gg")
router.post("/add",createProduct)
router.get("/get",getAllProducts)
router.get("/get/:cat",getCategoryProducts)
router.get("/get/single/:id",getSingleProduct)


module.exports = router;
const express = require('express');

const router = express.Router()

const productsController = require('../controllers/productsControllers')

router.get('/product-detail/:id', productsController.productDetail)
router.get('/cart', productsController.cart)
router.get('/list-product', productsController.list)

module.exports = router
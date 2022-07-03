const express = require('express');

const productsController = require('../controllers/productsControllers')

const router = express.Router()


/*router.get('/product-detail/:id', productsController.productDetail)
router.get('/cart', productsController.cart)*/
router.get('/list-product', productsController.productList)


module.exports = router
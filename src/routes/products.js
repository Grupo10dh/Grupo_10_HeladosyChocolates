const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsControllers')

/*router.get('/product-detail/:id', productsController.productDetail)*/
router.get('/cart', productsController.cart)

router.get('/list-product', productsController.productList)
router.get('/form-product', productsController.productForm)

module.exports = router
const express = require('express');

const productsApiControllers = require('../../controllers/api/productsApiControllers')

const router = express.Router();



router.get('/api/products', productsApiControllers.listProducts)

router.get('/api/products/:id', productsApiControllers.detalleProducto)




module.exports = router;
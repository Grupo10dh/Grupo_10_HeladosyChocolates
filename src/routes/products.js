const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsControllers')
const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname,'../../public/img/product'));
    },
    filename: (req, file, cb)=>{
        const newFile = 'product-' + Date.now() + path.extname(file.originalname);
        cb(null,newFile);
    }
});

const upload = multer({ storage });


// CLIENTE //

router.get('/products/:id', productsController.productDetail)
router.get('/cart', productsController.cart)

router.post('/product/buscar', productsController.buscar)

router.get('/products', productsController.productList)
router.get('/product/create', productsController.productForm)

router.post('/products', upload.single('foto-producto') ,productsController.productCreate )

router.get('/products/:id/edit',productsController.productEdit)
router.put('/products/:id', upload.single('foto-producto'), productsController.productEditConfirm)

router.delete('/products/:id',productsController.productDelete)

///   ADMIN ////

router.get('/products-admin', productsController.productListAdmin)

module.exports = router





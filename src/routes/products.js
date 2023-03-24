const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsControllers')
const mercadopagoController = require('../controllers/mercadopagoControllers')
const multer = require('multer');
const path = require('path')
const { check } = require('express-validator');

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



const validateProduct = [
    check('nombre').notEmpty().withMessage('Ingresar nombre del producto')
    .isLength({min: 5}).withMessage('El nombre debe contener minimo 5 caracteres')
    ,

    check('descripcion').isLength({min: 20}).withMessage('La descripción debe contener minimo 20 caracteres')
    ,
    
    check('foto-producto').isIn([ "jpg" ,"png", "jpeg", "gif", ""  ]).withMessage('Formato no valido') //ARMAR VALIDACION CUSTOM TIPO DE ARCHIVO
    ,
    
];


// RUTAS CLIENTE //
router.get('/img/product/:id', productsController.productImage)


router.get('/cart', productsController.cart)

router.post('/product/buscar', productsController.buscar)

router.get('/products', productsController.productList)
router.get('/product/create', [ upload.single('foto-producto'), validateProduct],productsController.productForm)

router.post('/products', [ upload.single('foto-producto'), validateProduct] ,productsController.productCreate)

router.get('/products/:id/edit',productsController.productEdit)
router.put('/products/:id', upload.single('foto-producto'), productsController.productEditConfirm)

router.delete('/products/:id',productsController.productDelete)

router.get('/slider', productsController.slider)

router.get('/products/:id', productsController.productDetail)

router.post('/products/agregar' , productsController.Añadir)

router.put('/cart/update', productsController.ActualizarCarrito)

router.delete('/cart/delete/:id',productsController.cartDelete)

router.get("/cart/finish", mercadopagoController.compraOriginal)

router.get('/mp', mercadopagoController.prueba)

router.post('/mp', mercadopagoController.compra)

module.exports = router





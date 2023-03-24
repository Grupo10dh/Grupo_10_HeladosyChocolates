const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminControllers')
const multer = require('multer');
const path = require('path')
const { check } = require('express-validator');



// RUTAS ADMIN //

router.get('/products-admin', adminController.panelAdminProducts)



router.get('/users-admin', adminController.panelAdminUsers)



// router.get('/panel-admin', adminController.panelAdmin)
module.exports = router
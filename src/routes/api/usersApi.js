const express = require('express');

const usersControllersApi = require('../../controllers/api/usersApiControllers')

const router = express.Router();


router.get('/api/users', usersControllersApi.listUsers)

router.get('/api/users/:id', usersControllersApi.detalleUsuario)

module.exports = router;
const express = require('express');

const usersControllers = require('../controllers/usersControllers')

const router = express.Router();



router.get('/login', usersControllers.login)

router.get('/register', usersControllers.register)


module.exports = router;


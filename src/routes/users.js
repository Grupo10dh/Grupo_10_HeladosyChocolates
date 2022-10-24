const express = require('express');

const usersControllers = require('../controllers/usersControllers')

const router = express.Router();
const multer = require('multer');
const path = require('path')

const { check } = require('express-validator');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname,'../../public/img/users'));
    },
    filename: (req, file, cb)=>{
        const newFile = 'user-' + Date.now() + path.extname(file.originalname);
        cb(null,newFile);
    }
});

const upload = multer({ storage });

const validateLogin = [
    check('inpUsuario').notEmpty().withMessage('Ingresar usuario'),

    // VALIDAR SI COINCIDE CON LA BASE?

    check('contraseña')
        .notEmpty().withMessage('Ingresar contraseña')
    
    // VALIDAR SI COINCIDE CON LA BASE?

];

const validateRegister = [
    check('nombre').notEmpty().withMessage('Ingresar nombre')
    .isLength({min: 2, max:20}).withMessage('El nombre debe contener entre 5 y 20 caracteres'),

    check('apellido').notEmpty().withMessage('Ingresar apellido')
    .isLength({min: 2 ,max:20}).withMessage('El apellido debe contener entre 2 y 20 caracteres'),

    check('usuario').notEmpty().withMessage('Ingresar usuario')
    .isLength({min:8,max:20}).withMessage('El usuario debe contener entre 8 y 20 caracteres'),

    check('email').notEmpty().withMessage('Ingresar email')
    .isEmail().withMessage('Ingresar email valido'),
    

    check('fotoUsuario').isIn([ "jpg" ,"png", "jpeg", "gif", "" ]).withMessage('Ingrese un formato valido')  // ARMAR VALIDACION CUSTOM TIPO DE ARCHIVO
    ,


    check('fecha').custom(value=>{
        let enteredDate=new Date(value);
        let todaysDate=new Date();
        if(enteredDate>todaysDate){
            throw new Error("Fecha invalida");
        }
        return true;
    }),

    check('domicilio')
    .isLength({max:20}).withMessage('El domicilio puede contener maximo 20 caracteres'),

    check('password')
    .notEmpty().withMessage('Ingresar contraseña')
    .isLength({min:8,max:20}).withMessage('La contraseña debe contener entre 8 y 20 caracteres'),

    check('passwordConf')
    .notEmpty().withMessage('Confirmar contraseña')
    .isLength({min:8,max:20}).withMessage('La contraseña debe contener entre 8 y 20 caracteres')
    .custom(async (passwordConf, {req}) => {
        const password = req.body.password
    
        // If password and confirm password not same
        // don't allow to sign up and throw error
        if(password !== passwordConf){
        throw new Error('Las contraseñas deben coincidir')
        }
    })
]





router.get('/login',usersControllers.login)

router.get('/register',usersControllers.register)

router.get('/users', usersControllers.usersList)

router.post('/register', [ upload.single('fotoUsuario'), validateRegister],usersControllers.createUser)

router.post('/login', validateLogin, usersControllers.postLogin)

router.get('/users/:id/edit', usersControllers.editUser)
router.put('/users/:id', upload.single('fotoUsuario') ,usersControllers.userEditConfirm)

router.delete('/users/:id',usersControllers.userDelete) //DESACTUALIZADO

router.get('/users/detail/:id', usersControllers.userDetail)

router.get('/img/users/:id', usersControllers.userImage)

module.exports = router;




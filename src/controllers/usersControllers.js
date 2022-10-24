const path = require ('path')

const fs = require ('fs')

const bcryptjs = require('bcryptjs');

const multer = require('multer');

const {validationResult} = require('express-validator');

const jsonPath = path.join(__dirname,'../data/users.json');

const userModel = require('../model/userModel')

const users = JSON.parse(fs.readFileSync(jsonPath,'utf-8'));

const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const Usuario = db.Usuario

const controller={

    login: (req,res) =>{
        res.render(path.join(__dirname,'../views/users/login.ejs'),{'userLogin':req.session.userLogged})
    },


    register: (req,res) =>{
        res.render(path.join(__dirname,'../views/users/register.ejs'),{'userLogin':req.session.userLogged})
    },


    usersList : (req,res) => {
            db.Usuario.findAll(/*{
                include: [ 
                    {
                        association: ,
                    },      
                ]
            }*/)
                .then(users => {
                    res.render(path.join(__dirname,'../views/users/listUsers.ejs'),{'users':users,'userLogin':req.session.userLogged})
                })
            
        },

   /* postLogin : (req,res)=>{
        console.log(req.body)

        const {
            inpUsuario,
            contraseña
        }=req.body;

        const errors = validationResult(req);
        
        if(errors.isEmpty()){
            const userLogin = userModel.findByField('username',inpUsuario);
            console.log(userLogin)
            if(userLogin){
                const paswd = bcryptjs.compareSync(contraseña,userLogin.password);
                if(paswd){
                    req.session.userLogged = userLogin;
                    res.redirect('/')
                }else{
                    return res.send("Contraseña incorrecta");
                }
            }else{
                const userNotLoggin = "No existe el usuario"
                res.render(path.join(__dirname,'../views/users/login.ejs'),{userNotLoggin})
            }
            
        }else{
                res.render(path.join(__dirname,'../views/users/login.ejs'),{'errors':errors.mapped(),'prev': req.body})
        }
        
    }*/
    postLogin : async (req,res) =>{
        console.log(req.body)

        const {
            inpUsuario,
            contraseña
        }=req.body;

        const errors = validationResult(req);

        if(errors.isEmpty()){
            const userLogin = await Usuario.findOne({
                where: {email: inpUsuario}
            });

        
            if(userLogin){
            console.log(userLogin)
            const paswd = bcryptjs.compareSync(contraseña,userLogin.contraseña);
                if(paswd){
                    req.session.userLogged = userLogin;
                    req.session.id = req.params.id
                    res.render(path.join(__dirname,'../views/index.ejs'),{'userLogin':req.session.userLogged,'id': req.session.id})
                }else{
                    return res.send("Contraseña incorrecta"); 
                }
            }else{
                const userNotLoggin = "No existe el usuario"
                res.render(path.join(__dirname,'../views/users/login.ejs'),{userNotLoggin})
            }
            
        }else{
                res.render(path.join(__dirname,'../views/users/login.ejs'),{'errors':errors.mapped(),'prev': req.body})
        }
    }
    ,
    createUser: async (req,res) =>{
        
        const errors = validationResult(req);

        if(errors.isEmpty()){

            const userLogin = await Usuario.findOne({
                where: {email: req.body.email} 
            });  // VERIFICACIÓN EMAIL 

            if(!userLogin){
                Usuario.create(
                    {
                        nombre: req.body.nombre,
                        apellido: req.body.apellido ? req.body.apellido : null,
                        usuario: req.body.usuario,
                        email : req.body.email ? req.body.email : null,
                        telefono: req.body.telefono ? req.body.telefono : null,
                        contraseña: bcryptjs.hashSync(req.body.password , 10) ,
                        ciudad : req.body.domicilio ?  req.body.domicilio : null,
                        fecha_de_nacimiento : req.body.fecha ? parseInt(req.body.fecha) : null, 
                        foto_de_perfil : req.file ? req.file.filename : null
                    }
                )
                .then(()=> {
                    console.log(req.body)
                    return res.redirect('/login')})            
                .catch(error => res.send(error))

            }else{

                const userNotLoggin = "Email ya registrado"
                res.render(path.join(__dirname,'../views/users/register.ejs'),{userNotLoggin})
            }

        }else{

            res.render(path.join(__dirname,'../views/users/register.ejs'),{'errors':errors.mapped(),'prev': req.body})

        }  

    },
    editUser: async (req,res) =>{

        const user = await Usuario.findByPk(req.params.id);
            if(user){
                res.render(path.join(__dirname,'../views/users/userEdit.ejs'),{'user':user,'userLogin':req.session.userLogged})
            }else{
                res.send("Not found");
            }
        


/*
        const id = req.params.id;
        const user = users.find((e) => e.id == parseInt(id))
        if(user){
        res.render(path.join(__dirname,'../views/users/userEdit.ejs'),{'user':user,'userLogin':req.session.userLogged})
        }else{
            res.send("Not found");
        }*/
    },
    userEditConfirm: async (req,res) =>{
        // const newId = req.body.id
        // const newNombre = req.body.nombre
        // const newApellido = req.body.apellido
        // const newUsuario = req.body.usuario
        // const newImage = req.file.filename ? req.file.filename : null
        // const newEmail = req.body.email
        // const newFecha = req.body.fecha
        // const newDomicilio = req.body.domicilio
        // const newPassword =req.body.password
        console.log(req.body)
        const nombre = req.body.nombre
        const apellido = req.body.apellido ? req.body.apellido : null
        const  usuario= req.body.usuario
        const  email = req.body.email ? req.body.email : null
        const  telefono= req.body.telefono ? req.body.telefono : null
        let contraseña = undefined
        if(req.body.password == ''){
            const userLogin = await Usuario.findOne({
                where: {id_usuario: req.body.id} 
            });
            contraseña = userLogin.contraseña
            console.log('A')
            console.log(contraseña)
        }else{
            contraseña = bcryptjs.hashSync(req.body.password , 10) 
            console.log('B')
            console.log(contraseña)
        }
        console.log(contraseña)

        const   ciudad = req.body.domicilio ?  req.body.domicilio : null
        const   fecha_de_nacimiento = req.body.fecha ? parseInt(req.body.fecha) : null
        const   foto_de_perfil = req.file ? req.file.filename : null
        try{
            await Usuario.update(
                {nombre,
                apellido,
                usuario,
                email,
                telefono,
                contraseña,
                ciudad,
                fecha_de_nacimiento,
                foto_de_perfil,
                },
                {
                    where: {
                        id_usuario : req.params.id
                    }
                }

            )
            res.redirect(`/users/detail/${req.params.id}`)
        } catch (error) {
            console.log(error)
        }



        // users.forEach(element => {
        //     if(element.id === parseInt(newId)){
        //         element.id = parseInt(newId);
        //         element.name = newNombre;
        //         element.apellido = newApellido
        //         element.username = newUsuario;
        //         element.email = newEmail;
        //         element.password = newPassword;
        //         element.city = newDomicilio
        //         element.date = newFecha
        //         element.image = newImage

        //     }
        // });

        // fs.writeFile(jsonPath,JSON.stringify(users),(error) => {
        //     if(error){
        //         res.send(error);
        //     }else{
        //         res.redirect('/users');
        //     }
        // })
    },
    userDelete : async (req,res) =>{

        try {
            await Usuario.destroy({
                where: {
                    id_usuario: req.params.id
                },
                force:true
            });
            res.redirect('/users');
        } catch (error) {
            console.log(error);
        }




        // console.log(req.params.id)
        // const id = req.params.id
        // const userFiltrado = users.filter( e=> e.id != parseInt(id))

        // /*res.send(productFiltrado)*/
        
        // fs.writeFile(jsonPath,JSON.stringify(userFiltrado), (error)=>{
        //     if(error){
        //         res.send("Error " + error);
        //     }else{
        //         res.redirect('/users');
        //     }
        // })
    },

    userDetail : async (req,res) => {
        const user = await Usuario.findByPk(req.params.id)
        if(user){
        res.render(path.join(__dirname,'../views/users/userDetail.ejs'),{'user':user,'userLogin':req.session.userLogged})
        }else{
            res.send("Not found");
        }
    },

    userImage : async (req,res) => {
        const user = await Usuario.findByPk(req.params.id)
        if(user){
        res.render(path.join(__dirname,'../views/users/userImage.ejs'),{'user':user,'userLogin':req.session.userLogged})
        }else{
            res.send("Not found");
        }
    },
}


module.exports = controller
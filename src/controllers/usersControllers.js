const path = require ('path')

const fs = require ('fs')

const bcryptjs = require('bcryptjs');

const {validationResult} = require('express-validator');

const jsonPath = path.join(__dirname,'../data/users.json');

const userModel = require('../model/userModel')

const users = JSON.parse(fs.readFileSync(jsonPath,'utf-8'));

const controller={
    login: (req,res) =>{
        res.render(path.join(__dirname,'../views/users/login.ejs'),{'userLogin':req.session.userLogged})
    },
    register: (req,res) =>{
        res.render(path.join(__dirname,'../views/users/register.ejs'),{'userLogin':req.session.userLogged})
    },
    users: (req,res) =>{
        res.render(path.join(__dirname,'../views/users/users.ejs'),{'users':users,'userLogin':req.session.userLogged})
    },
    postLogin:(req,res)=>{
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
        
    },
    createUser: (req,res) =>{
        
        const newNombre = req.body.nombre
        const newApellido = req.body.apellido
        const newUsuario = req.body.usuario
        const newImage = req.file ? req.file.filename : ""
        const newEmail = req.body.email
        const newFecha = req.body.fecha
        const newDomicilio = req.body.domicilio
        const newPassword =req.body.password

        console.log(req.body)
        const errors = validationResult(req);
        
        

        if(errors.isEmpty()){
            const userEmail = userModel.findByField('email',newEmail)
            const userUsuario = userModel.findByField('username',newUsuario)
            if(userEmail){
                res.send("Este email ya esta en uso");
            }
            if(userUsuario){
                res.send("Este usuario ya esta en uso");
            }else{
                const id = users.length;
                    const newId = id + 1
                    const obj = {
                        id: newId,
                        name: newNombre,
                        apellido : newApellido,
                        username: newUsuario,
                        email: newEmail,
                        password: bcryptjs.hashSync(newPassword, 10),
                        phonenumber: "",
                        city: newDomicilio,
                        date: newFecha,
                        image: newImage
                    }
                    console.log(obj)
                    users.push(obj)
                    fs.writeFile(jsonPath,JSON.stringify(users),(error) => {
                        if(error){
                            res.send(error);
                        }else{
                            res.redirect('/');
                        }
                    })  
                }
        }else{
            console.log(errors.mapped())
            res.render(path.join(__dirname,'../views/users/register.ejs'),{'errors':errors.mapped(),'prev': req.body})
        }
    },
    editUser: (req,res) =>{
        const id = req.params.id;
        const user = users.find((e) => e.id == parseInt(id))
        if(user){
        res.render(path.join(__dirname,'../views/users/userEdit.ejs'),{'user':user,'userLogin':req.session.userLogged})
        }else{
            res.send("Not found");
        }
    },
    userEditConfirm: (req,res) =>{
        const newId = req.body.id
        const newNombre = req.body.nombre
        const newApellido = req.body.apellido
        const newUsuario = req.body.usuario
        const newImage = req.file ? req.file.filename : ""
        const newEmail = req.body.email
        const newFecha = req.body.fecha
        const newDomicilio = req.body.domicilio
        const newPassword =req.body.password

        users.forEach(element => {
            if(element.id === parseInt(newId)){
                element.id = parseInt(newId);
                element.name = newNombre;
                element.apellido = newApellido
                element.username = newUsuario;
                element.email = newEmail;
                element.password = newPassword;
                element.city = newDomicilio
                element.date = newFecha
                element.image = newImage

            }
        });

        fs.writeFile(jsonPath,JSON.stringify(users),(error) => {
            if(error){
                res.send(error);
            }else{
                res.redirect('/users');
            }
        })
    },
    userDelete : (req,res) =>{
        console.log(req.params.id)
        const id = req.params.id
        const userFiltrado = users.filter( e=> e.id != parseInt(id))

        /*res.send(productFiltrado)*/
        
        fs.writeFile(jsonPath,JSON.stringify(userFiltrado), (error)=>{
            if(error){
                res.send("Error " + error);
            }else{
                res.redirect('/users');
            }
        })
    }
}


module.exports = controller
const path = require ('path')

const fs = require ('fs')

const {validationResult} = require('express-validator');

const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const Productos = db.Productos


const Usuario = db.Usuario




const controller = {
    
panelAdminProducts : (req,res) => {
    Productos.findAll()
    .then(productos => {
        res.render(path.join(__dirname,'../views/admin/panelAdminProducts.ejs'),{'productos':productos,'userLogin':req.session.userLogged})
    })
    
},

panelAdminUsers :  (req,res) => {
    Usuario.findAll()
    .then(users => {
        res.render(path.join(__dirname,'../views/admin/panelAdminUsers.ejs'),{'users':users,'userLogin':req.session.userLogged})
    }) 
},

}

module.exports = controller;
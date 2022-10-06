const path = require ('path')

const fs = require ('fs')

const jsonPath = path.join(__dirname,'../data/products.json');

const json = JSON.parse(fs.readFileSync(jsonPath,'utf-8'));

const {validationResult} = require('express-validator');

const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const Producto = db.Producto

const controller = {

    productList : (req,res) => {

        db.Producto.findAll(/*{
            include: [ 
                {
                    association: 'categorias',
                },      
            ]
        }*/)
            .then(productos => {
                // res.send(productos)
                res.render(path.join(__dirname,'../views/products/listProducts.ejs'),{'productos':productos,'userLogin':req.session.userLogged})
            })
        
    },


    cart : (req,res) => {
        res.render(path.join(__dirname,'../views/products/productCart.ejs'),{'userLogin':req.session.userLogged})
    },


    productDetail : async (req,res) => {
        const product = await Producto.findByPk(req.params.id)
        if(product){
        res.render(path.join(__dirname,'../views/products/productDetail.ejs'),{'product':product,'userLogin':req.session.userLogged})
        }else{
            res.send("Not found");
        }
    },


    productForm : (req,res) => {
        res.render(path.join(__dirname,'../views/products/formProducts.ejs'))
    },


    productCreate : (req,res) => {

        const errors = validationResult(req);

        console.log(errors)

        if(errors.isEmpty()){

            Producto.create(
                {
                    nombre: req.body.nombre,
                    descripcion: req.body.descripcion,
                    precio_unidad: req.body.precio,
                    descuento : req.body.enOferta ? req.body.enOferta : null,
                    imagen: req.file ? req.file.filename : null,
                    stock:  req.body.stock ? req.body.stock : null,
                    id_categoria : req.body.categoria
                }
            )
            .then(()=> {
                console.log(req.body)
                return res.redirect('/products-admin')})            
            .catch(error => res.send(error))
            
        }else{

            res.render(path.join(__dirname,'../views/products/formProducts.ejs'),{'errors':errors.mapped(),'prev': req.body})

        }
    
    },


    productEdit : async (req,res) =>{

            const product = await Producto.findByPk(req.params.id);
            if(product){
                res.render(path.join(__dirname,'../views/products/formProductsEdit.ejs'),{'detalle':product,'userLogin':req.session.userLogged})
            }else{
                res.send("Not found");
            }
        
    },


    productEditConfirm : async (req,res) => {

        const nombre = req.body.nombre
        const descripcion = req.body.descripcion
        const  precio_unidad = req.body.precio
        const  descuento = req.body.enOferta ? req.body.enOferta : null
        const  imagen = req.file.filename ? req.file.filename : null
        const  stock  =   req.body.stock ? req.body.stock : null
        const id_categoria = parseInt(req.body.categoria)
        
        try {
            await db.Producto.update(
                {
                    nombre,
                    descripcion,
                    precio_unidad,
                    descuento,
                    imagen,
                    stock,
                    id_categoria,
                },
                {
                    where: {
                        id_producto: parseInt(req.body.id),
                    }
                }
            );
            res.redirect('/products');
        } catch (error) {
            res.send(error);
        }
        
},

    productDelete : async (req,res) =>{
        
        try {
            await db.Producto.destroy({
                where: {
                    id_producto : req.params.id
                }
            });
            res.redirect('/products-admin');
        } catch (error) {
            res.send(error);
        }
    },
        

    productListAdmin : (req,res) => {

        db.Producto.findAll()
            .then(productos => {
                res.render(path.join(__dirname,'../views/products/listProductsAdmin.ejs'),{'productos':productos,'userLogin':req.session.userLogged})
            })
        
    },

    buscar : async (req,res) =>{
        console.log(req.body.buscar)
       const busquedaProducto = req.body.buscar
       const product =  await db.Producto.findOne({
            where: {nombre: busquedaProducto}
       })
       if(product){
        res.render(path.join(__dirname,'../views/products/productDetail.ejs'),{'product':product,'userLogin':req.session.userLogged})
       }else{
        res.send ('No se encontró el producto') //CAMBIAR ESTO
       }
    }

}

module.exports = controller;




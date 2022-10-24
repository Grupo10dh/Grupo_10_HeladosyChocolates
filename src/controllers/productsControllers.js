const path = require ('path')

const fs = require ('fs')

const jsonPath = path.join(__dirname,'../data/products.json');

const json = JSON.parse(fs.readFileSync(jsonPath,'utf-8'));

const {validationResult} = require('express-validator');

const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const Categorias = db.Categorias

const Productos = db.Productos

const controller = {

    productList : async (req,res) => {
        
    const productos = await Productos.findAll(
        
        {
            include: [ 
                "Categorias"
            ]
        }

        // {   
        //     attributes: ['id_producto', 'nombre', 'descripcion', 'precio_unidad' , 'descuento', 'imagen' , 'stock' , 'id_categoria'],
        // },

        // {
        //     where :{ someAttribute: { [Op.not]: Producto.CategoriumIdCategoria} }
        // }
        )
            .then(productos => {
                // res.send(productos)
                res.render(path.join(__dirname,'../views/products/listProducts.ejs'),{'productos':productos,'userLogin':req.session.userLogged})
            })
        
    },


    cart : (req,res) => {
        res.render(path.join(__dirname,'../views/products/productCart.ejs'),{'userLogin':req.session.userLogged})
    },


    productDetail : async (req,res) => {
        const product = await Productos.findByPk(req.params.id)
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

            Productos.create(
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

            const product = await Productos.findByPk(req.params.id);
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
        const  imagen = req.file ? req.file.filename : null
        const  stock  =   req.body.stock ? req.body.stock : null
        const id_categoria = parseInt(req.body.categoria)
        
        try {
            await Productos.update(
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
            res.redirect('/products-admin');
        } catch (error) {
            res.send(error);
        }
        
},

    productDelete : async (req,res) =>{
        
        try {
            await Productos.destroy({
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

        Productos.findAll()
            .then(productos => {
                res.render(path.join(__dirname,'../views/products/listProductsAdmin.ejs'),{'productos':productos,'userLogin':req.session.userLogged})
            })
        
    },

    buscar : async (req,res) =>{
        let {buscar} = req.body

        if(buscar){
            let producto = await Productos.findAll({
                where:{
                    nombre : {[Op.like]: `%${buscar}%`}
                }
            })
            producto.length ? res.render(path.join(__dirname,'../views/products/listProductsBuscar.ejs'),{'productos':producto,'userLogin':req.session.userLogged}) : res.redirect('/');
        }else{
            res.redirect('/')
        }

        

        





    //     console.log(req.body.buscar)
    //    const busquedaProducto = req.body.buscar
    //    const product =  await db.Producto.findOne({
    //         where: {nombre: busquedaProducto}
    //    })
    //    if(product){
    //     res.render(path.join(__dirname,'../views/products/productDetail.ejs'),{'product':product,'userLogin':req.session.userLogged})
    //    }else{
    //     res.send ('No se encontró el producto') //CAMBIAR ESTO
    //    }


    },

    productImage : async (req,res) => {
        const product = await Productos.findByPk(req.params.id)
        if(product){
        res.render(path.join(__dirname,'../views/products/productImage.ejs'),{'product':product,'userLogin':req.session.userLogged})
        }else{
            res.send("Not found");
        }
    }

}

module.exports = controller;




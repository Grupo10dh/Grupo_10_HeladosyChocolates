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

const Detalle = db.Detalle_Orden

const Carrito = db.Carrito

const controller = {

    productList : async (req,res) => {
        
    const productos = await Productos.findAll(
        
        {
            include: [ 
                "Categorias"
            ]
        }

        )
            .then(productos => {
                
                res.render(path.join(__dirname,'../views/products/listProducts.ejs'),{'productos':productos,'userLogin':req.session.userLogged})
            })
        
    },


    cart : async (req,res) => {

        let userId = req.session.userLogged.id_usuario

        const productosCarrito = await Detalle.findAll({
            include:[
                {
                    model: Carrito, as :"carrito", where : {'id_carrito': userId} , attributes: []
                },
                {
                    model: Productos, as :"productos", attributes:['nombre','precio_unidad','imagen','id_producto']
                }
            ]
        })

        // res.render(path.join(__dirname,'../views/products/productCart.ejs'),{'productosCarrito':productosCarrito,'subtotal':undefined,'userLogin':req.session.userLogged})

        console.log(productosCarrito)

        if(productosCarrito.length){
            let subtotalArray =[]

            let subtotal  =  productosCarrito.map(e => subtotalArray.push(e.subtotal))
    
            let subtotalSuma = subtotalArray.reduce(((accumulator, e) => accumulator + e))

            let envio = 600

            let total = subtotalSuma + envio

            res.render(path.join(__dirname,'../views/products/productCart.ejs'),{'productosCarrito':productosCarrito,'subtotal':subtotalSuma,'envio':envio , 'total':total ,'userLogin':req.session.userLogged})
        }
        else{
            res.render(path.join(__dirname,'../views/products/productCartEmpty.ejs'),{'userLogin':req.session.userLogged})
            // res.send("Carrito Vacio") // CAMBIAR ESTO POR UNA VISTA DE CARRITO VACIO O ALERTA
        }

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
                res.render(path.join(__dirname,'../views/partials/partialListProductsAdmin.ejs'),{'productos':productos,'userLogin':req.session.userLogged})
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
    },

    productImage : async (req,res) => {
        const product = await Productos.findByPk(req.params.id)
        if(product){
        res.render(path.join(__dirname,'../views/products/productImage.ejs'),{'product':product,'userLogin':req.session.userLogged})
        }else{
            res.send("Not found");
        }
    },

    slider : (req,res) => {
        res.render(path.join(__dirname,'../views/partials/slider.ejs'))
    },

    panelAdmin : (req,res) => {
        Productos.findAll()
        .then(productos => {
            res.render(path.join(__dirname,'../views/admin/panelAdminProducts.ejs'),{'productos':productos,'userLogin':req.session.userLogged})
        })
        
    },

    Añadir : async (req,res) => {

        const productoElegidoId = parseInt(req.body.idProducto) //OK

        const product = await Productos.findByPk(productoElegidoId); //OK

        // const productosDetalle = await Detalle.findAll();

        const productosDetalle = await Detalle.findOne({
            where:{
                id_producto : productoElegidoId,
                id_carrito : req.session.userLogged.id_usuario
            }
        });
        
        console.log(productosDetalle)


        if(productosDetalle){
            Detalle.update(
                {
                    id_producto: productoElegidoId,
                    subtotal: product.precio_unidad * req.body.cantidadDetalle,
                    cantidad: req.body.cantidadDetalle,
                    id_carrito: req.session.userLogged.id_usuario ,
                    productosIdProducto : productoElegidoId,
                    carritoIdCarrito : req.session.userLogged.id_usuario
                },
                {
                    where:{id_producto : productoElegidoId}
                }
            )
            .then(()=> {
                
                return res.redirect(`/products/${productoElegidoId}`)})
                // alert("Producto actualizado en el carrito")            
            .catch(error => res.send(error))
            
        }else{
            Detalle.create(
                {
                    id_producto: productoElegidoId,
                    subtotal: product.precio_unidad * req.body.cantidadDetalle,
                    cantidad: req.body.cantidadDetalle,
                    id_carrito: req.session.userLogged.id_usuario ,
                    productosIdProducto : productoElegidoId,
                    carritoIdCarrito : req.session.userLogged.id_usuario
                }
            )
            .then(()=> {
                
                return res.redirect('/products')}) 
                // alert("Producto nuevo agregado al carrito")
            .catch(error => res.send(error))
        }
    },

    ActualizarCarrito : async (req,res) => {
        
        let productoArray = []
        let precioUnidadArray = []
        let cantidadProductoArray = []

        let producto = req.body.idProducto
        let precioUnidad = req.body.precioUnidad 
        let cantidadProducto = req.body.cantidadArticulo
        
        productoArray.push(producto)
        precioUnidadArray.push(precioUnidad)
        cantidadProductoArray.push(cantidadProducto)

        console.log(producto)
        console.log(precioUnidad)

        // console.log(productoArray)
        // console.log(precioUnidadArray.length)
        // console.log(cantidadProductoArray.length)

        if(Array.isArray(producto) && Array.isArray(precioUnidad)  && Array.isArray(cantidadProducto)){

            console.log("caso 1")

            let [...idProducto_a] = producto
            let [...precioUnidad_a] = precioUnidad
            let [...cantidadArticulo_a] = cantidadProducto

            var idProducto_b = idProducto_a.map(function (x) { 
                return parseInt(x); 
            });

            console.log(idProducto_b)
    
            var precioUnidad_b = precioUnidad_a.map(function (x) { 
                return parseInt(x); 
            });
            var cantidadArticulo_b = cantidadArticulo_a.map(function (x) { 
                return parseInt(x); 
            });
            
            let idPersona = req.session.userLogged.id_usuario
    
    
            Detalle.sequelize.transaction(function(t){
                var Promises=[];
                for(var i = 0 ; i<idProducto_b.length;i++)
                {
                    var newPromise=Detalle.update({
                        cantidad:cantidadArticulo_b[i],
                        subtotal : cantidadArticulo_b[i] * precioUnidad_b[i] 
                    },            
                    {
                        transaction: t,
                        where:{id_producto : idProducto_b[i]}
                    });
                    Promises.push(newPromise);
                };
                return Promise.all(Promises).then(()=> {
                    
                    return res.redirect('/cart')})
                    .catch(error => res.send(error))
                })
        }else{

            console.log("caso 2")

            let idProducto_b = parseInt(producto)
            let precioUnidad_b = parseInt(precioUnidad)
            let cantidadArticulo_b = parseInt(cantidadProducto)

            console.log(idProducto_b)
            console.log(precioUnidad_b)
            console.log(cantidadArticulo_b)


            let idPersona = req.session.userLogged.id_usuario

            Detalle.update({
                cantidad:cantidadArticulo_b,
                subtotal : cantidadArticulo_b * precioUnidad_b 
            },            
            {
                where:{id_producto : idProducto_b}
            })
            .then(()=> {
                
                return res.redirect('/cart')})
                    .catch(error => res.send(error))
        }

        },
        cartDelete : async (req,res) =>{

            let idPersona = req.session.userLogged.id_usuario
        
            try {
                await Detalle.destroy({
                    where: {
                        id_producto : req.params.id,
                        id_carrito : idPersona
                    }
                });
                res.redirect('/cart');
            } catch (error) {
                res.send(error);
            }
        }
        
}
module.exports = controller;



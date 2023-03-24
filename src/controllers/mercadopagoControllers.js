const path = require("path");

const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const Categorias = db.Categorias

const Productos = db.Productos

const Detalle = db.Detalle_Orden

const Carrito = db.Carrito


// SDK de Mercado Pago
const mercadopago = require("mercadopago");
// Agrega credenciales
mercadopago.configure({
 access_token: "TEST-1923087466888785-032118-c8ebcec38945180051f4420866b43b77-1335888901",
});




const controller = {
    prueba: (req, res) => {
    res.render(path.join(__dirname,'../views/mercadopago/prueba.ejs'),{'userLogin':req.session.userLogged})
    },

    compra: (req, res) => {
        
    // Crea un objeto de preferencia
    let preference = {
        items: [
        {
            title: req.body.title,
            unit_price: parseInt(req.body.price),
            quantity: 1,
        },
        {
            title: req.body.title,
            unit_price: parseInt(req.body.price),
            quantity: 1,
        },
        
        ],
    };

    mercadopago.preferences
    .create(preference).then(function (response) {
        res.redirect(response.body.init_point);
      // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
    })
    .catch(function (error) {
    console.log(error);
    });
        }   
        
    ,

    compraOriginal: async (req, res) => {

        let userId = req.session.userLogged.id_usuario

        const productosCompra = await Detalle.findAll({
            include:[
                {
                    model: Carrito, as :"carrito", where : {'id_carrito': userId} , attributes: []
                },
                {
                    model: Productos, as :"productos", attributes:['nombre','precio_unidad','imagen','id_producto']
                }
            ]
        })

        // console.log(productosCompra[1].productos.dataValues.nombre)
        // console.log(productosCompra[1].productos.dataValues.precio_unidad)
        // console.log(productosCompra[1].dataValues.cantidad)

        var compraFinal = []
        for(var i = 0 ; i<productosCompra.length;i++)
        {
            let comprasFor = {
                            title: productosCompra[i].productos.dataValues.nombre,
                            unit_price:productosCompra[i].productos.dataValues.precio_unidad,
                            quantity: productosCompra[i].dataValues.cantidad
                        }

            compraFinal.push(comprasFor)        
        }

        console.log(compraFinal)

        // Crea un objeto de preferencia
    let preference = {
        items: compraFinal,
        shipments:{
                "cost": 600,
                "mode": "not_specified",
        },
        statement_descriptor: "Vraiklat",
        back_urls: {
            "success": "http://localhost:3030",
            "failure": "http://localhost:3030/cart",
            "pending": "http://localhost:3030/cart"
        }
    };

    mercadopago.preferences
    .create(preference).then(function (response) {
        res.redirect(response.body.init_point);
      // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
    })
    .catch(function (error) {
    console.log(error);
    });
        }  
        
        



};


module.exports = controller;
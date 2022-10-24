const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const e = require('express');
const { promiseImpl } = require('ejs');

const Productos = db.Productos

const controller = {
    listProducts : async (req,res) =>{
        const products = await Productos.findAll({
            attributes: ['id_producto', 'nombre' ,'descripcion','precio_unidad','imagen']  
            // [['id_usuario', 'id'], ['nombre', 'name'] ,'email'] 
        })

        const alfajoresCount  =  await Productos.count({
            where: {
                CategoriasId: 1
            }
        })

        const mermeladasCount  =  await Productos.count({
            where: {
                CategoriasId: 2
            }
        })
        const heladosCount  =  await Productos.count({
            where: {
                CategoriasId: 3
            }
        })
        const bombonesCount  =  await Productos.count({
            where: {
                CategoriasId: 4
            }
        })
        const tabletasCount  =  await Productos.count({
            where: {
                CategoriasId: 6
            }
        })
        Promise.all([products,alfajoresCount,mermeladasCount,heladosCount,bombonesCount,tabletasCount])
        .then(([products,alfajoresCount,mermeladasCount,heladosCount,bombonesCount,tabletasCount]) => {

            const productsMap = products.map(e => {
                return {
                    id : e.id_producto,
                    name : e.nombre,
                    description : e.descripcion,
                    price : e.precio_unidad,
                    relation : ['CategoriasId',['id_carrito','id_producto']],
                    detail : `/img/product/${e.imagen}`
                }
            })

            

            console.log(alfajoresCount)

            // Agregar countByCategory → objeto literal con una propiedad por categoría con el total de productos. al return
                return res.status(200).json({
                            count : products.length,
                            countByCategory : {
                                alfajores: alfajoresCount,
                                mermeladas: mermeladasCount,
                                helados: heladosCount,
                                bombones: bombonesCount,
                                tabletas: tabletasCount,

                            },
                            products : productsMap,
                            status : 200
                        })
        })
    }
    
    ,
    detalleProducto : async (req,res) =>{
        let products = await Productos.findByPk(req.params.id)
        .then(products => {        
            return res.status(200).json({
                count : products.length,
                products : {
                    id : products.id_producto,
                    name : products.nombre,
                    description : products.descripcion,
                    price : products.precio_unidad,
                    discount : products.descuento,
                    image : `/img/product/${products.imagen}`,
                    stock : products.stock,
                    CategoriasId : products.CategoriasId,
                    relation : ['CategoriasId',['id_carrito','id_producto']]
                } ,
                status : 200
            })
        })
        //un array por cada relación de uno a muchos (categories, colors,sizes, etc).
    }
    ,
}

module.exports = controller
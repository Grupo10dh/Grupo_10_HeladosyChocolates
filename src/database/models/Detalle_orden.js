module.exports = (sequelize, dataTypes) =>{

    const alias="Detalle_Orden"

    const cols ={
        id_detalle:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        id_producto:{
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        subtotal:{
            type: dataTypes.DOUBLE,
            allowNull: false
        },

        cantidad: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        id_carrito:{
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        productosIdProducto:{
            type: dataTypes.STRING(45)
        },

        carritoIdCarrito :{
            type: dataTypes.STRING(45)
        }
    }

    const config={
        tableName: 'detalle_orden',
        timestamps: false
    }

    const Detalle_Orden = sequelize.define(alias, cols, config)

    Detalle_Orden.associate = (models)=>{

        Detalle_Orden.belongsTo(models.Productos, {
            as:"productos",
            foreignkey: "id_producto"
        }),
        
        Detalle_Orden.belongsTo(models.Carrito, {
            as:"carrito",
            foreignkey: "id_carrito"
        })


    }
    
    return Detalle_Orden

}




// module.exports = (sequelize, dataTypes) => {
//     const Detalle_Orden = sequelize.define('Detalle_Orden', {
//         id_detalle:{
//                         type: dataTypes.INTEGER,
//                         primaryKey: true,
//                         autoIncrement: true,
//                         allowNull: false
//                     },
//         id_producto:{
//                         type: dataTypes.INTEGER,
//                         allowNull: false,
//                     },
//         subtotal:{
//                         type: dataTypes.DOUBLE,
//                         allowNull: false
//                     },
//         cantidad: {
//                         type: dataTypes.INTEGER,
//                         allowNull: false
//                     },
//         id_carrito:{
//                         type: dataTypes.INTEGER,
//                         allowNull: false,
//                     }
//     }, {
//         tableName: 'categorias',
//         timestamps: false
//     });

//     Categorias.associate = (models) => {
//         Categorias.hasMany (models.Productos, {
//             as: 'Productos',
//             foreingKey: 'CategoriasId'        
//         })
//     }

//     return Detalle_Orden;
// }
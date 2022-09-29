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
    }

    const config={
        tableName: 'categorias',
        timestamps: false
    }

    const Detalle_Orden = sequelize.define(alias, cols, config)

    return Detalle_Orden
}





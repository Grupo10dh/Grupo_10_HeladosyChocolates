module.exports = (sequelize, dataTypes) =>{

    const alias = "Carrito"

    const cols = {
        id_carrito:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        id_usuario:{
            type: dataTypes.INTEGER,
            allowNull: false,
        },

        total:{
            type: dataTypes.FLOAT(7,2),
            allowNull: false
        },

    }

    const config = {
        tableName: 'carrito',
        timestamps: false
    }

    const Carrito = sequelize.define(alias, cols, config);

    
    Carrito.associate = function(models){
    /* Carrito.hasMany(models.Usuario, {
            as : "usuario",
            foreignkey: "usuario_id"
        })
        */

    /* Carrito.belongsToMany(models.Producto, { 
            as: "Productos",
            through: 'Detalle_Orden',
            foreignKey: 'id_carrito',
            otherKey: 'id_producto',
            timestamps: false
        })*/
    }


    return Carrito
}


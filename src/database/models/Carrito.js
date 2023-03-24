module.exports = (sequelize, dataTypes) =>{

    const alias = "Carrito"

    const cols = {
        id_carrito:{
            type: dataTypes.INTEGER.UNSIGNED,
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
    

        Carrito.belongsToMany(models.Productos, { 
            as: "Productos",
            through: 'Detalle_orden',
            foreignKey: 'id_carrito',
            otherKey: 'id_producto',
            timestamps: false
        })
    }

    return Carrito
}
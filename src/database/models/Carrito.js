module.exports = (sequelize, dataTypes) =>{
    const Carrito = sequelize.define("Carrito",{
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        total:{
            type: dataTypes.FLOAT(7,2)
        },

    },
    {
        tableName: 'carrito',
        timestamps: false
    });
    Carrito.associate = function(models){
        Carrito.hasMany(models.Usuario, {
            as : "usuario",
            foreignkey: "usuario_id"
        })

        Carrito.belongsToMany(models.Producto, { 
            as: "Productos",
            through: 'Detalle_Orden',
            foreignKey: 'carrito_id',
            otherKey: 'producto_id',
            timestamps: false
        })
    }
    return Carrito
}

//agregar relacion usuario_id
module.exports = (sequelize, dataTypes) =>{
    const Producto = sequelize.define("Producto",{
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        nombre:{
            type: dataTypes.STRING(45),
            allowNull: false
        },

        descripcion: {
            type: dataTypes.STRING(200),
            allowNull: false
        },

        precio_unidad: {
            type: dataTypes.INTEGER
        },

        descuento_id: {
            type: dataTypes.INTEGER(100)
        },

        imagen:{
            type: dataTypes.STRING(100)
        },

        stock:{
            type: dataTypes.INTEGER(1000)
        },

    },
    {
        tableName: 'productos',
        timestamps: false
    });
    Producto.associate = function(models){
        Producto.hasMany(models.Categoria, {
            as : "categorias",
            foreignkey: "Categorias_id"
        })

        Producto.belongsToMany(models.Carrito, { 
            as: "Carrito",
            through: 'Detalle_Orden',
            foreignKey: 'producto_id',
            otherKey: 'carrito_id',
            timestamps: false
        })
    }
    return Producto
}

//agregar relacion categorias_id
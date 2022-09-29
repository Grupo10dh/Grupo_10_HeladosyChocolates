module.exports = (sequelize, dataTypes) =>{

    const alias = "Producto";

    
    const cols ={
        id_producto:{
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
            type: dataTypes.INTEGER,
            allowNull: false
        },

        descuento: {
            type: dataTypes.TINYINT
        },

        imagen:{
            type: dataTypes.STRING(100)
        },

        stock:{
            type: dataTypes.INTEGER(1000)
        },

        id_categoria:{
            type: dataTypes.INTEGER(10),
            allowNull: false
        }
    };

    const config={
            tableName: 'productos',
            timestamps: false
    }

    const Producto = sequelize.define(alias, cols, config);

    Producto.associate = (models)=>{

        Producto.hasMany(models.Categoria, {
            as:"categorias",
            foreignkey: "id_categoria"
        })

        /*Producto.belongsToMany(models.Carrito, { 
            as: "Carrito",
            through: 'Detalle_Orden',
            foreignKey: 'id_producto',
            otherKey: 'id_carrito',
            timestamps: false
        })*/
    }

    return Producto

}



// module.exports = (sequelize, dataTypes) =>{

//     const alias = "Producto";

    
//     const cols ={

//         id_producto:{
//             type: dataTypes.INTEGER.UNSIGNED,
//             primaryKey: true,
//             autoIncrement: true,
//             allowNull: false,
//         },

//         nombre:{
//             type: dataTypes.STRING(45),
//             allowNull: false
//         },

//         descripcion: {
//             type: dataTypes.STRING(200),
//             allowNull: false
//         },

//         precio_unidad: {
//             type: dataTypes.INTEGER,
//             allowNull: false
//         },

//         descuento: {
//             type: dataTypes.TINYINT
//         },

//         imagen:{
//             type: dataTypes.STRING(100)
//         },

//         stock:{
//             type: dataTypes.INTEGER
//         },

//         id_categoria:{
//             type: dataTypes.INTEGER(10).UNSIGNED,
//         }
//     };

//     const config={
//             tableName: 'productos',
//             timestamps: false
//     }

//     const Producto = sequelize.define(alias, cols, config);

//     Producto.associate = (models)=>{

//         Producto.belongsTo(models.Categoria, {
//             as:"categorias",
//             foreignkey: "id_categoria"
//         });







//         /*Producto.belongsToMany(models.Carrito, { 
//             as: "Carrito",
//             through: 'Detalle_Orden',
//             foreignKey: 'id_producto',
//             otherKey: 'id_carrito',
//             timestamps: false
//         });*/
// }

//     return Producto;

// }


module.exports = (sequelize, DataTypes) => {    
    const Productos = sequelize.define('Productos', {
        id_producto:{
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        nombre:{
            type: DataTypes.STRING(45),
            allowNull: false
        },

        descripcion: {
            type: DataTypes.STRING(200),
            allowNull: false
        },

        precio_unidad: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        descuento: {
            type: DataTypes.TINYINT
        },

        imagen:{
            type: DataTypes.STRING(100)
        },

        stock:{
            type: DataTypes.INTEGER
        },

        CategoriasId:{
            type: DataTypes.INTEGER(10).UNSIGNED,
        },

        CategoriaId :{
            type: DataTypes.STRING(45)
        }

    },      {   tableName: 'productos',    
                timestamps: false  })

    Productos.associate = (models) => {     
        
        Productos.belongsTo (models.Categorias, 
        { as: 'Categorias',            
        foreingKey: 'CategoriasId'})        
        
}        

return Productos;

}




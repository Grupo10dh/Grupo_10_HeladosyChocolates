// module.exports = (sequelize, dataTypes) =>{

//     const alias = "Categoria"

//     const cols = {
//         id:{
//             type: dataTypes.INTEGER.UNSIGNED,
//             primaryKey: true,
//             autoIncrement: true,
//             allowNull: false
//         },

//         nombre_categoria:{
//             type: dataTypes.STRING(45),
//             allowNull: false
//         },
//     }

//     const config = {
//         tableName: 'categorias',
//         timestamps: false
//     }

//     const Categoria = sequelize.define(alias, cols, config);

//     Categoria.associate = (models) => {

//         Categoria.hasMany(models.Producto, {
//             as : 'productos',
//         })

//     }

//     return Categoria
// }


module.exports = (sequelize, dataTypes) => {
    const Categorias = sequelize.define('Categorias', {
        id:{
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
            },
            
            nombre_categoria:{
            type: dataTypes.STRING(45),
            allowNull: false
            },
    }, {
        tableName: 'categorias',
        timestamps: false
    });

    Categorias.associate = (models) => {
        Categorias.hasMany (models.Productos, {
            as: 'Productos',
            foreingKey: 'CategoriasId'        
        })
    }

    return Categorias;
}

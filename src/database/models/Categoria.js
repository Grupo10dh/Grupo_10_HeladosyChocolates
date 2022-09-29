module.exports = (sequelize, dataTypes) =>{

    const alias = "Categoria"

    const cols = {
        id_categoria:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        nombre_categoria:{
            type: dataTypes.STRING(45),
            allowNull: false
        },
    }

    const config = {
        tableName: 'categorias',
        timestamps: false
    }

    const Categoria = sequelize.define(alias, cols, config);

    Categoria.associate = function(models){
        Categoria.belongsTo(models.Producto, {
            as : 'productos',
            foreignkey: 'id_categoria'
        })
    }

    return Categoria
}

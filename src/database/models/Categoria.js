module.exports = (sequelize, dataTypes) =>{
    const Categoria = sequelize.define("Categoria",{
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        alfajor:{
            type: dataTypes.STRING(45)
        },

        chocolate: {
            type: dataTypes.STRING(45)
        },

        helado: {
            type: dataTypes.STRING(45)
        },

        mermelada: {
            type: dataTypes.STRING(45)
        },

    },
    {
        tableName: 'categorias',
        timestamps: false
    });
    Categoria.associate = function(models){
        Categoria.belongsTo(models.Producto, {
            as : "productos",
            foreignkey: "Categorias_id"
        })
    }
    return Categoria
}

//agregar relacion producto_id

//agregar relacion carrito_id
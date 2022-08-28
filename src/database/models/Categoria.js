module.exports = (sequelize, dataTypes) =>{
    const Movie = sequelize.define("Usuario",{
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        alfajor:{
            type: dataTypes.STRING
        },

        chocolate: {
            type: dataTypes.INTEGER
        },

        helado: {
            type: dataTypes.INTEGER
        },

        mermelada: {
            type: dataTypes.DATE
        },

    },
    {
        tableName: 'categorias',
        timestamps: false
    });
}

//agregar relacion producto_id

//agregar relacion carrito_id
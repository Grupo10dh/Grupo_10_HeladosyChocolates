module.exports = (sequelize, dataTypes) =>{
    const Movie = sequelize.define("Usuario",{
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        nombre:{
            type: dataTypes.STRING
        },

        descripcion: {
            type: dataTypes.INTEGER
        },

        precio_unidad: {
            type: dataTypes.INTEGER
        },

        descuento_id: {
            type: dataTypes.DATE
        },

        imagen:{
            type: dataTypes.INTEGER
        },

        stock:{
            type: dataTypes.INTEGER
        },

    },
    {
        tableName: 'productos',
        timestamps: false
    });
}

//agregar relacion categorias_id
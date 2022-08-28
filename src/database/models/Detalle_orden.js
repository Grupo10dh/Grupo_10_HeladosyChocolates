module.exports = (sequelize, dataTypes) =>{
    const Movie = sequelize.define("Usuario",{
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        subtotal:{
            type: dataTypes.STRING
        },

        cantidad: {
            type: dataTypes.INTEGER
        },
    },
    {
        tableName: 'categorias',
        timestamps: false
    });
}


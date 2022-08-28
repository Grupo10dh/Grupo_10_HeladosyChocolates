module.exports = (sequelize, dataTypes) =>{
    const Movie = sequelize.define("Usuario",{
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        total:{
            type: dataTypes.INTEGER
        },

    },
    {
        tableName: 'carrito',
        timestamps: false
    });
}

//agregar relacion usuario_id
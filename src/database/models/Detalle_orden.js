module.exports = (sequelize, dataTypes) =>{
    const Detalle_Orden = sequelize.define("Detalle_Orden",{
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        
        },

        subtotal:{
            type: dataTypes.DOUBLE,
            allowNull: false
        },

        cantidad: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
    },
    {
        tableName: 'categorias',
        timestamps: false
    });

    return Detalle_Orden
}


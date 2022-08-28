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

        apellido: {
            type: dataTypes.INTEGER
        },

        usuario: {
            type: dataTypes.INTEGER
        },

        email: {
            type: dataTypes.DATE
        },

        telefono:{
            type: dataTypes.INTEGER
        },

        contraseña:{
            type: dataTypes.INTEGER
        },

        ciudad:{
            type: dataTypes.INTEGER
        },

        fecha_de_nacimiento:{
            type: dataTypes.INTEGER
        },

        foto_de_perfil:{
            type: dataTypes.INTEGER
        },
    },
    {
        tableName: 'usuarios',
        timestamps: false
    });
}
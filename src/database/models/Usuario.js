module.exports = (sequelize, dataTypes) =>{

    const alias = "Usuario";

    const cols ={
        id_usuario:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },

        nombre:{
            type: dataTypes.STRING(100),
            allowNull: false
        },

        apellido: {
            type: dataTypes.STRING(100)
        },

        usuario: {
            type: dataTypes.STRING(100),
            allowNull: false
        },

        email: {
            type: dataTypes.STRING(100)
            
        },

        telefono:{
            type: dataTypes.STRING(45)
        },

        contraseña:{
            type: dataTypes.STRING(200),
            allowNull: false,
        },

        ciudad:{
            type: dataTypes.STRING(45)
        },

        fecha_de_nacimiento:{
            type: dataTypes.DATEONLY,
        },

        foto_de_perfil:{
            type: dataTypes.STRING(100)
        },

        admin:{
            type: dataTypes.STRING(45)
        }
    }

    const config={
        tableName: 'usuarios',
        timestamps: false
    }

    const Usuario = sequelize.define(alias, cols, config);


    Usuario.associate = (models)=>{
        
       /* 
        Usuario.belongsTo(models.Carrito, {
            as : "carrito",
            foreignkey: "usuario_id"
        })*/
    }

    return Usuario
}


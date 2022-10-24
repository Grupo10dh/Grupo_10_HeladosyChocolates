const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const Usuario = db.Usuario

const controller = {
    listUsers : (req,res) => {
        db.Usuario.findAll({
            attributes: ['id_usuario', 'nombre' ,'email']  
            // [['id_usuario', 'id'], ['nombre', 'name'] ,'email'] 
        })
        .then(users => {

            const usersMap = users.map(e => {
                return {
                    id : e.id_usuario,
                    name : e.nombre,
                    email : e.email,
                    detail : `/users/detail/${e.id_usuario}`
                }
            })
                return res.status(200).json({
                            count : users.length,
                            users : usersMap,
                            status : 200
                        })
        })
    },

    detalleUsuario : async (req,res) =>{
        let users = await Usuario.findByPk(req.params.id)
        .then(users => {        
            return res.status(200).json({
                count : users.length,
                users : {
                    id : users.id_usuario,
                    name : users.nombre,
                    lastname : users.apellido,  
                    username : users.usuario,
                    email : users.email,
                    phone : users.telefono,
                    city : users.ciudad,
                    date : users.fecha_de_nacimiento,
                    image : `/img/users/${users.foto_de_perfil}`,
                } , 
                status : 200
            })
        })
    }
}

module.exports = controller
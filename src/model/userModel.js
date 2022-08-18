const path = require ('path')

const fs = require ('fs')

const jsonPath = path.join(__dirname,'../data/users.json');

const users = JSON.parse(fs.readFileSync(jsonPath,'utf-8'));


const userModel = {
    findByPk: (id) => {
        return users.find((element) => element.id == id);
    },

    findByField: (field, text) => {
        return users.find((element) => element[field] == text);
    }
}

module.exports = userModel
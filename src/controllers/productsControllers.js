const path = require ('path')

const controller = {
    productList : (req,res) => {
        res.render(path.join(__dirname,'../views/products/listProducts.ejs'))
    },
    productForm : (req,res) => {
        res.render(path.join(__dirname,'../views/products/formProducts.ejs'))
    }
}

module.exports = controller;
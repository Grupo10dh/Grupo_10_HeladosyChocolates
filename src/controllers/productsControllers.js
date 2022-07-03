const path = require ('path')

const controller = {
    productList : (req,res) => {
        res.render(path.join(__dirname,'../views/products/listProducts.ejs'))
    },
    cart : (req,res) => {
        res.render(path.join(__dirname,'../views/products/productCart.ejs'))
    },
    productDetail : (req,res) => {
        res.render(path.join(__dirname,'../views/products/productDetail.ejs'))
    }
}

module.exports = controller;
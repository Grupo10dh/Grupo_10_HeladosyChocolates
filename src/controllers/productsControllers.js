const path = require ('path')

const fs = require ('fs')

const jsonPath = path.join(__dirname,'../data/products.json');

const json = JSON.parse(fs.readFileSync(jsonPath,'utf-8'));

const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const Producto = db.Producto

const controller = {
    productList : (req,res) => {

        db.Producto.findAll()
        .then(productos => {
            res.render(path.join(__dirname,'../views/products/listProducts.ejs'),{'productos':productos,'userLogin':req.session.userLogged})
        })
        //res.render(path.join(__dirname,'../views/products/listProducts.ejs'),{'json':json,'userLogin':req.session.userLogged})
    },
    cart : (req,res) => {
        res.render(path.join(__dirname,'../views/products/productCart.ejs'),{'userLogin':req.session.userLogged})
    },
    productDetail : (req,res) => {
        const id = req.params.id;
        const product = json.find((e) => e.id == parseInt(id))
        if(product){
        res.render(path.join(__dirname,'../views/products/productDetail.ejs'),{'product':product,'userLogin':req.session.userLogged})
        }else{
            res.send("Not found");
        }
    },
    productForm : (req,res) => {
        res.render(path.join(__dirname,'../views/products/formProducts.ejs'))
    },
    productCreate : (req,res) => {
        Producto
        .create(
            {
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                precio_unidad: req.body.precio,
                descuento_id : "",
                imagen: req.file ? req.file.filename : "",
                stock: "" ,
                Categorias_id : req.body.categoria
            }
        )
        .then(()=> {
            return res.redirect('/products')})            
        .catch(error => res.send(error))
        // const newEnOferta = req.body.enOferta
        // const newDescripcion = req.body.descripcion
        // const newFotoProducto = req.file ? req.file.filename : ""
        // const newCategoria = req.body.categoria
        // const newPrecio = req.body.precio
        // const newNombre = req.body.nombre

        // const id = json.length;
        // const newId = id + 1

        // const obj = {
        //     id: newId,
        //     name: newNombre,
        //     description: newDescripcion,
        //     price: newPrecio,
        //     discount: newEnOferta,
        //     category: newCategoria,
        //     image: newFotoProducto
        // }

        // json.push(obj)

        // fs.writeFile(jsonPath,JSON.stringify(json),(error) => {
        //     if(error){
        //         res.send(error);
        //     }else{
        //         res.redirect('/products');
        //     }
        // })
    },
    productEdit : async (req,res) =>{

            const product = await Producto.findByPk(req.params.id);
            if(product){
                res.render(path.join(__dirname,'../views/products/formProductsEdit.ejs'),{'detalle':product,'userLogin':req.session.userLogged})
            }else{
                res.send("Not found");
            }
        
        // const product = json.find((e) => e.id == parseInt(id))
        // if(product){
        // res.render(path.join(__dirname,'../views/products/formProductsEdit.ejs'),{'detalle':product,'userLogin':req.session.userLogged})
        // }else{
        //     res.send("Not found");
        // }
    },
    productEditConfirm : (req,res) => { 
        const newId = req.body.id
        const newEnOferta = req.body.enOferta
        const newDescripcion = req.body.descripcion
        const newFotoProducto = req.file ? req.file.filename : ""
        const newCategoria = req.body.categoria
        const newPrecio = req.body.precio
        const newNombre = req.body.nombre

        json.forEach(element => {
            if(element.id === parseInt(newId)){
                element.id = parseInt(newId);
                element.name = newNombre;
                element.description = newDescripcion;
                element.price = newPrecio;
                element.category = newCategoria;
                element.discount = newEnOferta
                element.image = newFotoProducto

            }
        });

        fs.writeFile(jsonPath,JSON.stringify(json),(error) => {
            if(error){
                res.send(error);
            }else{
                res.redirect('/products');
            }
        }) 
        
    },
    productDelete : (req,res) =>{
        console.log(req.params.id)
        const id = req.params.id
        const productFiltrado = json.filter( e=> e.id != parseInt(id))

        /*res.send(productFiltrado)*/
        
        fs.writeFile(jsonPath,JSON.stringify(productFiltrado), (error)=>{
            if(error){
                res.send("Error " + error);
            }else{
                res.redirect('/products-admin');
            }
        });

    },
    productListAdmin : (req,res) => {
        res.render(path.join(__dirname,'../views/products/listProductsAdmin.ejs'),{'json':json,'userLogin':req.session.userLogged})
    }

}

module.exports = controller;


/*
1. /products (GET)
Listado de productos
2. /products/create (GET)
Formulario de creación de productos
3. /products/:id (GET)
Detalle de un producto particular
4. /products (POST)
Acción de creación (a donde se envía el formulario)
5. /products/:id/edit (GET)
Formulario de edición de productos
6. /products/:id (PUT)
Acción de edición (a donde se envía el formulario):
7. /products/:id (DELETE)
Acción de borrado*/


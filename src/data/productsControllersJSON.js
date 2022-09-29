/*const path = require ('path')

const fs = require ('fs')

const jsonPath = path.join(__dirname,'../data/products.json');

const json = JSON.parse(fs.readFileSync(jsonPath,'utf-8'));



const controller = {
    productList : (req,res) => {
        res.render(path.join(__dirname,'../views/products/listProducts.ejs'),{'json':json,'userLogin':req.session.userLogged})
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
        const newEnOferta = req.body.enOferta
        const newDescripcion = req.body.descripcion
        const newFotoProducto = req.file ? req.file.filename : ""
        const newCategoria = req.body.categoria
        const newPrecio = req.body.precio
        const newNombre = req.body.nombre

        const id = json.length;
        const newId = id + 1

        const obj = {
            id: newId,
            name: newNombre,
            description: newDescripcion,
            price: newPrecio,
            discount: newEnOferta,
            category: newCategoria,
            image: newFotoProducto
        }

        json.push(obj)

        fs.writeFile(jsonPath,JSON.stringify(json),(error) => {
            if(error){
                res.send(error);
            }else{
                res.redirect('/products');
            }
        })
    },
    productEdit : (req,res) =>{
        const id = req.params.id;
        const product = json.find((e) => e.id == parseInt(id))
        if(product){
        res.render(path.join(__dirname,'../views/products/formProductsEdit.ejs'),{'detalle':product,'userLogin':req.session.userLogged})
        }else{
            res.send("Not found");
        }
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

        /*res.send(productFiltrado)
        
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
*/
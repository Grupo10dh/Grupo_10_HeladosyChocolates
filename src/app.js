const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const multer = require('multer')
const session = require('express-session');
const path = require("path")
const cors = require('cors')


const app = express();

//settings

app.set('port', 3030 || process.env.PORT )





//Middlewares

app.use(express.json());
app.use(express.static(path.join(__dirname,'../public')))
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: "Secreto",
    resave: false,
    saveUninitialized: false
}))
app.use(cors())


// Variables Globales


// Routes

const routerMain = require('./routes/main')
const routerUsers = require('./routes/users')
const routerProduct = require('./routes/products')
const routerAdmin = require('./routes/admin')
const routerUsersApi = require('./routes/api/usersApi')
const routerProductsApi = require('./routes/api/productsApi')

app.use(routerMain)
app.use(routerProduct)
app.use(routerUsers)
app.use(routerAdmin)
app.use(routerProductsApi)
app.use(routerUsersApi)



// Public


// Starting the server

app.listen(app.get('port'), () =>{
    console.log("Server on port", app.get("port"));
})













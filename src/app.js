const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const multer = require('multer')
const session = require('express-session');
const path = require("path")

const app = express();

const routerMain = require('./routes/main')
const routerUsers = require('./routes/users')
const routerProduct = require('./routes/products')

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


app.use(routerUsers)
app.use(routerMain)
app.use(routerProduct)

app.listen('3030', () => console.log("Servidor funcionando en puerto 3030"));
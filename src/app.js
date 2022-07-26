const express = require('express');

const app = express();

const methodOverride = require('method-override');
const morgan = require('morgan');
const multer = require('multer')

const path = require("path")

app.use(express.static(path.join(__dirname,'../public')))
app.set('view engine', 'ejs');


const routerMain = require('./routes/main')
const routerUsers = require('./routes/users')
const routerProduct = require('./routes/products')

app.use(express.json());


app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: false}));



app.use(routerUsers)
app.use(routerMain)
app.use(routerProduct)

app.listen(3030, () => console.log("Servidor funcionando en puerto 3030"));
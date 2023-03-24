const path = require ('path')

const fs = require ('fs')

const jsonPath = path.join(__dirname,'../data/products.json');

const json = JSON.parse(fs.readFileSync(jsonPath,'utf-8'));

const {validationResult} = require('express-validator');

const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const Categorias = db.Categorias

const Productos = db.Productos

    
// import {DB_HOST,DB_NAME,DB_PASSWORD,DB_PORT,DB_USER} from "./config.js"

const {DB_HOST,DB_NAME,DB_PASSWORD,DB_PORT,DB_USER} = require("./config.js")

module.exports = {
  "development": {
    "username": "root",
    "password": '',
    "database": "grupo10",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": DB_USER,
    "password": DB_PASSWORD,
    "database": DB_NAME,
    "dialect": "mysql",
    "host": DB_HOST,
    "port" : DB_PORT,
  }
}



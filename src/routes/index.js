const express = require('express');

//const pers = process.env.PERS;
const pers = "mysql"; 

let routerProducts;
let routerCart;

switch(pers) {
    case 'memory':
        routerProducts = require('../daos/products/productsDaoMemory');
        routerCart = require('../daos/carts/cartsDaoMemory');
        break;
    case 'file':
        routerProducts = require('../daos/products/productsDaoFile');
        routerCart = require('../daos/carts/cartsDaoFile');
        break;
    case 'mongo':
        routerProducts = require('../daos/products/productsDaoMongoDb');
        routerCart = require('../daos/carts/cartsDaoMongoDb');
        break;
    case 'firebase':
        routerProducts = require('../daos/products/productsDaoFirebase');
        routerCart = require('../daos/carts/cartsDaoFirebase');
        break;
    case 'mysql':
        routerProducts = require('../daos/products/productsDaoMysql');
        routerCart = require('../daos/carts/cartsDaoMysql');
        break;
    default:
        console.log("persistencia no definida");  
}


const router = express.Router();

router.use('/api/productos', routerProducts);
router.use('/api/carrito', routerCart);

module.exports = router;
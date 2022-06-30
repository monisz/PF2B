const express = require('express');

const routerProducts = require('../daos/products/productsDaoMongoDb');
const routerCart = require('../daos/carts/cartsDaoMongoDb');
const router = express.Router();

router.use('/api/productos', routerProducts);
router.use('/api/carrito', routerCart);

module.exports = router;
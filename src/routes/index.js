const express = require('express');

const routerProducts = require('../daos/products/productsDaoMemory');
const routerCart = require('../daos/carts/cartsDaoMemory');
const router = express.Router();

router.use('/api/productos', routerProducts);
router.use('/api/carrito', routerCart);

module.exports = router;
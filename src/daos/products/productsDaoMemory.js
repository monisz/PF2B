const express = require('express');

const router = express.Router();

const Products = require('../../containers/containerMemory');
//const arrayP = require('../../../config');

//console.log("arrayP se supone vacio al entrar en prDaoMem", arrayP)

const arrayProducts = new Products();
console.log("al arrancar en pdM arrProd", arrayProducts)


//Variable para manejo de autorización (configurar en true para administrador
// o false para usuario)
const admin = true;

const isAdmin = (req, res, next) => {
    if (admin === true ) next();
    else res.status(403).send("método no autorizado");
};

//Vista de todos los productos
router.get('/', (req, res) => {
    const entry = JSON.stringify(req.params);
    const getProducts = (async () => {
        const products = await arrayProducts.getAll();
        res.render('main', {products});
    }) ();
});


//Para obtener un producto según su id
router.get('/:id', (req, res) => {
    const getProduct = (async () => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).send({error: "el parámetro no es un número"});
        const product = await arrayProducts.getById(id);
        if (!product) res.status(404).send({error: "producto no encontrado"});
        else {
            const products = [product];
            res.render('main', {products});
        }
    }) ();
});

//Para agregar un producto
router.post('/', isAdmin, (req, res) => {
    const newProduct = req.body;
    newProduct.timestamp = Date.now();
    const getProducts = (async () => {
        const newId = await arrayProducts.save(newProduct);
        res.send('producto agregado');
    }) ();
});

//Recibe y actualiza un producto por id
router.put('/:id', isAdmin, (req, res) => {
    const updateProduct = (async () => {
        const id = parseInt(req.params.id);
        const newProduct = await arrayProducts.replaceById(id, req.body);
            if (!newProduct) res.status(404).send({error: "producto no encontrado"});
            else res.send('producto modificado');
        }) ();
});

//Para borrar un producto según el id
router.delete('/:id', isAdmin, (req, res) => {
    const deleteProduct = (async () => {
        const id = parseInt(req.params.id);
        const result = await arrayProducts.deleteById(id);
        if (!result) res.status(404).send({error: "producto no encontrado"});
        else res.send("producto eliminado");
    }) ();
});


module.exports = router;

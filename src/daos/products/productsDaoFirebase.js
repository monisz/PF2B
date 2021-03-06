const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();
const { Container, colProducts } = require('../../containers/containerFirebase');


//Variable para manejo de autorización (configurar en true para administrador
// o false para usuario)
const adminAuth = true;

const isAdmin = (req, res, next) => {
    if (adminAuth === true ) next();
    else res.status(403).send("método no autorizado");
};

//Vista de todos los productos
router.get('/', (req, res) => {
    const entry = JSON.stringify(req.params);
    const getProducts = (async () => {
        const products = await colProducts.getAll();
        res.render('main', {products});
    }) ();
});


//Para obtener un producto según su id
router.get('/:id', (req, res) => {
    const getProduct = (async () => {
        const doc = await colProducts.getById(req.params.id);
        if (!doc) {
            res.status(404).send({error: "producto no encontrado"});
            console.log("prod no encontrado")
        }
        else {
            const products = [doc]
            res.render('main', {products});
        }
    }) ();
});

//Para agregar un producto
router.post('/', isAdmin, (req, res) => {
    const newProduct = req.body;
    newProduct.timestamp = Date.now();
    const getProducts = (async () => {
        const newId = await colProducts.save(newProduct);
        res.send(`producto agregado, id: ${newId}`);
    }) ();
});

//Recibe y actualiza un producto por id
router.put('/:id', isAdmin, (req, res) => {
    const updateProduct = (async () => {
        const result = await colProducts.replaceById(req.params.id, req.body);
            if (!result) res.status(404).send({error: "producto no encontrado"});
            else res.send('producto modificado');
        }) ();
});

//Para borrar un producto según el id
router.delete('/:id', isAdmin, (req, res) => {
    const deleteProduct = (async () => {
        const result = await colProducts.deleteById(req.params.id);
        if (!result) res.status(404).send({error: "producto no encontrado"});
        else res.send("producto eliminado");
    }) ();
});

module.exports = router;
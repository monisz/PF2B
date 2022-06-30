const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Container = require('../../containers/containerMongoDb');

const productsSchema = new mongoose.Schema({
    title: {type: String, require: true},
    description: {type: String, require: true},
    code: {type: String, require: true},
    thumbnail: {type: String, require: true},
    price: {type: Number, require: true},
    stock: {type: Number, require: true},
    timestamp: {type: Date, require: true},
    id: {type: Number, require: true}
})
const Product = mongoose.model("product", productsSchema);
const colProduct = new Container(Product);


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
        const products = await colProduct.getAll();
        console.log(products[0].title)
        res.render('main', {products});
    }) ();
});


//Para obtener un producto según su id
router.get('/:id', (req, res) => {
    const getProduct = (async () => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).send({error: "el parámetro no es un número"});
        const productFinded = await colProduct.getById(id);
        if (!productFinded) {
            res.status(404).send({error: "producto no encontrado"});
            console.log("prod no encontrado")
        }
        else {
            console.log(productFinded)
            const product = [productFinded]
            res.render('main', {product});
        }
    }) ();
});

//Para agregar un producto
router.post('/', isAdmin, (req, res) => {
    const newProduct = req.body;
    newProduct.timestamp = Date.now();
    const getProducts = (async () => {
        const newId = await colProduct.save(newProduct);
        res.send('producto agregado');
    }) ();
});

//Recibe y actualiza un producto por id
router.put('/:id', isAdmin, (req, res) => {
    const updateProduct = (async () => {
        const id = parseInt(req.params.id);
        const newProduct = await colProduct.replaceById(id, req.body);
            if (newProduct.length == 0) res.status(404).send({error: "producto no encontrado"});
            else res.send('producto modificado');
        }) ();
});

//Para borrar un producto según el id
router.delete('/:id', isAdmin, (req, res) => {
    const deleteProduct = (async () => {
        const id = parseInt(req.params.id);
        const result = await colProduct.deleteById(id);
        if (result.deletedCount == 0) res.status(404).send({error: "producto no encontrado"});
        else res.send("producto eliminado");
    }) ();
});


module.exports = Product;
module.exports = router;

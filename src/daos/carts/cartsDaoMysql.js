const express = require('express');
const Knex = require('knex').default;
const router = express.Router();

const { Container, tableProducts, knex } = require('../../containers/containerMysql');

const defTable = (async () => {
    await knex.schema.dropTableIfExists('carts');
    await knex.schema.createTable('carts', table => {
        table.increments('id').primary().notNullable(),
        table.string('timestamp').notNullable(),
        table.foreign('tableProducts')
            .references('tableProducts.id')
    });
    console.log("tabla carritos creada")
}) ;

class Carts extends Container {
    constructor(){
        super('carts');
    }
};
const tableCarts = new Carts();


//Para agregar un carrito
router.post('/', (req, res) => {
    const newCart = {
        timestamp : Date.now()
    };
    const getCart = (async () => {
        const newId = await tableCarts.save(newCart);
        res.send(`carrito agregado id: ${newId}`);
    }) ();
});

//Para borrar un carrito según su id
router.delete('/:id', (req, res) => {
    const deleteCart = (async () => {
        const id = parseInt(req.params.id);
        const result = await tableCarts.deleteById(id);
        if (!result) res.status(404).send({error: "carrito no encontrado"});
        else res.send("carrito eliminado");
    }) ();
});

//Para listar todos los productos de un carrito según su id
router.get('/:id/productos', (req, res) => {
    const getCart = (async () => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).send({error: "el parámetro no es un número"});
        const cart = await tableCarts.getById(id);
        if (cart.length == 0) res.status(404).send({error: "carrito no encontrado"});
        else {
            if(cart.products) res.json(cart.products);
            else res.send("el carrito no tiene productos")
        }
    }) ();
});


//Para agregar un producto al carrito por su id
//el id del producto llega por el body
router.post('/:id/productos', (req, res) => {
    const idCart = parseInt(req.params.id);
    const idProduct = req.body.id;
    const getProduct = (async () => {
        if (isNaN(idProduct)) return res.status(400).send({error: "el parámetro no es un número"});
        const productToAdd = await tableProducts.getById(idProduct);
        if (!productToAdd) res.status(404).send({error: "producto no encontrado"});
        else {
            const getCart = (async () => {
                const cart = await tableCarts.getById(idCart);
                if (cart.length == 0) res.send('error: no existe ese carrito');
                else { cart.products = [...idProduct]
                    const updateCart = (async () => {
                        const cartModified = await tableCarts.replaceById(idCart, cart.products);
                        res.send(`producto id: ${idProduct} agregado en carrito id: ${idCart}`);
                    }) ();
                }
            }) ();
        }
    }) ();
});


//Elimina del carrito id el producto id_prod
router.delete('/:id/productos/:id_prod', (req, res) => {
    const idCart = parseInt(req.params.id);
    const idProduct = parseInt(req.params.id_prod);
    if ( isNaN(idCart) || isNaN(idProduct) ) return res.status(400).send({error: "algún parámetro no es un número"});
    else {
        const getCart = (async () => {
            const cart = await tableCarts.getById(idCart)
            if (!cart) res.send('error: no existe ese carrito');
            else {
                const productFind = cart[0].products.find((elem) => elem.id === idProduct);
                if (!productFind) res.send('error: no existe ese producto en el carrito');
                else {
                    cart[0].products = cart[0].products.filter((elem) => elem.id !== idProduct);
                    const updateCart = (async () => {
                        const cartModified = await tableCarts.replaceById(idCart, cart[0]);
                        console.log("carrito modificado", cartModified[0])
                        res.send(`producto id: ${idProduct} eliminado del carrito id: ${idCart}`);
                    }) ();
                }
            }
        }) ();
    }
});

module.exports = router;


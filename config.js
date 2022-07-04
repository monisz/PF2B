const express = require('express');

const mongoose = require('mongoose');

console.log("DIRECTO", process.env.BASE_DE_DATOS)
//const PERS = process.env.BASE_DE_DATOS;
const pers = "mongo";
//console.log("pers al principio ", PERS)

switch(pers) {
    case 'mongo':
        console.log("está en caso mongo")
        const connectMongoose = async () => {
            await mongoose.connect("mongodb://localhost:27017/ecommercePF")
            console.log("conectados");
        };
        connectMongoose();
        break;
    case 'firebase':
        
        
        break;
    //default:
       // console.log("persistencia no definida");  
}

module.exports = pers;
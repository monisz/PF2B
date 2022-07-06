const firebaseConfig = require('./ecommercepf-c2c29-firebase-adminsdk-b0zqh-2d7faa23d3.json');
const { optionsMysql } = require('./optionsMysql');

module.exports = {
    mongoDb:{
        mongoConfig: 'mongodb://localhost:27017/ecommercePF',
    },
    firebase: {
        firebaseConfig 
    },
    mysql: {
        optionsMysql
    }  
}
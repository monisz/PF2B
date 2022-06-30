const mongoose = require('mongoose');

const arrayP = [];
const arrayC = [];

module.exports = arrayP;
module.exports = arrayC;

const connectMongoose = async () => {
    await mongoose.connect("mongodb://localhost:27017/ecommercePF")
    console.log("conectados");
};

connectMongoose();
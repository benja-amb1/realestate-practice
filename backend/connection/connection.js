const mongoose = require("mongoose");

const connection = async() => {
    try {
        await mongoose.connect("mongodb://localhost:27017/inmobiliariaPedro");
        console.log("Conectado a la BD: inmobiliariaPedro");
    } catch (error) {   
        console.log(error);
        throw new Error('No se ha podido conectar a la BD');
    }
}

module.exports = connection;
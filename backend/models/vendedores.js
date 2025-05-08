const {Schema, model} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const VendedorSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

VendedorSchema.plugin(mongoosePaginate);

module.exports = model('Vendedor', VendedorSchema, 'vendedores');
    
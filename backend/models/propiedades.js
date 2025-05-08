const {Schema, model} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const PropiedadSchema = Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    vendedor: {
        type: Schema.Types.ObjectId,
        ref: 'Vendedor',
        required: true
    },
    imagen: {
        type: String,
        required: true,
        default: "default.jpg"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

PropiedadSchema.plugin(mongoosePaginate);

module.exports = model('Propiedad', PropiedadSchema, "propiedades");
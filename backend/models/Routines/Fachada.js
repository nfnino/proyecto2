const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Crear esquema y modelo usuario
const FachadaSchema = new Schema({
    fecha: {
        type: Date,
        required: true
    },
    ejecutor: {
        type: String,
        required: true
    },
    supervisor: {
        type: String,
        required: false
    },
    blower: {
        type: String,
        required: true
    },
    fuga_espirotubo: {
        type: String,
        required: true
    },
    presion_sensor: {
        type: String,
        required: true
    },
    presion_baja: {
        type: String,
        required: true
    },
    presion_alta: {
        type: String,
        required: true
    },
    colchones: {
        type: String,
        required: true
    },
    defecto_colchones: {
        type: String,
        required: false
    },
    generador_aire: {
        type: String,
        required: true
    },
    lamparas: {
        type: String,
        required: true
    },
    defecto_lamparas: {
        type: String,
        required: false
    },
    control: {
        type: String,
        required: true
    },
    tablero_electrico: {
        type: String,
        required: true
    },
    observacion: {
        type: String,
        required: false
    },
    recinto: {
        type: String,
        required: false
    }
});

const Fachada = mongoose.model('fachada', FachadaSchema);

module.exports = Fachada;
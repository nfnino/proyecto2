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
    blower1: {
        type: String,
        default: ""
    },
    blower2: {
        type: String,
        default: ""
    },
    blower3: {
        type: String,
        default: ""
    },
    blower4: {
        type: String,
        default: ""
    },
    observacion: {
        type: String,
        required: false
    },
    estado: {
        type: String,
        default: "Creada"
    },
    fecha_fin: {
        type: Date,
    },
    recinto: {
        type: String,
        required: false
    }
});

const DetFachadaSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    rutina: {
        type: String,
        required: false
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
    }
});

const Fachada = mongoose.model('fachada', FachadaSchema);
const DetalleFachada = mongoose.model('detalleFachada', DetFachadaSchema);

module.exports = { Fachada, DetalleFachada };
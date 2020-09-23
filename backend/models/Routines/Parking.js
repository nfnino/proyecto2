const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Crear esquema y modelo usuario
const ParkingSchema = new Schema({
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
    carros_n1: {
        type: Number,
        required: true
    },
    motos_n1: {
        type: Number,
        required: true
    },
    carros_n2: {
        type: Number,
        required: true
    },
    motos_n2: {
        type: Number,
        required: true
    },
    carros_n3: {
        type: Number,
        required: true
    },
    motos_n3: {
        type: Number,
        required: true
    },
    carros_n4: {
        type: Number,
        required: true
    },
    motos_n4: {
        type: Number,
        required: true
    },
    carros: {
        type: Number
    },
    motos: {
        type: Number
    },
    camaras_n1: {
        type: Number,
        required: true
    },
    camaras_n2: {
        type: Number,
        required: true
    },
    camaras_n3: {
        type: Number,
        required: true
    },
    camaras_n4: {
        type: Number,
        required: true
    },
    camaras_ptz: {
        type: Number,
        required: true
    },
    camaras: {
        type: Number
    },
    observacion: {
        type: String,
        required: false
    },
    recinto: {
        type: String
    }
});

const Parking = mongoose.model('parking', ParkingSchema);

module.exports = Parking;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TableroSchema = new Schema({
    rutina: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    brak1: {
        type: Number,
        required: true
    },
    brak2: {
        type: Number,
        required: true
    },
    brak3: {
        type: Number,
        required: true
    },
    brak4: {
        type: Number,
        required: true
    },
    brak5: {
        type: Number,
        required: true
    },
    brak6: {
        type: Number,
        required: true
    },
    brak7: {
        type: Number,
        required: true
    },
    brak8: {
        type: Number,
        required: false
    },
    brak9: {
        type: Number,
        required: false
    },
})

const PantallaSchema = new Schema({
    fecha: {
        type: Date,
        required: true
    },
    fecha_fin: {
        type: Date
    },
    estado: {
        type: String,
        default: "Creada"
    },
    ejecutor: {
        type: String,
        required: true
    },
    falla: {
        type: String,
        required: false
    },
    paneles: {
        type: String,
        default: 0
    },
    tipo_falla: {
        type: String,
        required: false
    },
    cpu: {
        type: String,
        required: true
    },
    control: {
        type: String,
        required: true
    },
    tableros: {
        type: String,
        required: true
    },
    plano: {
        type: String,
        required: true
    },
    corriente_f1: {
        type: Number,
        required: true
    },
    corriente_f2: {
        type: Number,
        required: true
    },
    corriente_f3: {
        type: Number,
        required: true
    },
    tablero_principal: { type: String, default: ""},
    tablero_1: { type: String, default: ""},
    tablero_2: { type: String, default: ""},
    tablero_3: { type: String, default: ""},
    tablero_4: { type: String, default: ""},
    tablero_5: { type: String, default: ""},
    tablero_6: { type: String, default: ""},
    tablero_7: { type: String, default: ""},
    observacion: {
        type: String,
        required: false
    },
    recinto: {
        type: String
    }
});

const Tablero = mongoose.model('tablero', TableroSchema);
const Pantalla = mongoose.model('pantalla', PantallaSchema);

module.exports = { Pantalla, Tablero };
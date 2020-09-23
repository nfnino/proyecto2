const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GabineteSchema = new Schema({
    rutina: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    manguera: {
        type: String,
        required: true
    },
    extintor: {
        type: Date,
        required: true
    },
    conexion: {
        type: String,
        required: true
    },
    presion: {
        type: String,
        required: true
    },
    limpieza: {
        type: String,
        required: true
    },
    seguro: {
        type: String,
        required: true
    },
    observacion: {
        type: String,
        required: false
    }
})

const RCISchema = new Schema({
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
    estado: {
        type: String,
        default: "Creada"
    },
    g1: { type: String, default: "" },
    g2: { type: String, default: "" },
    g3: { type: String, default: "" },
    g4: { type: String, default: "" },
    g5: { type: String, default: "" },
    g6: { type: String, default: "" },
    g7: { type: String, default: "" },
    g8: { type: String, default: "" },
    g9: { type: String, default: "" },
    g10: { type: String, default: "" },
    g11: { type: String, default: "" },
    g12: { type: String, default: "" },
    g13: { type: String, default: "" },
    g14: { type: String, default: "" },
    g15: { type: String, default: "" },
    g16: { type: String, default: "" },
    g17: { type: String, default: "" },
    g18: { type: String, default: "" },
    g19: { type: String, default: "" },
    g20: { type: String, default: "" },
    g21: { type: String, default: "" },
    g22: { type: String, default: "" },
    g23: { type: String, default: "" },
    g24: { type: String, default: "" },
    g25: { type: String, default: "" },
    g26: { type: String, default: "" },
    g27: { type: String, default: "" },
    g28: { type: String, default: "" },
    g29: { type: String, default: "" },
    g30: { type: String, default: "" },
    g31: { type: String, default: "" },
    g32: { type: String, default: "" },
    g33: { type: String, default: "" },
    g34: { type: String, default: "" },
    g35: { type: String, default: "" },
    g36: { type: String, default: "" },
    g37: { type: String, default: "" },
    g38: { type: String, default: "" },
    g39: { type: String, default: "" },
    g40: { type: String, default: "" },
    g41: { type: String, default: "" },
    g42: { type: String, default: "" },
    g43: { type: String, default: "" },
    g44: { type: String, default: "" },
    g45: { type: String, default: "" },
    g46: { type: String, default: "" },
    g47: { type: String, default: "" },
    g48: { type: String, default: "" },
    g49: { type: String, default: "" },
    g50: { type: String, default: "" },
    g51: { type: String, default: "" },
    g52: { type: String, default: "" },
    g53: { type: String, default: "" },
    g54: { type: String, default: "" },
    g55: { type: String, default: "" },
    recinto: { type: String}
});

const RCI = mongoose.model('rci', RCISchema);
const Gabinete = mongoose.model('gabinete', GabineteSchema);

module.exports = { RCI, Gabinete };
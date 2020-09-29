const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PisoSchema = new Schema({
    rutina: { type: String, required: true},
    nombre: { type: String, required: true},
    p_01: { type: Number},
    p_02: { type: Number},
    p_03: { type: Number},
    p_04: { type: Number},
    p_05: { type: Number},
    p_06: { type: Number},
    p_07: { type: Number},
    p_08: { type: Number},
    p_09: { type: Number},
    p_10: { type: Number},
    p_11: { type: Number},
    p_12: { type: Number},
    p_13: { type: Number},
    p_14: { type: Number},
    p_15: { type: Number},
    p_16: { type: Number},
    p_17: { type: Number},
    p_18: { type: Number},
    p_19: { type: Number},
    p_total: { 
        type: Number, 
        default: 0
    } 
})

const SilleteriaSchema = new Schema({
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
    fecha_fin: {
        type: Date
    },
    estado: {
        type: String,
        default: "Creada"
    },
    piso_1: { type: String, default: ""},
    piso_2: { type: String, default: ""},
    piso_3: { type: String, default: ""},
    tribuna_norte: { type: Number},
    tribuna_sur: { type: Number},
    suites_vip: { type: Number},
    boxes: { type: Number },
});

const Silleteria = mongoose.model('silleteria', SilleteriaSchema);
const Piso = mongoose.model('piso', PisoSchema);

module.exports = {Silleteria, Piso};
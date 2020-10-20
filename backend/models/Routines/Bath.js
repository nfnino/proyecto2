const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BathSchema = new Schema({
    fecha: {
        type: Date,
        required: true
    },
    ejecutor: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        default: "Creada"
    },
    fecha_fin: {
        type: Date
    },
    N1_P1_E13: { type: String, default: "" },
    N2_P1_E12: { type: String, default: "" },
    ENF_P1_E10: { type: String, default: "" },
    N3_P1_E10: { type: String, default: "" },
    N4_P1_E10: { type: String, default: "" },
    N5_P1_E9: { type: String, default: "" },
    N6_P1_E6: {type: String, default: ""  },
    N7_P1_E6: { type: String, default: "" },
    N8_P1_E3: { type: String, default: "" },
    N9_P1_E3: { type: String, default: "" },
    N10_P1_E4: { type: String, default: "" },
    N11_P1_E23: { type: String, default: "" },
    N12_P1_E21: { type: String, default: "" },
    N13_P1_E21: { type: String, default: "" },
    N14_P1_E19: { type: String, default: "" },
    N15_P1_E17: { type: String, default: "" },
    N16_P1_E17: { type: String, default: "" },
    N17_P1_E17: { type: String, default: "" },
    N18_P1_E17: { type: String, default: "" },
    N19_P2_E15: { type: String, default: "" },
    CAM1_P2_E16: { type: String, default: "" },
    CAM2_P2_E15: { type: String, default: "" },
    N20_P2_E15: { type: String, default: "" },
    N21_P2_E14: { type: String, default: "" },
    N22_P2_E13: { type: String, default: "" },
    N23_P2_E14: { type: String, default: "" },
    N24_P2_E11: { type: String, default: "" },
    N25_P2_E10: { type: String, default: "" },
    N26_P2_E9: { type: String, default: "" },
    observacion: {
        type: String,
        required: false
    },
    total_sanitarios: {
        type: Number
    },
    total_orinales: {
        type: Number
    },
    total_lavamanos: {
        type: Number
    },
    total_secamanos: {
        type: Number
    },
    total_panaleras: {
        type: Number
    },
    total_duchas: {
        type: Number
    },
    total_luminarias: {
        type: Number
    }
});

const DetBathSchema = new Schema({
    rutina: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: false
    },
    sanitarios: {
        type: Number,
        required: true
    },
    orinales: {
        type: Number,
        required: true
    },
    lavamanos: {
        type: Number,
        required: true
    },
    secamanos: {
        type: Number,
        required: true
    },
    panaleras: {
        type: Number,
        required: true
    },
    duchas: {
        type: Number,
        required: true
    },
    luminarias: {
        type: Number,
        required: true
    }
});

const Bath = mongoose.model('bath', BathSchema);
const DetBath = mongoose.model('detbath', DetBathSchema);

module.exports = {Bath, DetBath};
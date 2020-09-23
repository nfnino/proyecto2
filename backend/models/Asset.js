const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AssetSchema = new Schema ({

    recinto: {
        type: String,
        required: true
    },
    ubicacion: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    fecha_compra: {
        type: Date,
        required: true
    },
    valor: {
        type: Number,
        required: true
    },
    dias_garantia: {
        type: Number,
        required: true
    },
    fecha_fin_garantia: {
        type: Date,
        required: true
    },
    imagen: {
        type: String,
        default: ""
    },
    manual: {
        type: String,
        required: false
    },
    cod_qr: {
        type: String,
        required: true
    },
    dias_frec_mant_preventivo: {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    observacion: {
        type: String,
        required: true
    },
    tareas_activas: {
        type: Number,
        default: 0
    },
    activo_reemp: {
        type: String,
    },
    soporte_delete: {
        type: String
    },
    area: {
        type: String,
        required: true
    }
});

module.exports = Asset = mongoose.model("asset", AssetSchema);
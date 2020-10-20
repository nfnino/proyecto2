const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocalSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    ubicacion: {
        type: String,
        required: false,
    },
    puertas: {
        type: Number,
        required: true
    },
    agua: {
        type: String,
        required: true
    },
    electricidad: {
        type: String,
        required: true
    },
    gas: {
        type: String,
        required: true
    },
    lamparas: {
        type: Number,
        required: true
    },
    ventaneria: {
        type: String,
        required: true
    },
    pasillos: {
        type: String,
        required: true
    },
    observacion: {
        type: String,
        required: false
    },
    rutina: {
        type: String,
        required: false
    }
});

const RutinaLocalSchema = new Schema({
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
        type: Date,
    },
    ab101: {type: String, default: ""},
    ab102: {type: String, default: ""},
    ab103: {type: String, default: ""},
    ab104: {type: String, default: ""},
    ab201: {type: String, default: ""},
    ab202: {type: String, default: ""},
    ab203: {type: String, default: ""},
    ab204: {type: String, default: ""},
    ab301: {type: String, default: ""},
    ab302: {type: String, default: ""},
    ab303: {type: String, default: ""},
    ab304: {type: String, default: ""},
    indigo_norte: {type: String, default: ""},
    indigo_sur: {type: String, default: ""},
    crepes: {type: String, default: ""},
    tostao_101: {type: String, default: ""},
    homeburger_102: {type: String, default: ""},
    buffalowings_103: {type: String, default: ""},
    local_104: {type: String, default: ""},
    tuboleta: {type: String, default: ""},
    exp_1: {type: String, default: ""},
    exp_2: {type: String, default: ""},
    exp_3: {type: String, default: ""},
    exp_4: {type: String, default: ""},
    exp_5: {type: String, default: ""},
    exp_6: {type: String, default: ""},
    exp_7: {type: String, default: ""},
    exp_8: {type: String, default: ""},
    exp_9: {type: String, default: ""},
    exp_10: {type: String, default: ""},
    exp_11: {type: String, default: ""},
    exp_12: {type: String, default: ""},
    exp_13: {type: String, default: ""},
    observacion: {
        type: String,
        required: false
    },
    recinto: {
        type: String
    }
});

const RutinaLocal = mongoose.model('rutinalocal', RutinaLocalSchema);
const Local = mongoose.model('local', LocalSchema);

module.exports = {Local, RutinaLocal};
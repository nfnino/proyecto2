const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SuiteSchema = new Schema({
    rutina: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    sillas: {
        type: Number,
        required: true
    },
    puertas: {
        type: Number,
        required: true
    },
    lava_platos: {
        type: Number,
        required: true
    },
    lamparas: {
        type: Number,
        required: true
    },
    observacion: {
        type: String,
        required: false
    }
})

const VIPSchema = new Schema({
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
    supervisor: {
        type: String,
        required: false
    },
    s101: { type: String, default: "" },
    s102: { type: String, default: "" },
    s103: { type: String, default: "" },
    s104: { type: String, default: "" },
    s105: { type: String, default: "" },
    s106: { type: String, default: "" },
    s107: { type: String, default: "" },
    s108: { type: String, default: "" },
    s109: { type: String, default: "" },
    s110: { type: String, default: "" },
    s111: { type: String, default: "" },
    s112: { type: String, default: "" },
    s113: { type: String, default: "" },
    s114: { type: String, default: "" },
    s115: { type: String, default: "" },
    s116: { type: String, default: "" },
    s117: { type: String, default: "" },
    s118: { type: String, default: "" },
    s119: { type: String, default: "" },
    s120: { type: String, default: "" },
    s_party: { type: String, default: "" },
    tribuna_norte: { type: String, default: "" },
    tribuna_sur: { type: String, default: "" },
    platea: { type: String, default: "" },
    graderia_piso2: { type: String, default: "" },
    graderia_piso3: { type: String, default: "" },
    box1: { type: String, default: "" },
    box2: { type: String, default: "" },
    box3: { type: String, default: "" },
    box4: { type: String, default: "" },
    box5: { type: String, default: "" },
    box6: { type: String, default: "" },
    box7: { type: String, default: "" },
    box8: { type: String, default: "" },
    box9: { type: String, default: "" },
    box10: { type: String, default: "" },
    box11: { type: String, default: "" },
    box12: { type: String, default: "" },
    box13: { type: String, default: "" },
    box14: { type: String, default: "" },
    box15: { type: String, default: "" },
    box16: { type: String, default: "" },
    box17: { type: String, default: "" },
    box18: { type: String, default: "" },
    total_sillas: {
        type: Number
    },
    total_puertas: {
        type: Number
    },
    total_lava_platos: {
        type: Number
    },
    total_lamparas: {
        type: Number
    },
});

/* VIPSchema.pre('save', async function() {
    let self = this;
    
  }); */

const VIP = mongoose.model('vip', VIPSchema);
const Suite = mongoose.model('suite', SuiteSchema);

module.exports = {VIP, Suite};
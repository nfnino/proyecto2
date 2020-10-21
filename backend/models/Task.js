const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Crear esquema y modelo de la tarea
const TaskSchema = new Schema({
    activo: {
        type: String,
        required: [true, 'El campo activo es requerido']
    },
    tipo_mant: {
        type: String, 
        required: [true, 'El campo tipo de mantenimiento es requerido']
    },
    fecha_inicial_tent: {
        type: String,
        required: [true, 'El campo fecha de inicio es requerido']
    },
    fecha_final_tent: {
        type: String,
        required: [true, 'El campo fecha final es requerido']
    },
    imagen_antes_mant: {
        type: String,
        required: false
    },
    imagen_despu_mant: {
        type: String,
        required: false
    },
    desc_falla: {
        type: String,
        required: true
    },
    email_compras: {
        type: String,
        required: false,
        default: ""
    },
    desc_materiales_compras: {
        type: String,
        required: false,
        default: ""
    },
    ejecutor_interno: {
        type: String,
        required: false
    },
    supervisor: {
        type: String,
        required: false
    },
    responsable: {
        type: String,
    },
    nit_empresa_externa: {
        type: String,
        required: false
    },
    nombre_empresa_externa: {
        type: String,
        required: false
    },
    doc_orden_compra: {
        type: String,
        required: false
    },
    valor_externo: {
        type: Number,
        required: false
    },
    fecha_inicial_real: {
        type: String,
        required: false,
        default: ""
    },
    fecha_final_real: {
        type: String,
        required: false,
        default: ""
    },
    observacion: {
        type: String,
    },
    estado: {
        type: String,
        required: true,
        default: "Creada"
    }

});
const Task = mongoose.model('task', TaskSchema);

module.exports = Task;
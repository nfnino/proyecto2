const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLocal(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.nombre = !isEmpty(data.nombre) ? data.nombre : "";
    data.puertas = (data.puertas.toString().length > 0) ? data.puertas.toString() : "";
    data.agua = !isEmpty(data.agua) ? data.agua : "";
    data.electricidad = !isEmpty(data.electricidad) ? data.electricidad : "";
    data.gas = !isEmpty(data.gas) ? data.gas : "";
    data.lamparas = (data.lamparas.toString().length > 0) ? data.lamparas.toString() : "";
    data.ventanerias = !isEmpty(data.ventaneria) ? data.ventaneria : "";
    data.pasillos = !isEmpty(data.pasillos) ? data.pasillos : "";

    if (Validator.isEmpty(data.nombre)) {
        errors.nombre = "Campo requerido";
    }
    if (Validator.isEmpty(data.puertas)) {
        errors.puertas = "Campo requerido";
    }
    if (Validator.isEmpty(data.agua)) {
        errors.agua = "Campo requerido";
    }
    if (Validator.isEmpty(data.electricidad)) {
        errors.electricidad = "Campo requerido";
    }
    if (Validator.isEmpty(data.gas)) {
        errors.gas = "Campo requerido";
    }
    if (Validator.isEmpty(data.lamparas)) {
        errors.lamparas = "Campo requerido";
    }
    if (Validator.isEmpty(data.ventaneria)) {
        errors.ventaneria = "Campo requerido";
    }
    if (Validator.isEmpty(data.pasillos)) {
        errors.pasillos = "Campo requerido";
    }

    //tipos de dato
    let nums = /^\d+$/;
    if (!data.puertas.match(nums)){
        errors.puertas = "Sólo valores numéricos";
    }
    if (!data.lamparas.match(nums)){
        errors.lamparas = "Sólo valores numéricos";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};
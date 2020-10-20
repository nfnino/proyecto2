const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateDetBath(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.rutina = !isEmpty(data.rutina) ? data.rutina : "";
    data.nombre = !isEmpty(data.nombre) ? data.nombre : "";
    data.sanitarios = (data.sanitarios.toString().length > 0) ? data.sanitarios.toString() : "";
    data.orinales = (data.orinales.toString().length > 0) ? data.orinales.toString() : "";
    data.lavamanos = (data.lavamanos.toString().length > 0) ? data.lavamanos.toString() : "";
    data.secamanos = (data.secamanos.toString().length > 0) ? data.secamanos.toString() : "";
    data.panaleras = (data.panaleras.toString().length > 0) ? data.panaleras.toString() : "";
    data.duchas = (data.duchas.toString().length > 0) ? data.duchas.toString() : "";
    data.luminarias = (data.luminarias.toString().length > 0) ? data.luminarias.toString() : "";

    if (Validator.isEmpty(data.rutina)) {
        errors.rutina = "Campo requerido";
    }
    if (Validator.isEmpty(data.nombre)) {
        errors.nombre = "Campo requerido";
    }

    //tipos de dato
    let nums = /^\d+$/;
    if (!data.sanitarios.match(nums)){
        errors.sanitarios = "Sólo valores numéricos";
    }
    if (!data.orinales.match(nums)){
        errors.orinales = "Sólo valores numéricos";
    }
    if (!data.lavamanos.match(nums)){
        errors.lavamanos = "Sólo valores numéricos";
    }
    if (!data.secamanos.match(nums)){
        errors.secamanos = "Sólo valores numéricos";
    }
    if (!data.panaleras.match(nums)){
        errors.panaleras = "Sólo valores numéricos";
    }
    if (!data.duchas.match(nums)){
        errors.duchas = "Sólo valores numéricos";
    }
    if (!data.luminarias.match(nums)){
        errors.luminarias = "Sólo valores numéricos";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
};
const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateDetBath(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.rutina = !isEmpty(data.rutina) ? data.rutina : "";
    data.nombre = !isEmpty(data.nombre) ? data.nombre : "";
    data.sanitarios = !isEmpty(data.sanitarios) ? data.sanitarios : "";
    data.orinales = !isEmpty(data.orinales) ? data.orinales : "";
    data.lavamanos = !isEmpty(data.lavamanos) ? data.lavamanos : "";
    data.secamanos = !isEmpty(data.secamanos) ? data.secamanos : "";
    data.panaleras = !isEmpty(data.panaleras) ? data.panaleras : "";
    data.duchas = !isEmpty(data.duchas) ? data.duchas : "";
    data.luminarias = !isEmpty(data.luminarias) ? data.luminarias : "";
    data.recinto = !isEmpty(data.recinto) ? data.recinto : "";

    if (Validator.isEmpty(data.rutina)) {
        errors.rutina = "Campo requerido";
    }
    if (Validator.isEmpty(data.nombre)) {
        errors.nombre = "Campo requerido";
    }
    if (Validator.isEmpty(data.sanitarios)) {
        errors.sanitarios = "Campo requerido";
    }
    if (Validator.isEmpty(data.orinales)) {
        errors.orinales = "Campo requerido";
    }
    if (Validator.isEmpty(data.lavamanos)) {
        errors.lavamanos = "Campo requerido";
    }
    if (Validator.isEmpty(data.secamanos)) {
        errors.secamanos = "Campo requerido";
    }
    if (Validator.isEmpty(data.panaleras)) {
        errors.panaleras = "Campo requerido";
    }
    if (Validator.isEmpty(data.duchas)) {
        errors.duchas = "Campo requerido";
    }
    if (Validator.isEmpty(data.luminarias)) {
        errors.luminarias = "Campo requerido";
    }
    /* if (Validator.isEmpty(data.recinto)) {
        errors.recinto = "Campo requerido";
    } */

    //tipos de dato
    if (!Validator.isNumeric(data.sanitarios)) {
        errors.sanitarios = "Sólo valores numéricos";
    }
    if (!Validator.isNumeric(data.orinales)) {
        errors.orinales = "Sólo valores numéricos";
    }
    if (!Validator.isNumeric(data.lavamanos)) {
        errors.lavamanos = "Sólo valores numéricos";
    }
    if (!Validator.isNumeric(data.secamanos)) {
        errors.secamanos = "Sólo valores numéricos";
    }
    if (!Validator.isNumeric(data.panaleras)) {
        errors.panaleras = "Sólo valores numéricos";
    }
    if (!Validator.isNumeric(data.duchas)) {
        errors.duchas = "Sólo valores numéricos";
    }
    if (!Validator.isNumeric(data.luminarias)) {
        errors.luminarias = "Sólo valores numéricos";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
};
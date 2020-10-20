const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateBath(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.fecha = !isEmpty(data.fecha) ? data.fecha : "";
    data.ejecutor = !isEmpty(data.ejecutor) ? data.ejecutor : "";
    data.carros_n1 = (data.carros_n1.toString().length > 0) ? data.carros_n1.toString() : "";
    data.carros_n2 = (data.carros_n2.toString().length > 0) ? data.carros_n2.toString() : "";
    data.carros_n3 = (data.carros_n3.toString().length > 0) ? data.carros_n3.toString() : "";
    data.carros_n4 = (data.carros_n4.toString().length > 0) ? data.carros_n4.toString() : "";
    data.motos_n1 = (data.motos_n1.toString().length > 0) ? data.motos_n1.toString() : "";
    data.motos_n2 = (data.motos_n2.toString().length > 0) ? data.motos_n2.toString() : "";
    data.motos_n3 = (data.motos_n3.toString().length > 0) ? data.motos_n3.toString() : "";
    data.motos_n4 = (data.motos_n4.toString().length > 0) ? data.motos_n4.toString() : "";
    data.camaras_n1 = (data.camaras_n1.toString().length > 0) ? data.camaras_n2.toString() : "";
    data.camaras_n2 = (data.camaras_n2.toString().length > 0) ? data.camaras_n2.toString() : "";
    data.camaras_n3 = (data.camaras_n3.toString().length > 0) ? data.camaras_n3.toString() : "";
    data.camaras_n4 = (data.camaras_n4.toString().length > 0) ? data.camaras_n4.toString() : "";
    data.camaras_ptz = (data.camaras_ptz.toString().length > 0) ? data.camaras_ptz.toString() : "";

    if (Validator.isEmpty(data.camaras_n1)) {
        errors.camaras_n1 = "Campo requerido";
    }
    if (Validator.isEmpty(data.camaras_n2)) {
        errors.camaras_n2 = "Campo requerido";
    }
    if (Validator.isEmpty(data.camaras_n3)) {
        errors.camaras_n3 = "Campo requerido";
    }
    if (Validator.isEmpty(data.camaras_n4)) {
        errors.camaras_n4 = "Campo requerido";
    }
    if (Validator.isEmpty(data.carros_n1)) {
        errors.carros_n1 = "Campo requerido";
    }
    if (Validator.isEmpty(data.carros_n2)) {
        errors.carros_n2 = "Campo requerido";
    }
    if (Validator.isEmpty(data.carros_n3)) {
        errors.carros_n3 = "Campo requerido";
    }
    if (Validator.isEmpty(data.carros_n4)) {
        errors.carros_n4 = "Campo requerido";
    }
    if (Validator.isEmpty(data.motos_n1)) {
        errors.motos_n1 = "Campo requerido";
    }
    if (Validator.isEmpty(data.motos_n2)) {
        errors.motos_n2 = "Campo requerido";
    }
    if (Validator.isEmpty(data.motos_n3)) {
        errors.motos_n3 = "Campo requerido";
    }
    if (Validator.isEmpty(data.motos_n4)) {
        errors.motos_n4 = "Campo requerido";
    }
    if (Validator.isEmpty(data.camaras_ptz)) {
        errors.camaras_ptz = "Campo requerido";
    }
    if (Validator.isEmpty(data.ejecutor)) {
        errors.ejecutor = "Campo requerido";
    }

    //tipos de dato
    if (!Validator.isNumeric(data.camaras_n1)) {
        errors.camaras_n1 = "Sólo valores numéricos";
    }
    if (!Validator.isNumeric(data.camaras_n2)) {
        errors.camaras_n2 = "Sólo valores numéricos";
    }
    if (!Validator.isNumeric(data.camaras_n3)) {
        errors.camaras_n3 = "Sólo valores numéricos";
    }
    if (!Validator.isNumeric(data.camaras_n4)) {
        errors.camaras_n4 = "Sólo valores numéricos";
    }
    if (!Validator.isNumeric(data.carros_n1)) {
        errors.carros_n1 = "Sólo valores numéricos";
    }
    if (!Validator.isNumeric(data.carros_n2)) {
        errors.carros_n2 = "Sólo valores numéricos";
    }
    if (!Validator.isNumeric(data.carros_n3)) {
        errors.carros_n3 = "Sólo valores numéricos";
    }
    if (!Validator.isNumeric(data.carros_n4)) {
        errors.carros_n4 = "Sólo valores numéricos";
    }
    if (!Validator.isNumeric(data.motos_n1)) {
        errors.motos_n1 = "Sólo valores numéricos";
    }
    if (!Validator.isNumeric(data.motos_n2)) {
        errors.motos_n2 = "Sólo valores numéricos";
    }
    if (!Validator.isNumeric(data.motos_n3)) {
        errors.motos_n3 = "Sólo valores numéricos";
    }
    if (!Validator.isNumeric(data.motos_n4)) {
        errors.motos_n4 = "Sólo valores numéricos";
    }
    if (!Validator.isNumeric(data.camaras_ptz)) {
        errors.camaras_ptz = "Sólo valores numéricos";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
};
const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRutLocales(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.fecha = !isEmpty(data.fecha) ? data.fecha : "";
    data.ejecutor = !isEmpty(data.ejecutor) ? data.ejecutor : "";
    data.supervisor = !isEmpty(data.supervisor) ? data.supervisor : "";

    if (Validator.isEmpty(data.fecha)) {
        errors.fecha = "Campo requerido";
    }
    if (Validator.isEmpty(data.ejecutor)) {
        errors.ejecutor = "Campo requerido";
    }
    if (Validator.isEmpty(data.supervisor)) {
        errors.supervisor = "Campo requerido";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
};
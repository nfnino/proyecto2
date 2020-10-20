const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validatePantalla(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.fecha = !isEmpty(data.fecha) ? data.fecha : "";
    data.ejecutor = !isEmpty(data.ejecutor) ? data.ejecutor : "";
    data.falla = !isEmpty(data.falla) ? data.falla : "";
    data.tipo_falla = !isEmpty(data.tipo_falla) ? data.tipo_falla : "";
    data.cpu = !isEmpty(data.cpu) ? data.cpu : "";
    data.control = !isEmpty(data.control) ? data.control : "";
    data.tableros = !isEmpty(data.tableros) ? data.tableros : "";
    data.plano = !isEmpty(data.plano) ? data.plano : "";
    data.corriente_f1 = !isEmpty(data.corriente_f1) ? data.corriente_f1 : "";
    data.corriente_f2 = !isEmpty(data.corriente_f2) ? data.corriente_f2 : "";
    data.corriente_f3 = !isEmpty(data.corriente_f3) ? data.corriente_f3 : "";

    if (Validator.isEmpty(data.fecha)) {
        errors.fecha = "Campo requerido";
    }
    if (Validator.isEmpty(data.ejecutor)) {
        errors.ejecutor = "Campo requerido";
    }
    if (Validator.isEmpty(data.cpu)) {
        errors.cpu = "Campo requerido";
    }
    if (Validator.isEmpty(data.control)) {
        errors.control = "Campo requerido";
    }
    if (Validator.isEmpty(data.tableros)) {
        errors.tableros = "Campo requerido";
    }
    if (Validator.isEmpty(data.plano)) {
        errors.plano = "Campo requerido";
    }
    if (Validator.isEmpty(data.corriente_f1)) {
        errors.corriente_f1 = "Campo requerido";
    }
    if (Validator.isEmpty(data.corriente_f2)) {
        errors.corriente_f2 = "Campo requerido";
    }
    if (Validator.isEmpty(data.corriente_f3)) {
        errors.corriente_f3 = "Campo requerido";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
};
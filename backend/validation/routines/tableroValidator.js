const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateTablero(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.nombre = !isEmpty(data.nombre) ? data.nombre : "";
    data.rutina = !isEmpty(data.rutina) ? data.rutina : "";
    data.brak1 = !isEmpty(data.brak1) ? data.brak1 : "";
    data.brak2 = !isEmpty(data.brak2) ? data.brak2 : "";
    data.brak3 = !isEmpty(data.brak3) ? data.brak3 : "";
    data.brak4 = !isEmpty(data.brak4) ? data.brak4 : "";
    data.brak5 = !isEmpty(data.brak5) ? data.brak5 : "";
    data.brak6 = !isEmpty(data.brak6) ? data.brak6 : "";
    data.brak7 = !isEmpty(data.brak7) ? data.brak7 : "";
    data.brak8 = !isEmpty(data.brak8) ? data.brak8 : "";
    data.brak9 = !isEmpty(data.brak9) ? data.brak9 : "";

    if (Validator.isEmpty(data.rutina)) {
        errors.rutina = "Campo requerido";
    }
    if (Validator.isEmpty(data.nombre)) {
        errors.nombre = "Campo requerido";
    }
    if (Validator.isEmpty(data.brak1)) {
        errors.brak1 = "Campo requerido";
    }
    if (Validator.isEmpty(data.brak2)) {
        errors.brak2 = "Campo requerido";
    }
    if (Validator.isEmpty(data.brak3)) {
        errors.brak3 = "Campo requerido";
    }
    if (Validator.isEmpty(data.brak4)) {
        errors.brak4 = "Campo requerido";
    }
    if (Validator.isEmpty(data.brak5)) {
        errors.brak5 = "Campo requerido";
    }
    if (Validator.isEmpty(data.brak6)) {
        errors.brak6 = "Campo requerido";
    }
    if (Validator.isEmpty(data.brak7)) {
        errors.brak7 = "Campo requerido";
    }
    if(data.nombre!=="tablero_principal") {
        if (Validator.isEmpty(data.brak8)) {
            errors.brak8 = "Campo requerido";
        }
        if (Validator.isEmpty(data.brak9)) {
            errors.brak9 = "Campo requerido";
        }
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
};
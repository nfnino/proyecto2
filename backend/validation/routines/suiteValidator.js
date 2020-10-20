const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateTablero(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.nombre = !isEmpty(data.nombre) ? data.nombre : "";
    data.rutina = !isEmpty(data.rutina) ? data.rutina : "";
    data.sillas = (data.sillas.toString().length > 0) ? data.sillas.toString() : "";
    data.puertas = (data.puertas.toString().length > 0) ? data.puertas.toString() : "";
    data.lava_platos = (data.lava_platos.toString().length > 0) ? data.lava_platos.toString() : "";
    data.lamparas = (data.lamparas.toString().length > 0) ? data.lamparas.toString() : "";

    if (Validator.isEmpty(data.rutina)) {
        errors.rutina = "Campo requerido";
    }
    if (Validator.isEmpty(data.nombre)) {
        errors.nombre = "Campo requerido";
    }
    if (Validator.isEmpty(data.sillas)) {
        errors.sillas = "Campo requerido";
    }
    if (Validator.isEmpty(data.puertas)) {
        errors.puertas = "Campo requerido";
    }
    if (Validator.isEmpty(data.lava_platos)) {
        errors.lava_platos = "Campo requerido";
    }
    if (Validator.isEmpty(data.lamparas)) {
        errors.lamparas = "Campo requerido";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
};
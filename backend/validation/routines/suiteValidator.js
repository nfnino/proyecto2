const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateTablero(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.nombre = !isEmpty(data.nombre) ? data.nombre : "";
    data.rutina = !isEmpty(data.rutina) ? data.rutina : "";
    data.sillas = !isEmpty(data.sillas) ? data.sillas : "";
    data.puertas = !isEmpty(data.puertas) ? data.puertas : "";
    data.lava_platos = !isEmpty(data.lava_platos) ? data.lava_platos : "";
    data.lamparas = !isEmpty(data.lamparas) ? data.lamparas : "";

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
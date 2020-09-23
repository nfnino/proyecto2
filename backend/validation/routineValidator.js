const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRoutineInput(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.fecha = !isEmpty(data.fecha) ? data.fecha : "";
    data.espacio_vip = !isEmpty(data.espacio_vip) ? data.espacio_vip : "";
    data.espacio_local = !isEmpty(data.espacio_local) ? data.espacio_local : "";
    data.espacio_banio = !isEmpty(data.espacio_banio) ? data.espacio_banio : "";
    data.espacio_parq = !isEmpty(data.espacio_parq) ? data.espacio_parq : "";
    data.espacio_fach = !isEmpty(data.espacio_fach) ? data.espacio_fach : "";
    data.espacio_pant = !isEmpty(data.espacio_pant) ? data.espacio_pant : "";
    data.espacio_rci = !isEmpty(data.espacio_rci) ? data.espacio_rci : "";
    data.recinto = !isEmpty(data.recinto) ? data.recinto : "";

    if (Validator.isEmpty(data.fecha)) {
        errors.fecha = "Campo requerido";
    }
    if (Validator.isEmpty(data.espacio_vip)) {
        errors.espacio_vip = "Campo requerido";
    }
    if (Validator.isEmpty(data.espacio_local)) {
        errors.espacio_local = "Campo requerido";
    }
    if (Validator.isEmpty(data.espacio_banio)) {
        errors.espacio_banio = "Campo requerido";
    }
    if (Validator.isEmpty(data.espacio_parq)) {
        errors.espacio_parq = "Campo requerido";
    }
    if (Validator.isEmpty(data.espacio_fach)) {
        errors.espacio_fach = "Campo requerido";
    }
    if (Validator.isEmpty(data.espacio_pant)) {
        errors.espacio_pant = "Campo requerido";
    }
    if (Validator.isEmpty(data.espacio_rci)) {
        errors.espacio_rci = "Campo requerido";
    }
    if (Validator.isEmpty(data.recinto)) {
        errors.recinto = "Campo requerido";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
};
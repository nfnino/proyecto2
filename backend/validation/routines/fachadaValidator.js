const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateBanio(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.fecha = !isEmpty(data.fecha) ? data.fecha : "";
    data.ejecutor = !isEmpty(data.ejecutor) ? data.ejecutor : "";
    data.supervisor = !isEmpty(data.supervisor) ? data.supervisor : "";
    data.blower = !isEmpty(data.blower) ? data.blower : "";
    data.fuga_espirotubo = !isEmpty(data.fuga_espirotubo) ? data.fuga_espirotubo : "";
    data.presion_sensor = !isEmpty(data.presion_sensor) ? data.presion_sensor : "";
    data.presion_alta = !isEmpty(data.presion_alta) ? data.presion_alta : "";
    data.presion_baja = !isEmpty(data.presion_baja) ? data.presion_baja : "";
    data.colchones = !isEmpty(data.colchones) ? data.colchones : "";
    data.defecto_colchones = !isEmpty(data.defecto_colchones) ? data.defecto_colchones : "";
    data.generador_aire = !isEmpty(data.generador_aire) ? data.generador_aire : "";
    data.lamparas = !isEmpty(data.lamparas) ? data.lamparas : "";
    data.defecto_lamparas = !isEmpty(data.defecto_lamparas) ? data.defecto_lamparas : "";
    data.control = !isEmpty(data.control) ? data.control : "";
    data.tablero_electrico = !isEmpty(data.tablero_electrico) ? data.tablero_electrico : "";

    if (Validator.isEmpty(data.fecha)) {
        errors.fecha = "Campo requerido";
    }
    if (Validator.isEmpty(data.ejecutor)) {
        errors.ejecutor = "Campo requerido";
    }
    if (Validator.isEmpty(data.supervisor)) {
        errors.supervisor = "Campo requerido";
    }
    if (Validator.isEmpty(data.blower)) {
        errors.blower = "Campo requerido";
    }
    if (Validator.isEmpty(data.fuga_espirotubo)) {
        errors.fuga_espirotubo = "Campo requerido";
    }
    if (Validator.isEmpty(data.presion_sensor)) {
        errors.presion_sensor = "Campo requerido";
    }
    if (Validator.isEmpty(data.presion_alta)) {
        errors.presion_alta = "Campo requerido";
    }
    if (Validator.isEmpty(data.presion_baja)) {
        errors.presion_baja = "Campo requerido";
    }
    if (Validator.isEmpty(data.colchones)) {
        errors.colchones = "Campo requerido";
    }
    if (Validator.isEmpty(data.generador_aire)) {
        errors.generador_aire = "Campo requerido";
    }
    if (Validator.isEmpty(data.lamparas)) {
        errors.lamparas = "Campo requerido";
    }
    if (Validator.isEmpty(data.control)) {
        errors.control = "Campo requerido";
    }
    if (Validator.isEmpty(data.tablero_electrico)) {
        errors.tablero_electrico = "Campo requerido";
    }

    //tipos de dato
    if (!Validator.isNumeric(data.presion_sensor)) {
        errors.presion_sensor = "Sólo valores numéricos";
    }
    if (!Validator.isNumeric(data.presion_alta)) {
        errors.presion_alta = "Sólo valores numéricos";
    }
    if (!Validator.isNumeric(data.presion_baja)) {
        errors.presion_baja = "Sólo valores numéricos";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
};
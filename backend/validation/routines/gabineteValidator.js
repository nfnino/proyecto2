const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateGabinete(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.rutina = !isEmpty(data.rutina) ? data.rutina : "";
    data.nombre = !isEmpty(data.nombre) ? data.nombre : "";
    data.manguera = !isEmpty(data.manguera) ? data.manguera : "";
    data.extintor = !isEmpty(data.extintor) ? data.extintor : "";
    data.conexion = !isEmpty(data.conexion) ? data.conexion : "";
    data.presion = !isEmpty(data.presion) ? data.presion : "";
    data.limpieza = !isEmpty(data.limpieza) ? data.limpieza : "";
    data.seguro = !isEmpty(data.seguro) ? data.seguro : "";


    if (Validator.isEmpty(data.rutina)) {
        errors.rutina = "Campo requerido";
    }
    if (Validator.isEmpty(data.nombre)) {
        errors.nombre = "Campo requerido";
    }
    if (Validator.isEmpty(data.manguera)) {
        errors.manguera = "Campo requerido";
    }
    if (Validator.isEmpty(data.extintor)) {
        errors.extintor = "Campo requerido";
    }
    if (Validator.isEmpty(data.conexion)) {
        errors.conexion = "Campo requerido";
    }
    if (Validator.isEmpty(data.presion)) {
        errors.presion = "Campo requerido";
    }
    if (Validator.isEmpty(data.limpieza)) {
        errors.limpieza = "Campo requerido";
    }
    if (Validator.isEmpty(data.seguro)) {
        errors.seguro = "Campo requerido";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
};
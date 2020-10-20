const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validatePiso(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.nombre = !isEmpty(data.nombre) ? data.nombre : "";
    data.rutina = !isEmpty(data.rutina) ? data.rutina : "";
    data.p_01 = (data.p_01.toString().length > 0) ? data.p_01.toString() : "";
    data.p_02 = (data.p_02.toString().length > 0) ? data.p_02.toString() : "";
    data.p_03 = (data.p_03.toString().length > 0) ? data.p_03.toString() : "";
    data.p_04 = (data.p_04.toString().length > 0) ? data.p_04.toString() : "";
    data.p_05 = (data.p_05.toString().length > 0) ? data.p_05.toString() : "";
    data.p_06 = (data.p_06.toString().length > 0) ? data.p_06.toString() : "";
    data.p_07 = (data.p_07.toString().length > 0) ? data.p_07.toString() : "";
    data.p_08 = (data.p_08.toString().length > 0) ? data.p_08.toString() : "";
    data.p_09 = (data.p_09.toString().length > 0) ? data.p_09.toString() : "";
    data.p_10 = (data.p_10.toString().length > 0) ? data.p_10.toString() : "";
    data.p_11 = (data.p_11.toString().length > 0) ? data.p_11.toString() : "";
    data.p_12 = (data.p_12.toString().length > 0) ? data.p_12.toString() : "";
    data.p_13 = (data.p_13.toString().length > 0) ? data.p_13.toString() : "";
    data.p_14 = (data.p_14.toString().length > 0) ? data.p_14.toString() : "";
    data.p_15 = (data.p_15.toString().length > 0) ? data.p_15.toString() : "";
    data.p_16 = (data.p_16.toString().length > 0) ? data.p_16.toString() : "";
    data.p_17 = (data.p_17.toString().length > 0) ? data.p_17.toString() : "";
    data.p_18 = (data.p_18.toString().length > 0) ? data.p_18.toString() : "";
    data.p_19 = (data.p_19.toString().length > 0) ? data.p_19.toString() : "";

    if (Validator.isEmpty(data.rutina)) {
        errors.rutina = "Campo requerido";
    }
    if (Validator.isEmpty(data.nombre)) {
        errors.nombre = "Campo requerido";
    }
    if (Validator.isEmpty(data.p_01)) {
        errors.p_01 = "Campo requerido";
    }
    if(data.nombre!==("tribuna_norte"&&"tribuna_sur"&&"suites_vip"&&"boxes"&&"platea")) {

        if (Validator.isEmpty(data.p_02)) {
            errors.p_02 = "Campo requerido";
        }
        if (Validator.isEmpty(data.p_03)) {
            errors.p_03 = "Campo requerido";
        }
        if (Validator.isEmpty(data.p_04)) {
            errors.p_04 = "Campo requerido";
        }
        if (Validator.isEmpty(data.p_05)) {
            errors.p_05 = "Campo requerido";
        }
        if (Validator.isEmpty(data.p_06)) {
            errors.p_06 = "Campo requerido";
        }
        if (Validator.isEmpty(data.p_07)) {
            errors.p_07 = "Campo requerido";
        }
        if (Validator.isEmpty(data.p_08)) {
            errors.p_08 = "Campo requerido";
        }
        if (Validator.isEmpty(data.p_09)) {
            errors.p_09 = "Campo requerido";
        }
        if (Validator.isEmpty(data.p_10)) {
            errors.p_10 = "Campo requerido";
        }
        if (Validator.isEmpty(data.p_11)) {
            errors.p_11 = "Campo requerido";
        }
        if (Validator.isEmpty(data.p_12)) {
            errors.p_12 = "Campo requerido";
        }
        if (Validator.isEmpty(data.p_13)) {
            errors.p_13 = "Campo requerido";
        }
        if (Validator.isEmpty(data.p_14)) {
            errors.p_14 = "Campo requerido";
        }
        if (Validator.isEmpty(data.p_15)) {
            errors.p_15 = "Campo requerido";
        }
        if (Validator.isEmpty(data.p_16)) {
            errors.p_16 = "Campo requerido";
        }
        if (Validator.isEmpty(data.p_17)) {
            errors.p_17 = "Campo requerido";
        }
        if (Validator.isEmpty(data.p_18)) {
            errors.p_18 = "Campo requerido";
        }
        if (Validator.isEmpty(data.p_19)) {
            errors.p_19 = "Campo requerido";
        }
        
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
};
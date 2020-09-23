const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validatePiso(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.nombre = !isEmpty(data.nombre) ? data.nombre : "";
    data.rutina = !isEmpty(data.rutina) ? data.rutina : "";
    data.p_01 = !isEmpty(data.p_01) ? data.p_01 : "";
    data.p_02 = !isEmpty(data.p_02) ? data.p_02 : "";
    data.p_03 = !isEmpty(data.p_03) ? data.p_03 : "";
    data.p_04 = !isEmpty(data.p_04) ? data.p_04 : "";
    data.p_05 = !isEmpty(data.p_05) ? data.p_05 : "";
    data.p_06 = !isEmpty(data.p_06) ? data.p_06 : "";
    data.p_07 = !isEmpty(data.p_07) ? data.p_07 : "";
    data.p_08 = !isEmpty(data.p_08) ? data.p_08 : "";
    data.p_09 = !isEmpty(data.p_09) ? data.p_09 : "";
    data.p_10 = !isEmpty(data.p_10) ? data.p_10 : "";
    data.p_11 = !isEmpty(data.p_11) ? data.p_11 : "";
    data.p_12 = !isEmpty(data.p_12) ? data.p_12 : "";
    data.p_13 = !isEmpty(data.p_13) ? data.p_13 : "";
    data.p_14 = !isEmpty(data.p_14) ? data.p_14 : "";
    data.p_15 = !isEmpty(data.p_15) ? data.p_15 : "";
    data.p_16 = !isEmpty(data.p_16) ? data.p_16 : "";
    data.p_17 = !isEmpty(data.p_17) ? data.p_17 : "";
    data.p_18 = !isEmpty(data.p_18) ? data.p_18 : "";
    data.p_19 = !isEmpty(data.p_19) ? data.p_19 : "";

    if (Validator.isEmpty(data.rutina)) {
        errors.rutina = "Campo requerido";
    }
    if (Validator.isEmpty(data.nombre)) {
        errors.nombre = "Campo requerido";
    }
    if (Validator.isEmpty(data.p_01)) {
        errors.p_01 = "Campo requerido";
    }
    if(data.nombre!==("tribuna_norte"&&"tribuna_sur"&&"suites_vip"&&"boxes")) {

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
        if(data.nombre!=="piso_1") {
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
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
};
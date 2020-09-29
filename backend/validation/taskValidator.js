const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateTaskInput(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.activo = !isEmpty(data.activo) ? data.activo : "";
    data.tipo_mant = !isEmpty(data.tipo_mant) ? data.tipo_mant : "";
    data.fecha_inicial_tent = !isEmpty(data.fecha_inicial_tent) ? data.fecha_inicial_tent : "";
    data.fecha_final_tent = !isEmpty(data.fecha_final_tent) ? data.fecha_final_tent : "";
    data.imagen_antes_mant = !isEmpty(data.imagen1_antes_mant) ? data.imagen_antes_mant : "";
    data.desc_falla = !isEmpty(data.desc_falla) ? data.desc_falla : "";
    data.ejecutor_interno = !isEmpty(data.ejecutor_interno) ? data.ejecutor_interno : "";
    data.supervisor = !isEmpty(data.supervisor) ? data.supervisor : "";
    data.responsable = !isEmpty(data.responsable) ? data.responsable : "";
    data.nit_empresa_externa = !isEmpty(data.nit_empresa_externa) ? data.nit_empresa_externa : "";
    data.nombre_empresa_externa = !isEmpty(data.nombre_empresa_externa) ? data.nombre_empresa_externa : "";
    data.valor_externo = !isEmpty(data.valor_externo) ? data.valor_externo : "";
    // Prevenir defaults
    if (Validator.isEmpty(data.activo)) {
        errors.activo = "Se requiere un activo";
    }
    if (Validator.isEmpty(data.tipo_mant)) {
        errors.tipo_mant = "Campo requerido";
    }
    if (Validator.isEmpty(data.fecha_inicial_tent)) {
        errors.fecha_inicial_tent = "Campo requerido";
    }
    if (Validator.isEmpty(data.fecha_final_tent)) {
        errors.fecha_final_tent = "Campo requerido";
    }
    /* if (Validator.isEmpty(data.imagen_antes_mant)) {
        errors.imagen_antes_mant = "Campo requerido";
    } */
    if (Validator.isEmpty(data.desc_falla)) {
        errors.desc_falla = "Campo requerido";
    }
    if (data.responsable==="interno" && Validator.isEmpty(data.supervisor)) {
        errors.supervisor = "Campo requerido para tareas internas";
    }
    if (Validator.isEmpty(data.ejecutor_interno)) {
        errors.ejecutor_interno = "Campo requerido";
    }
    if (data.responsable==="externo") {
        if (Validator.isEmpty(data.nit_empresa_externa)) {
            errors.nit_empresa_externa = "Campo requerido para tareas externas";
        }
        if (Validator.isEmpty(data.nombre_empresa_externa)) {
            errors.nombre_empresa_externa = "Campo requerido para tareas externas";
        }
        if (Validator.isEmpty(data.valor_externo)) {
            errors.valor_externo = "Campo requerido para tareas externas";
        }
        if (!Validator.isNumeric(data.valor_externo)) {
            errors.valor_externo = "Campo requerido para tareas externas";
        }
        if(Validator.toInt(data.valor_externo)<0) {
            errors.valor_externo = "Este campo no puede ser negativo"
        }
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
};

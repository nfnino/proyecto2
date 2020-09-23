const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateAssetInput(data) {
    console.log(data)
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.recinto = !isEmpty(data.recinto) ? data.recinto : "";
    data.ubicacion = !isEmpty(data.ubicacion) ? data.ubicacion : "";
    data.categoria = !isEmpty(data.categoria) ? data.categoria : "";
    data.nombre = !isEmpty(data.nombre) ? data.nombre : "";
    data.fecha_compra = !isEmpty(data.fecha_compra) ? data.fecha_compra : "";
    data.valor = !isEmpty(data.valor) ? data.valor : "";
    data.dias_garantia = !isEmpty(data.dias_garantia) ? data.dias_garantia : "";
    data.fecha_fin_garantia = !isEmpty(data.fecha_fin_garantia) ? data.fecha_fin_garantia : "";
    data.dias_frec_mant_preventivo = !isEmpty(data.dias_frec_mant_preventivo) ? data.dias_frec_mant_preventivo : "";
    data.observacion = !isEmpty(data.observacion) ? data.observacion : "";
    data.area = !isEmpty(data.area) ? data.area : "";

    if (Validator.isEmpty(data.recinto)) {
        errors.recinto = "Campo requerido";
    }
    if (Validator.isEmpty(data.ubicacion)) {
        errors.ubicacion = "Campo requerido";
    }
    if (Validator.isEmpty(data.categoria)) {
        errors.categoria = "Campo requerido";
    }
    if (Validator.isEmpty(data.nombre)) {
        errors.nombre = "Campo requerido";
    }
    if (Validator.isEmpty(data.fecha_compra)) {
        errors.fecha_compra = "Campo requerido";
    }
    if (Validator.isEmpty(data.valor)) {
        errors.valor = "Campo requerido";
    }
    if (Validator.isEmpty(data.dias_garantia)) {
        errors.dias_garantia = "Campo requerido";
    }
    if (Validator.isEmpty(data.fecha_fin_garantia)) {
        errors.fecha_fin_garantia = "Campo requerido";
    }
    if (Validator.isEmpty(data.dias_frec_mant_preventivo)) {
        errors.dias_frec_mant_preventivo = "Campo requerido";
    }
    if (Validator.isEmpty(data.observacion)) {
        errors.observacion = "Campo requerido";
    }
    if (Validator.isEmpty(data.area)) {
        errors.area = "Campo requerido";
    }

    //Validación tipo de datos
    if(!Validator.isNumeric(data.valor)) {
        errors.valor = "Sólo valores numéricos"
    }
    if(Validator.toInt(data.valor)<0) {
        errors.valor = "Este campo no puede ser negativo"
    }
    if(!Validator.isNumeric(data.dias_garantia)) {
        errors.dias_garantia = "Sólo valores numéricos"
    }
    if(Validator.toInt(data.dias_garantia)<0) {
        errors.dias_garantia = "Este campo no puede ser negativo"
    }
    if(!Validator.isNumeric(data.dias_frec_mant_preventivo)) {
        errors.dias_frec_mant_preventivo = "Solo valores numéricos"
    }
    if(Validator.toInt(data.dias_frec_mant_preventivo)<0) {
        errors.dias_frec_mant_preventivo = "Este campo no puede ser negativo"
    }
    console.log(errors)
    return {
        errors,
        isValid: isEmpty(errors)
    }
};
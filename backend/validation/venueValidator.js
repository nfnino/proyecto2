const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateVenueInput(data) {
    
    let errors = {};
    
    // Convert empty fields to an empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : "";
    data.country = !isEmpty(data.country) ? data.country : "";
    data.city = !isEmpty(data.city) ? data.city : "";
    data.address = !isEmpty(data.address) ? data.address : "";
    data.postal_code = !isEmpty(data.postal_code) ? data.postal_code : "";
    data.floors = !isEmpty(data.floors) ? data.floors : "";
    data.sections = !isEmpty(data.sections) ? data.sections : "";

    if (Validator.isEmpty(data.name)) {
        errors.name = "Campo requerido";
    }
    if (Validator.isEmpty(data.country)) {
        errors.country = "Campo requerido";
    }
    if (Validator.isEmpty(data.city)) {
        errors.city = "Campo requerido";
    }
    if (Validator.isEmpty(data.address)) {
        errors.address = "Campo requerido";
    }
    if (Validator.isEmpty(data.postal_code)) {
        errors.postal_code = "Campo requerido";
    }
    if (Validator.isEmpty(data.floors)) {
        errors.floors = "Campo requerido";
    }
    if (Validator.isEmpty(data.sections)) {
        errors.sections = "Campo requerido";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
};
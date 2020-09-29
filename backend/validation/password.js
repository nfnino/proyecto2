const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validatePassChange(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.oldPass = !isEmpty(data.oldPass) ? data.oldPass : "";
  data.newPass = !isEmpty(data.newPass) ? data.newPass : "";
// old passw checks
  if (Validator.isEmpty(data.oldPass)) {
    errors.oldPass = "Escriba su contraseña";
  } 
// new passw checks
  if (Validator.isEmpty(data.newPass)) {
    errors.newPass = "Escriba una nueva contraseña";
  }
  if (!Validator.isLength(data.newPass, { min: 8, max: 30 })) {
    errors.newPass = "La contraseña debe tener al menos 8 caracteres";
  }
  if (!Validator.contains(data.newPass, "[0-9A-Z]") && Validator.isAlphanumeric(data.newPass)) {
    errors.newPass = "La contraseña debe tener al menos una mayúscula, un número y un caracter especial";
  }
  console.log(errors)
return {
    errors,
    isValid: isEmpty(errors)
  };
};
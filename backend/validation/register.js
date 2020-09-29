const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateRegisterInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.documento = !isEmpty(data.documento) ? data.documento : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.role = !isEmpty(data.role) ? data.role : "";
  data.area = !isEmpty(data.area) ? data.area : "";

// Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Campo nombre es necesario";
  }
// Document checks
  if (Validator.isEmpty(data.documento)) {
    errors.documento = "Campo documento de identidad es necesario";
  }
// Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Campo email es necesario";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Este email no es válido";
  }
// Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Campo contraseña es necesario";
  }
if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Campo confirmar contraseña es necesario";
  }
if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
    errors.password = "La contraseña debe tener al menos 8 caracteres";
  }
if (!Validator.contains(data.password, "[0-9A-Z]") && Validator.isAlphanumeric(data.password)) {
    errors.password = "La contraseña debe tener al menos una mayúscula, un número y un caracter especial"
  }
if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Las contraseñas deben ser iguales";
  }
// Role checks
if (Validator.isEmpty(data.role)) {
    errors.role = "Campo de rol es necesario";
  }
if (data.role==="Jefe de área" && Validator.isEmpty(data.area)) {
    errors.area = "Para el rol de jefe se debe seleccionar un área correspondiente"
}
return {
    errors,
    isValid: isEmpty(errors)
  };
};
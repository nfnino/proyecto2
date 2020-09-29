const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function roomForAct(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.tareas_activas = !isEmpty(data.tareas_activas) ? data.tareas_activas : 0;

    if (data.tareas_activas>=3) {
        errors.activo = "Este activo supera el número máximo ( 3 ) de tareas activas";
    }
    return {
        errors,
        isv: isEmpty(errors)
    }
};

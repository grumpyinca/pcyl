/**
 * Store current values of design parameters and state variables for potential
 * later use
 */

function update() {

    for ( var property in design_parameters) {
        if (design_parameters.hasOwnProperty(property)) {
            var dp = design_parameters[property];
            dp.oldvalue = dp.value;
        }
    }

    for ( var property in state_variables) {
        if (state_variables.hasOwnProperty(property)) {
            var sv = state_variables[property];
            sv.oldvalue = sv.value;
        }
    }

}

module.exports = update;

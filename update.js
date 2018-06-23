"use strict";
/**
 * Store current values of design parameters and state variables for potential
 * later use
 */

function update() {

    for (let i = 0; i < design_parameters.length; i++) {
        var dp = design_parameters[i];
        dp.oldvalue = dp.value;
    }

    for (let i = 0; i < state_variables.length; i++) {
        var sv = state_variables[i];
        sv.oldvalue = sv.value;
    }

}

module.exports = update;

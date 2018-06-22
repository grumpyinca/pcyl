"use strict";
/**
 * Store current values of design parameters and state variables for potential
 * later use
 */

function update() {

    for (let dp of design_parameters) {
        dp.oldvalue = dp.value;
    }

    for (let sv of state_variables) {
        sv.oldvalue = sv.value;
    }

}

module.exports = update;

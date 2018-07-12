"use strict";
function reset() {
    /** ***************************************************************** */
    /* THIS PROCEDURE RESTORES THE FORMER VALUES TO THE P, X, AND V */
    /* VECTORS WHEN THE TEMPORARY EXPLORATION IS COMPLETED. */
    /** ***************************************************************** */
    for (let i = 0; i < design.design_parameters.length; i++) {
        var dp = design.design_parameters[i];
        dp.value = dp.oldvalue;
    }
    for (let i = 0; i < design.state_variables.length; i++) {
        var sv = design.state_variables[i];
        sv.value = sv.oldvalue;
    }
}
module.exports = reset;

"use strict";
/**
 * Store current values of design parameters and state variables for potential
 * later use
 */
function update() {
    /** ***************************************************************** */
    /* THIS PROCEDURE SETS THE TP, TX AND TV VECTORS EQUAL TO THE */
    /* THE CURRENT VALUES OF THE P, X, AND V VECTORS SO THAT THEY MAY */
    /* BE ALTERED FOR (POSSIBLY) TEMPORARY EXPLORATIONS */
    /** ***************************************************************** */
    for (let i = 0; i < design.design_parameters.length; i++) {
        var dp = design.design_parameters[i];
        dp.oldvalue = dp.value;
    }
    for (let i = 0; i < design.state_variables.length; i++) {
        var sv = design.state_variables[i];
        sv.oldvalue = sv.value;
    }
    /*
     * Used by trade & explore only ... needs work
     * 
     * DO IU=1 TO M; TV(IU)=V(IU); END;
     */
}
module.exports = update;

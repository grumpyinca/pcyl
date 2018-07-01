"use strict";
/**
 * Store current values of design parameters and state variables for potential
 * later use
 */

//@@@ UPDATE: PROCEDURE(p);
function update() {
    //@@@ 
    //@@@ %include 'maxdims.inc';
    //@@@ 
    //@@@ declare p(nmax) float;
    //@@@ 
    //@@@ %include 'state.inc';
    //@@@ %include 'control.inc';
    //@@@ %include 'scratch.inc';
    //@@@ 
    /** ***************************************************************** */
    /* THIS PROCEDURE SETS THE TP, TX AND TV VECTORS EQUAL TO THE */
    /* THE CURRENT VALUES OF THE P, X, AND V VECTORS SO THAT THEY MAY */
    /* BE ALTERED FOR (POSSIBLY) TEMPORARY EXPLORATIONS */
    /** ***************************************************************** */
    //@@@ 
    //@@@ declare iu fixed;
    //@@@ 
    //@@@ DO IU=1 TO N;
    for (let i = 0; i < design.design_parameters.length; i++) {
        var dp = design.design_parameters[i];
        //@@@ TP(IU)=P(IU);
        dp.oldvalue = dp.value;
        //@@@ END;
    }
    //@@@ 
    //@@@ DO IU=1 TO K;
    for (let i = 0; i < design.state_variables.length; i++) {
        var sv = design.state_variables[i];
        //@@@ TX(IU)=X(IU);
        sv.oldvalue = sv.value;
        //@@@ END;
    }
    //@@@ 
    /*
     * Used by trade & explore only ... needs work
     * 
     * DO IU=1 TO M; TV(IU)=V(IU); END;
     */
    //@@@ 
    //@@@ END UPDATE;
}

module.exports = update;

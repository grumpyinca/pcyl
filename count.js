"use strict";
/**
 * Set nfixed, nstf and nfdcl by direct count Insures that these values are
 * consistent, eliminates need for bookkeeping.
 */
function count() {
    /** ***************************************************************** */
    /* THIS PROCEDURE SETS NFIXED AND NSTF BY COUNTING THE NUMBER OF */
    /* DESIGN PARAMETERS AND STATE VARIABLES IN FIXED STATUS. USE OF */
    /* THIS ROUTINE INSURES THAT THE TOTAL IS ALWAYS ACCURATE AND NOT */
    /* SUBJECT TO ACCIDENTAL USER OVER_RIDE. */
    /** ***************************************************************** */
    NFDCL = 0;
    NFIXED = 0;
    for (let i = 0; i < design.design_parameters.length; i++) {
        var dp = design.design_parameters[i];
        if (dp.lmin == FIXEDSTAT) {
            NFIXED++;
        }
        if (dp.lmin < FREESTAT) {
            NFDCL++;
        }
        if (dp.lmax < FREESTAT) {
            NFDCL++;
        }
    }
    NSTF = 0;
    for (let i = 0; i < design.state_variables.length; i++) {
        var sv = design.state_variables[i];
        if (sv.lmin == FIXEDSTAT) {
            NSTF++;
        }
        if (sv.lmin < FREESTAT) {
            NFDCL++;
        }
        if (sv.lmax < FREESTAT) {
            NFDCL++;
        }
    }
}
module.exports = count;

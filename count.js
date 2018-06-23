"use strict";
/**
 * Set nfixed, nstf and nfdcl by direct count Insures that these values are
 * consistent, eliminates need for bookkeeping.
 */

function count() {

    NFDCL = 0;
    NFIXED = 0;
    for (let i = 0; i < design_parameters.length; i++) {
        var dp = design_parameters[i];
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
    for (let i = 0; i < state_variables.length; i++) {
        var sv = state_variables[i];
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

    // console.log('design parameters = ', design_parameters);
    // console.log('state variables = ', state_variables);
    // console.log('FREESTAT, SETSTAT, FIXEDSTAT: ', FREESTAT, SETSTAT, FIXEDSTAT);
    // console.log('count: NFIXED, NSTF, NFDCL = ', NFIXED, NSTF, NFDCL);
}

module.exports = count;

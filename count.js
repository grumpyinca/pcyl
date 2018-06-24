"use strict";
/**
 * Set nfixed, nstf and nfdcl by direct count Insures that these values are
 * consistent, eliminates need for bookkeeping.
 */

// COUNT:  PROCEDURE;
function count() {
    // %include 'maxdims.inc';
    // %include 'control.inc';
    // %include 'state.inc';
    // %include 'symbols.inc';
    //
    // /********************************************************************/
    // /*  THIS PROCEDURE SETS NFIXED AND NSTF BY COUNTING THE NUMBER OF   */
    // /*  DESIGN PARAMETERS AND STATE VARIABLES IN FIXED STATUS.  USE OF  */
    // /*  THIS ROUTINE INSURES THAT THE TOTAL IS ALWAYS ACCURATE AND NOT  */
    // /*  SUBJECT TO ACCIDENTAL USER OVER_RIDE.               */
    // /********************************************************************/
    //
    // declare i fixed;
    //
    NFDCL = 0;
    // NFIXED=0;
    NFIXED = 0;
    // DO I=1 TO N;
    for (let i = 0; i < design_parameters.length; i++) {
        var dp = design_parameters[i];
        // if lmin(I) = FIXEDSTAT then nfixed=nfixed+1;
        if (dp.lmin == FIXEDSTAT) {
            NFIXED++;
        }
        if (dp.lmin < FREESTAT) {
            NFDCL++;
        }
        if (dp.lmax < FREESTAT) {
            NFDCL++;
        }
        // END;
    }
    //
    // NSTF=0;
    NSTF = 0;
    // DO I=1 TO K;
    for (let i = 0; i < state_variables.length; i++) {
        var sv = state_variables[i];
        // if lmin(i+n) = FIXEDSTAT then nstf=nstf+1;
        if (sv.lmin == FIXEDSTAT) {
            NSTF++;
        }
        if (sv.lmin < FREESTAT) {
            NFDCL++;
        }
        if (sv.lmax < FREESTAT) {
            NFDCL++;
        }
        // END;
    }
    // console.log('design parameters = ', design_parameters);
    // console.log('state variables = ', state_variables);
    // console.log('FREESTAT, SETSTAT, FIXEDSTAT: ', FREESTAT, SETSTAT, FIXEDSTAT);
    // console.log('count: NFIXED, NSTF, NFDCL = ', NFIXED, NSTF, NFDCL);
    //
    // nfdcl=0;
    // do i=1 to m;
    // if lmin(i) < FREESTAT then nfdcl=nfdcl+1;
    // if lmax(i) < FREESTAT then nfdcl=nfdcl+1;
    // end;
    //
    //
    //   END COUNT;
}

module.exports = count;

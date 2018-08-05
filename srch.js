"use strict";
/**
 * Compress fixed members out of parameter vector; call designated search
 * routine; put results into original parameter vector
 */
var despak = require('./despak');
var patsh = require('./patsh');
function srch() {
    /** ***************************************************************** */
    /* THIS PROCEDURE COMPRESSES THE PARAMETER VECTOR IF ANY DESIGN */
    /* PARAMETERS ARE IN FIXED STATUS, CALLS THE DEFAULT SEARCH ROUTINE */
    /* THEN PUTS THE RESULTS INTO THE ORIGINAL PARAMETER VECTOR */
    /** ***************************************************************** */
    var obj;
    var pc = [];
    var nfree = design.design_parameters.length;
    /** **** compress P into PC ***** */
    if (NFIXED != 0) {
        nfree = 0;
        for (let i = 0; i < design.design_parameters.length; i++) {
            var dp = design.design_parameters[i];
            if (dp.lmin != FIXEDSTAT) {
                nfree++;
                pc[nfree - 1] = dp.value;
            }
        }
        if (nfree == 0) {
            NCODE = 'ABORT';
            console.log('SEARCH ABORTED... CHECK SEARCH ROUTINE NAME OR NFREE.');
        }
    } else
        /** * copy p into pc ** */
        for (let i = 0; i < design.design_parameters.length; i++) {
            var dp = design.design_parameters[i];
            pc[i] = dp.value;
        }
    NSRCH = true;
    var delarg = DEL;
    obj = patsh(pc, delarg, DELMIN, OBJMIN, MAXIT, TOL);
    NSRCH = false;
    var kd = 0;
    /** ***** expand PC into P ******** */
    if (NFIXED > 0) {
        for (let i = 0; i < design.design_parameters.length; i++) {
            var dp = design.design_parameters[i];
            if (dp.lmin != FIXEDSTAT)
                dp.value = pc[i - kd];
            else
                kd++;
        }
    }
    /** * copy pc into p ** */
    else
        for (let i = 0; i < design.design_parameters.length; i++) {
            var dp = design.design_parameters[i];
            dp.value = pc[i];
        }
    var p = [];
    for (let i = 0; i < design.design_parameters.length; i++) {
        var dp = design.design_parameters[i];
        p[i] = dp.value;
    }
    var i = SOUGHT;
    SOUGHT = 0;
    obj = despak(p); /* INSURE THAT RETURNED VALUES ARE CURRENT */
    SOUGHT = i; /* THE SEARCH ROUTINES SOMETIMES GOOF */
    return obj;
}
module.exports = srch;

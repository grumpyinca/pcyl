"use strict";
/**
 * despak - Expand any compressed design parameters and call the equation set.
 */
var eqnset1 = require('./eqnset1');
function despak(p) {
    /** ***************************************************************** */
    /*
     * EQNSET contains an equation set providing a math model of the design
     * problem. The values of the problem independent variables (P) are input to
     * it via the argument list. Constraint Levels (C) are input via external.
     * The values of the problem dependent variables (X), constraint violations
     * (V), and the Merit Function (if any) are returned via external.
     */
    /** ***************************************************************** */
    /*
     * P=vector of design parameters (length=N) X=vector of state variables (
     * =K) M=K+N, L=vector of constraint control info ( =M) LMIN, LMAX V=vector
     * of constraint violations ( =M) VMIN, VMAX C=vector of constraint levels (
     * =M) CMIN, CMAX S=vector of constraint scaling denominators (=M) SMIN,
     * SMAX D=vector of externally computed quantities
     * 
     * NFIXED = number of fixed design parameters NSTF = number of fixed state
     * variables
     * 
     * If constraint is set, then LMIN or LMAX = 1; otherwise = 0. If fixed,
     * then LMIN = LMAX = 2; SMIN, SMAX are biased by FIX_WT.
     * 
     * VIOL_WT, M_NUM, M_DEN, & SOUGHT ARE PASSED IN FROM MAIN TO PROVIDE
     * AUTOMATIC AND MANUAL CONTROL OVER THE OBJECTIVE FUNCTION CONSTRUCTION
     * 
     * NSTF = NUMBER OF FIXED STATE VARIABLES
     */
    /** ***************************************************************** */
    /*
     * If the call is from SRCH, (nsrch=1) then the fixed members of the design
     * parameter vector will have been compressed out by SRCH. In this case,
     * DESPAK expands the parameter vector by inserting the proper members from
     * the "DP" vector passed in external from SRCH.
     * 
     * NSRCH=0 ==> the call is from the cadsys main program and the fixed
     * members have *** NOT *** been compressed out of the parameter vector by
     * SRCH.
     * 
     * The value of NMERIT is determined by the user directly in the cadsys main
     * procedure. The correspondance to any user supplied EQNSET routine is made
     * here.
     * 
     * Consider moving the code that zero's out VMIN & VMAX to a place that is
     * outside the SEARCH loop; eg. the FREE command.
     */
    /** ***************************************************************** */
    // TODO: code the following for release 0.3 
    var kd = 0;
    if (NFIXED > 0 && NSRCH == true) {
        for (let i = 0; i < design.design_parameters.length; i++) {
            var dp = design.design_parameters[i];
            if (dp.lmin != FIXEDSTAT)
                dp.value = p[i - kd];
            else {
                kd++;
            }
        }
    } else {
        for (let i = 0; i < design.design_parameters.length; i++) {
            var dp = design.design_parameters[i];
            dp.value = p[i];
        }
    }
    eqnset1();
    // TODO: code the following for release 0.6
    /** ***************************************************************** */
    /*
     * Implement functionally determined constraint levels:
     */
    // TODO: FDCL
    /*
     * The following section of code constructs the objective function from the
     * constraint violations, merit function, and state variable fix violations.
     * It is not problem dependent.
     */
    /* Constraint Violations */
    var viol_sum = 0.0;
    for (let i = 0; i < design.design_parameters.length; i++) {
        var dp = design.design_parameters[i];
        dp.vmin = 0.0;
        dp.vmax = 0.0;
        if (dp.lmin == SETSTAT || dp.lmin < FREESTAT) {
            dp.vmin = (-dp.value + dp.cmin) / dp.smin;
//            console.log('name=',dp.name,' vmin=',dp.vmin);
        }
        if (dp.lmax == SETSTAT || dp.lmax < FREESTAT) {
            dp.vmax = (dp.value - dp.cmax) / dp.smax;
//            console.log('name=',dp.name,' vmax=',dp.vmax);
        }
        if (dp.vmin > 0.0)
            viol_sum = viol_sum + dp.vmin * dp.vmin;
        if (dp.vmax > 0.0)
            viol_sum = viol_sum + dp.vmax * dp.vmax;
    }

    for (let i = 0; i < design.state_variables.length; i++) {
        var sv = design.state_variables[i];
        sv.vmin = 0.0;
        sv.vmax = 0.0;
        /* State variable fix levels. */
        /*
         * The fix_wt's are automatically incorporated in the scaling denominators
         * S(I+N) by the main routine.
         * 
         * This version reduces penalty of large fix violations.
         */
        if (sv.lmin == FIXEDSTAT) {
            sv.vmin = (-sv.value + sv.cmin) / sv.smin;
//            console.log('name=',sv.name,' vminF=',sv.vmin);
            sv.vmax = -sv.vmin;
//            console.log('name=',sv.name,' vmaxF=',sv.vmax);
            if (sv.vmin > 1.0) {
                viol_sum = viol_sum + sv.vmin;
            } else if (sv.vmin < -1.0) {
                viol_sum = viol_sum - sv.vmin;
            } else {
                viol_sum = viol_sum + sv.vmin * sv.vmin;
            }
        } else {
            if (sv.lmin == SETSTAT || sv.lmin < FREESTAT) {
                sv.vmin = (-sv.value + sv.cmin) / sv.smin;
//                console.log('name=',sv.name,' vmin=',sv.vmin,' value=',sv.value,' cmin=',sv.cmin,' smin=',sv.smin);
            }
            if (sv.lmax == SETSTAT || sv.lmax < FREESTAT) {
                sv.vmax = (sv.value - sv.cmax) / sv.smax;
//                console.log('name=',sv.name,' vmax=',sv.vmax,' value=',sv.value,' cmax=',sv.cmax,' smax=',sv.smax);
            }
            if (sv.vmin > 0.0)
                viol_sum = viol_sum + sv.vmin * sv.vmin;
            if (sv.vmax > 0.0)
                viol_sum = viol_sum + sv.vmax * sv.vmax;
        }
    }
    
    /* Merit Function */
    if (SOUGHT == 0)
        var m_funct = 0.0;
    else if (SOUGHT > 0) {
        var dp = design.design_parameters[SOUGHT - 1];
        if (SDIR < 0)
            var m_funct = (dp.value - M_NUM) / M_DEN;
        else
            var m_funct = (-dp.value + M_NUM) / M_DEN;
    } else {
        var sv = design.state_variables[-SOUGHT - 1];
        if (SDIR < 0)
            var m_funct = (sv.value - M_NUM) / M_DEN;
        else
            var m_funct = (-sv.value + M_NUM) / M_DEN;
    }
    
    var obj = VIOL_WT * viol_sum + m_funct;
    return obj;
}
module.exports = despak;

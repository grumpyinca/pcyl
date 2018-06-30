"use strict";

// RESET:  PROCEDURE(p);
function reset() {
    // 
    //  %include 'maxdims.inc';
    // 
    //  declare p(nmax) float;
    // 
    //  %include 'state.inc';
    //  %include 'control.inc';
    //  %include 'scratch.inc';
    // 
    //  /********************************************************************/
    //  /*  THIS PROCEDURE RESTORES THE FORMER VALUES TO THE P, X, AND V    */
    //  /*  VECTORS WHEN THE TEMPORARY EXPLORATION IS COMPLETED.        */
    //  /********************************************************************/
    //  DECLARE I;
    // 
    //  DO  I=1 TO N;
    for (let i = 0; i < design.design_parameters.length; i++) {
        var dp = design.design_parameters[i];
        //  P(I)=TP(I);
        dp.value = dp.oldvalue;

        //  END;
    }
    // 
    //  DO I=1 TO K;
    for (let i = 0; i < design.state_variables.length; i++) {
        var sv = design.state_variables[i];
        //  X(I)=TX(I);
        sv.value = sv.oldvalue;
        //  END;
    }
    // 
    // END RESET;
}

"use strict";
/**
 * Compress fixed members out of parameter vector; call designated search
 * routine; put results into original parameter vector
 */

var despak = require('./despak');
var patsh = require('./patsh');

function srch(p) {

    //    SRCH: PROCEDURE(p,obj);
    //
    //%include 'maxdims.inc';
    //%include 'symbols.inc';
    //
    //declare (p(nmax), obj) float;
    //
    //%include 'control.inc';
    //%include 'search.inc';
    //%include 'state.inc';
    //
    ///********************************************************************/
    ///*  THIS PROCEDURE COMPRESSES THE PARAMETER VECTOR IF ANY DESIGN    */
    ///*  PARAMETERS ARE IN FIXED STATUS, CALLS THE DEFAULT SEARCH ROUTINE*/
    ///*  THEN PUTS THE RESULTS INTO THE ORIGINAL PARAMETER VECTOR        */
    ///********************************************************************/
    //
    //DECLARE (I, j, kd, nfree, maxitag) fixed;
    //declare (pc(nmax), delag) float;
    var pc = [];
    //
    //declare  PATSH   entry (
    //          (nmax)float, float, fixed, float, float, float,
    //            fixed, float, character(32) varying
    //         ),
    //
    //     THETA   entry (
    //          (nmax)float, fixed, (4)float, float, fixed,
    //          fixed, character(32) varying
    //         ),
    //
    //     DESPAK  entry (
    //         (nmax)float, float
    //         );
    //
    //
    //    NFREE=N;
    var nfree = design_parameters.length;
    //    IF NFIXED ^= 0 THEN            /******  compress P into PC  ******/
    if (NFIXED != 0) {
    //          DO;
    //          NFREE=0;
        nfree = 0;
    //
    //          DO I=1 TO N;
        for (let dp of design_parameters) {
    //          DP(I)=P(I);
    //          IF lmin(I) ^= FIXEDSTAT THEN do;
            if (dp.lmin != FIXEDSTAT) {
    //         NFREE=NFREE+1;
                nfree++;
    //         pc(nfree)=p(i);
                pc.push(dp.value);
    //         end;
            }
    //          END;
        }
    //
    //          IF NFREE=0 THEN GO TO AB1;
        if (nfree == 0) {
            NCODE='ABORT';
            console.log('SEARCH ABORTED... CHECK SEARCH ROUTINE NAME OR NFREE.');
        }
    //          END;
    }
    //       else
    else
    //          do i=1 to n;               /***  copy p into pc  ***/
        for (let dp of design_parameters) {
    //          pc(i)=p(i);
            pc.push(dp.value);
                
    //          end;
        }
    //
    //    NSRCH=1;
    NSRCH = true;
    //
    //    IF WEAPON = 1 THEN DO;
    //         DELAG=DEL;
    var delag = DEL;
    //         MAXITAG=MAXIT;
    var maxitag = MAXIT;
    //         ncode=ioopt;
    //         PUT SKIP;
    //
    //         CALL PATSH
    //           (pc,OBJ,NFREE,DELAG,DELMIN,OBJMIN,MAXITAG,TOL,NCODE);
    var obj=patsh(pc,nfree,delag,DELMIN,OBJMIN,maxitag,TOL);  
    //
    //         GO TO UNPK;
    //         END;
    //
    //    IF WEAPON = 2 THEN DO;
    //         NCODE=OPTION;
    //         P(NFREE+1)=GAMMA_ZERO;
    //         P(NFREE+2)=OMEGA_ZERO;
    //         PUT SKIP;
    //
    //         CALL THETA(pc,NFREE,ETA,OBJMIN,MAXIT,MODE,NCODE);
    //
    //         GO TO UNPK;
    //         END;
    //
    //   AB1:
    //    NCODE='ABORT';
    //    PUT SKIP EDIT
    //       ('SEARCH ABORTED... CHECK SEARCH ROUTINE NAME OR NFREE.') (A);
    //
    //   UNPK:
    //      NSRCH=0;
    NSRCH = false;
    //      kd=0;
    //      IF NFIXED > 0 THEN         /*******  expand PC into P  *********/
    if (NFIXED > 0)
    //        do i=1 to n;
        for (let dp of design_parameters) {
    //        if lmin(i) ^= FIXEDSTAT then p(i)=pc(i-kd);
            if (dp.lmin != FIXEDSTAT) dp.value = pc.shift();
    //                    else kd=kd+1;
    //        end;
        }
    //         else                     /*** copy pc into p  ***/
        else
    //        do i=1 to n;
            for (let dp of design_parameters) {
    //        p(i)=pc(i);
                dp.value = pc.shift();
    //        end;
            }
    //
    //      i=sought;
    //      sought=0;
    //      CALL DESPAK(P,OBJ);    /*  INSURE THAT RETURNED VALUES ARE CURRENT */
    var p = [];
    for (let dp of design_parameters) 
        p.push(dp.value);
    obj = despak(p);
    //      sought=i;               /*  THE SEARCH ROUTINES SOMETIMES GOOF */
    //
    //    END SRCH;

    return obj;
}

module.exports = srch;

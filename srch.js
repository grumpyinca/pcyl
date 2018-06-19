/**
 * Compress fixed members out of parameter vector; call designated search
 * routine; put results into original parameter vector
 */

var despak = require('./despak');
var patsh = require('./patsh');

function srch() {

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
    //    IF NFIXED ^= 0 THEN            /******  compress P into PC  ******/
    //          DO;
    //          NFREE=0;
    //
    //          DO I=1 TO N;
    //          DP(I)=P(I);
    //          IF lmin(I) ^= FIXEDSTAT THEN do;
    //         NFREE=NFREE+1;
    //         pc(nfree)=p(i);
    //         end;
    //          END;
    //
    //          IF NFREE=0 THEN GO TO AB1;
    //          END;
    //       else
    //          do i=1 to n;               /***  copy p into pc  ***/
    //          pc(i)=p(i);
    //          end;
    //
    //    NSRCH=1;
    //
    //    IF WEAPON = 1 THEN DO;
    //         DELAG=DEL;
    //         MAXITAG=MAXIT;
    //         ncode=ioopt;
    //         PUT SKIP;
    //
    //         CALL PATSH
    //           (pc,OBJ,NFREE,DELAG,DELMIN,OBJMIN,MAXITAG,TOL,NCODE);
    var obj=patsh();  // TODO:  add parameters
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
    //      kd=0;
    //      IF NFIXED > 0 THEN         /*******  expand PC into P  *********/
    //        do i=1 to n;
    //        if lmin(i) ^= FIXEDSTAT then p(i)=pc(i-kd);
    //                    else kd=kd+1;
    //        end;
    //         else                     /*** copy pc into p  ***/
    //        do i=1 to n;
    //        p(i)=pc(i);
    //        end;
    //
    //      i=sought;
    //      sought=0;
    //      CALL DESPAK(P,OBJ);    /*  INSURE THAT RETURNED VALUES ARE CURRENT */
    //      sought=i;               /*  THE SEARCH ROUTINES SOMETIMES GOOF */
    //
    //    END SRCH;

    return obj;
}

module.exports = srch;

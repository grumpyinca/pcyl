/**
 * Hooke & Jeeves Pattern Search - find minimum of objective function.
 */

var despak = require('./despak');

function patsh() {

    //    PATSH:  PROCEDURE(PSI,SSI,N,DEL,DELMIN,OBJMIN,MAXIT,TOL,NCODE);
    //
    //%include 'maxdims.inc';
    //%include 'control.inc';                             /*  ansisw only  */
    //
    //DECLARE (PSI(nmax), PHI(nmax), THT(nmax), EPS(nmax),
    //     DEL, DELMIN, OBJMIN, ALPHA, S, SSI, SPI, TOL) FLOAT;
    //DECLARE (DEST LABEL,
    //     NCODE CHARACTER(32) VARYING,
    //     STR   CHARACTER(16) VARYING);
    //DECLARE (SYSIN,
    //     SYSPRINT) file;
    //DECLARE  XFLAG(nmax) FIXED;
    //DECLARE  DESPAK EXTERNAL ENTRY ((nmax)float, float);
    //declare (i, k, n, maxit, itno, ioopt) fixed;
    //
    //declare
    //     cuu    character(4) static initial('^[[1A'),
    //     coninp  entry returns(char(1))      /* DOS INTERRUPT 6a */
    //   ;
    //
    //ioopt=ncode;
    //
    //ITNO=0;
    //ALPHA=1.05;
    //
    //do i=1 to nmax;
    //  XFLAG(i)=1;
    //end;
    //CALL DESPAK(PSI,SSI);
    //IF SSI <= OBJMIN THEN DO;
    //   NCODE='NO SEARCH - AT OBJMIN';
    //   RETURN;
    //   END;
    //
    //L100:
    //S=SSI;
    //DO I=1 TO N;   PHI(I)=PSI(I);   END;
    //DEST=L160;
    //GO TO L150;
    //
    //L160:
    //IF S+TOL*ABS(SSI) < SSI THEN GO TO L200;
    //GO TO L300;
    //
    //L200:
    //SSI=S;
    //IF S < OBJMIN THEN DO;
    //     NCODE='OBJMIN';
    //     IF ITNO <= 2 THEN NCODE=NCODE !! ' - SHORT SEARCH';
    //    ELSE DO;
    //      str=itno;
    //      NCODE=NCODE !! '    ' !! STR !! ' ITER.';
    //      END;
    //     GO TO L400;
    //   END;
    //ITNO=ITNO+1;
    //
    //if ioopt = 3 then put edit('.') (a);
    //    else if ioopt = 4 then do;
    //   if ansisw = 1 then put edit(cuu) (a);
    //   put skip edit
    //          ('ITER.', itno, '    OBJ =', SSI, '    DEL =', DEL)
    //          (a, f(4,0), a, f(15,6), a, f(11,6));
    //   end;
    //
    //IF ITNO > MAXIT | coninp() = '^[' THEN DO;              /*  Esc key  */
    //  PUT SKIP EDIT
    //   ('MAXIT EXCEEDED',
    //    'ITER.', itno, '    OBJ =', SSI, '    DEL =', DEL,
    //    'CONTINUE ?   (y/N): ')
    //   (a, skip, a, f(4,0), a, f(15,6), a, f(11,6), skip, a);
    //  GET EDIT(STR) (A);
    //  if substr(str,1,1)='y' | substr(str,1,1)='Y' then do;
    //     ITNO=0;
    //     GO TO MORE;
    //     END;
    //  NCODE='MAXIT';
    //  str=itno;
    //  NCODE=NCODE !! '    ' !! STR !! ' ITER.';
    //  RETURN;
    //  END;
    //
    //MORE:
    //DO I=1 TO N;
    //  THT(I)=PSI(I);
    //  PSI(I)=PHI(I);
    //  PHI(I)=PHI(I)+ALPHA*(PHI(I)-THT(I));
    //END;
    //CALL DESPAK(PHI,SPI);
    //S=SPI;
    //DEST=L260;
    //GO TO L150;
    //
    //L260:
    //IF S+TOL*ABS(SSI) < SSI THEN GO TO L200;
    //GO TO L100;
    //
    //L300:
    //IF DEL < DELMIN THEN DO;
    //     NCODE='DELMIN';
    //     IF ITNO <= 2 THEN NCODE=NCODE !! ' - SHORT SEARCH';
    //     ELSE DO;
    //      str=itno;
    //      NCODE=NCODE !! '    ' !! STR !! ' ITER.';
    //      END;
    //     RETURN;
    //     END;
    //DEL=DEL/1.9;
    //if ioopt = 3 then put edit(',') (a);
    //GO TO L100;
    //
    //L150:
    //DO K=1 TO N;
    //  EPS(K)=0.05*PHI(K);
    //  IF EPS(K) = 0.0 THEN EPS(K)=0.05;
    //  PHI(K)=PHI(K)+EPS(K)*DEL*XFLAG(K);
    //  CALL DESPAK(PHI,SPI);
    //  IF SPI < S THEN GO TO L179;
    //  XFLAG(K)=-XFLAG(K);
    //  PHI(K)=PHI(K)+2.0*EPS(K)*DEL*XFLAG(K);
    //  CALL DESPAK(PHI,SPI);
    //  IF SPI < S THEN GO TO L179;
    //  PHI(K)=PHI(K)-EPS(K)*DEL*XFLAG(K);
    //  GO TO L180;
    //L179:
    //  S=SPI;
    //L180:
    //END L150;
    //GO TO DEST;
    //
    //L400:
    //DO I=1 TO N;   PSI(I)=PHI(I);   END;
    //
    //END PATSH;

    return 0.00000;  //  TODO: test case ... fix me
}

module.exports = patsh;

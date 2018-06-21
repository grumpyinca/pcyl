/**
 * Hooke & Jeeves Pattern Search - find minimum of objective function.
 */

var despak = require('./despak');

function patsh(psi,n,del,delmin,objmin,maxit,tol) {

    //EXPLORE: PROC(PHI, S, DEL);
    //DCL EPS, XFLAG;
    //DO K=1 TO N;
    //  EPS(K)=0.05*PHI(K);
    //  IF EPS(K) = 0.0 THEN EPS(K)=0.05;
    //  PHI(K)=PHI(K)+EPS(K)*DEL*XFLAG(K);
    //  CALL DESPAK(PHI,SPI);
    //  IF SPI < S THEN DO;
    //      S=SPI;
    //  END;
    //  ELSE DO;
    //      XFLAG(K)=-XFLAG(K);
    //      PHI(K)=PHI(K)+2.0*EPS(K)*DEL*XFLAG(K);
    //      CALL DESPAK(PHI,SPI);
    //      IF SPI < S THEN DO;
    //        S=SPI;
    //      END;
    //      ELSE DO;
    //        PHI(K)=PHI(K)-EPS(K)*DEL*XFLAG(K);
    //      END;
    //  END;
    //END EXPLORE;
    //
    //ITNO=0;
    var itno = 0;
    //ALPHA=1.05;
    var alpha = 1.05;
    //
    var xflag = [];
    //do i=1 to nmax;
    for (var i = 0; i < psi.length; i++)
        xflag.push(1);
    //  XFLAG(i)=1;
    //end;
    //CALL DESPAK(PSI,SSI);
    var ssi = despak(psi);
    //IF SSI <= OBJMIN THEN DO;
    if (ssi <= objmin) {
    //   RETURN;
        return ssi;
    //   END;
    }
    //
    //DO WHILE(SSI >= OBJMIN);
    //  S=SSI;
    //  DO I=1 TO N;   PHI(I)=PSI(I);   END;
    //  CALL EXPLORE(PHI, S, DEL);
    //  DO WHILE (S >= OBJMIN & S+TOL*ABS(SSI) < SSI);
    //    SSI=S;
    //    IF S >= OBJMIN DO;
    //      ITNO=ITNO+1;
    //      IF ITNO > MAXIT RETURN;
    //      DO I=1 TO N;
    //        THT(I)=PSI(I);
    //        PSI(I)=PHI(I);
    //        PHI(I)=PHI(I)+ALPHA*(PHI(I)-THT(I));
    //      END;
    //      CALL DESPAK(PHI,SPI);
    //      S=SPI;
    //      CALL EXPLORE(PHI, S, DEL);
    //    END;
    //  END;
    //  IF S+TOL*ABS(SSI) >= SSI DO;
    //    IF DEL < DELMIN RETURN;
    //    DEL=DEL/1.9;
    //  END;
    //END;
    //
    //DO I=1 TO N;   PSI(I)=PHI(I);   END;

    return ssi;
}

module.exports = patsh;

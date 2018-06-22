"use strict";
/**
 * Hooke & Jeeves Pattern Search - find minimum of objective function.
 */

var despak = require('./despak');

function patsh(psi,n,del,delmin,objmin,maxit,tol) {

    var xflag = [];

    //EXPLORE: PROC(PHI, S, DEL);
    function patsh_explore(phi, s, del) {
    //DCL EPS;
        var eps = [];
    //DO K=1 TO N;
        for (let k = 0; k < phi.length; k++) {
    //  EPS(K)=0.05*PHI(K);
            eps[k] = 0.05 * phi[k];
    //  IF EPS(K) = 0.0 THEN EPS(K)=0.05;
            if (eps[k] == 0.0 ) eps[k] = 0.05;
    //  PHI(K)=PHI(K)+EPS(K)*DEL*XFLAG(K);
            phi[k] = phi[k] + eps[k] * del * xflag[k];
    //  CALL DESPAK(PHI,SPI);
            var spi = despak(phi);
    //  IF SPI < S THEN DO;
            if (spi < s) {
    //      S=SPI;
                s = spi;
    //  END;
            }
    //  ELSE DO;
            else {
    //      XFLAG(K)=-XFLAG(K);
                xflag[k] = -xflag[k];
    //      PHI(K)=PHI(K)+2.0*EPS(K)*DEL*XFLAG(K);
                phi[k] = phi[k] + 2.0 * eps[k] * del * xflag[k];
    //      CALL DESPAK(PHI,SPI);
                var spi = despak(phi);
    //      IF SPI < S THEN DO;
                if (spi < s) {
    //        S=SPI;
                    s = spi;
    //      END;
                }
    //      ELSE DO;
                else {
    //        PHI(K)=PHI(K)-EPS(K)*DEL*XFLAG(K);
                    phi[k] = phi[k] - eps[k] * del * xflag[k];
    //      END;
                }
    //  END;
            }
    //END;
        }
        return s;
    //END EXPLORE;
    }
    //
    //ITNO=0;
    var itno = 0;
    //ALPHA=1.05;
    var alpha = 1.05;
    //
    //do i=1 to nmax;
    for (var i = 0; i < psi.length; i++)
    //  XFLAG(i)=1;
        xflag[i] = 1;
    //end;
    //
    //CALL DESPAK(PSI,SSI);
    var ssi = despak(psi);

    //DO WHILE(SSI >= OBJMIN);
    while (ssi >= OBJMIN) {
    //  S=SSI;
        var s = ssi;
    //  DO I=1 TO N;   PHI(I)=PSI(I);   END;
        var phi = [];
        for (let i = 0; i < psi.length; i++)
            phi[i] = psi[i];
    //  CALL EXPLORE(PHI, S, DEL);
        s = patsh_explore(phi, s, del);
    //  DO WHILE (S >= OBJMIN & S+TOL*ABS(SSI) < SSI);
        while (s >= OBJMIN && s+tol*Math.abs(ssi) < ssi) {
    //    SSI=S;
            ssi = s;
    //    IF S < OBJMIN
            if (s >= OBJMIN) {
    //      ITNO=ITNO+1;
                itno++;
    //      IF ITNO > MAXIT RETURN;
                if (itno > maxit) return ssi;
    //      DO I=1 TO N;
                var tht = [];
                for (let i = 0; i < psi.length; i++) {
    //        THT(I)=PSI(I);
                    tht[i] = psi[i];
    //        PSI(I)=PHI(I);
                    psi[i] = phi[i];
    //        PHI(I)=PHI(I)+ALPHA*(PHI(I)-THT(I));
                    phi[i] = phi[i] + alpha * (phi[i] - tht[i]);
    //      END;
                }
    //      S = CALL DESPAK(PHI);
                var spi = despak(phi);
    //          s = ssi;
                s = spi;
    //      CALL EXPLORE(PHI, S, DEL);
                s = patsh_explore(phi, s, del);
    //    END;
            }
    //  END;
        }
    //  IF S+TOL*ABS(SSI) >= SSI DO;
        if (s+tol*Math.abs(ssi) >= ssi) {
    //    IF DEL < DELMIN RETURN;
            if (del < delmin) return ssi;
    //    DEL=DEL/1.9;
            del = del / 1.9;
    //  END;
        }
        ssi = s;
    //END;
    }
    //
    //DO I=1 TO N;   PSI(I)=PHI(I);   END;
    for (let i = 0; i < psi.length; i++)
        psi[i] = phi[i];

    return ssi;
}

module.exports = patsh;

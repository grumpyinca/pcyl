"use strict";
/**
 * Hooke & Jeeves Pattern Search - find minimum of objective function.
 */
var despak = require('./despak');
var sprintf = require("sprintf-js").sprintf;
function patsh(psi, del, delmin, objmin, maxit, tol) {
    var xflag = [];
    function patsh_explore(phi, s, del) {
        var eps = [];
        for (let k = 0; k < phi.length; k++) {
            eps[k] = 0.05 * phi[k];
            if (eps[k] == 0.0)
                eps[k] = 0.05;
            phi[k] = phi[k] + eps[k] * del * xflag[k];
            var spi = despak(phi);
            if (spi < s) {
                s = spi;
            }
            else {
                xflag[k] = -xflag[k];
                phi[k] = phi[k] + 2.0 * eps[k] * del * xflag[k];
                var spi = despak(phi);
                if (spi < s) {
                    s = spi;
                } else {
                    phi[k] = phi[k] - eps[k] * del * xflag[k];
                }
            }
        }
        return s;
    }
    var itno = 0;
    var alpha = 1.05;
    for (var i = 0; i < psi.length; i++)
        xflag[i] = 1;
    var phi = [];
    for (let i = 0; i < psi.length; i++)
        phi[i] = psi[i];
    var ssi = despak(psi);
    while (ssi >= objmin) {
        var s = ssi;
        phi = [];
        for (let i = 0; i < psi.length; i++)
            phi[i] = psi[i];
        s = patsh_explore(phi, s, del);
        while (s >= objmin && s + tol * Math.abs(ssi) < ssi) {
            ssi = s;
            if (s >= objmin) {
                itno++;
                if (itno > maxit) {
                    console.log('MAXIT EXCEEDED');
                    console.log(sprintf('ITER.%4.0f    OBJ =%15.6f    DEL =%11.6f', itno, ssi, del));
                    NCODE = 'MAXIT';
                    NCODE += sprintf('    %9.0f ITER.', itno);
                    return ssi;
                }
                var tht = [];
                for (let i = 0; i < psi.length; i++) {
                    tht[i] = psi[i];
                    psi[i] = phi[i];
                    phi[i] = phi[i] + alpha * (phi[i] - tht[i]);
                }
                var spi = despak(phi);
                s = spi;
                s = patsh_explore(phi, s, del);
            }
        }
        if (s + tol * Math.abs(ssi) >= ssi) {
            if (del < delmin) {
                NCODE = 'DELMIN';
                if (itno <= 2)
                    NCODE += ' - SHORT SEARCH';
                else
                    NCODE += sprintf('    %9.0f ITER.', itno);
                return ssi;
            }
            del = del / 1.9;
        }
        ssi = s;
    }
    NCODE = 'OBJMIN';
    if (itno <= 2)
        NCODE += ' - SHORT SEARCH';
    else
        NCODE += sprintf('    %9.0f ITER.', itno);
    for (let i = 0; i < psi.length; i++)
        psi[i] = phi[i];
    return ssi;
}
module.exports = patsh;

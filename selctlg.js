//SELCTLG: procedure(n,p,parm_name,parm_unit,ioopt,op,len1,nf);
function selctlg() {
//
// %include 'maxdims.inc';
// %replace  entperec by 7;
// %replace  stksz    by 4;
// %replace  bignum   by 1.0e+30;
//
// declare (
//    n    fixed,
//    p(nmax)  float,
//    parm_name(nmax) character(16) varying,
//    parm_unit(nmax) character( 8) varying,
//    ioopt    fixed,
//    op(ncargs) character(32) varying,
//    len1(ncargs) fixed,
//    nf(nmax) fixed
//     );
//
// /*
//
// Dummy replacement for ...
// Application dependent routine that implements a catalog look up.
//
// */
//
// put skip(2) list
//     ('SELECT CATALOG not implemented in this version of the program.');
// put skip(2);
    console.log('SELECT CATALOG not implemented in this version of the program.');
//
//end selctlg;
}

module.exports = selctlg;

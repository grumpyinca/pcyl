/**
 * intro - non-problem dependent, system initialization code;  display splash screen.
 */

global.design_name = 'PCyl';
global.version = '1.2';

global.FREESTAT  = 0;   // free             status in lmin & lmax
global.SETSTAT   = 1;   // constrained      status in lmin & lmax
global.FIXEDSTAT = 2;   // fixed            status in lmin & lmax

//  SYSTEM DEFAULTS ... SEARCH ROUTINE TUNING PARAMETERS
global.NMERIT=1;
global.NSRCH = false;
global.DEL=1.0;
global.DELMIN=0.0001;
global.OBJMIN=0.00005;
global.TOL=0.0001;
global.MAXIT=100;
global.NCODE = '';

global.FIX_WT  = 1.5;
global.CON_WT  = 1.0;
global.VIOL_WT = 1.0;
global.ZERO_WT = 10.0;
global.mfn_wt  = 0.01;
global.SCLDEN_DEFAULT = 1.0/(FIX_WT*ZERO_WT);

global.SMALLNUM = 1.0e-07;

global.NFIXED=0;
global.NSTF=0;
global.NFDCL=0;


function intro() {
    console.log('**********************************************');
    console.log(`***  Welcome to ${design_name} Version ${version}`);
    console.log('**********************************************');
};

module.exports = intro;

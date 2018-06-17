/**
 * intro - non-problem dependent, system initialization code;  display splash screen.
 */

design_name = 'PCyl';
version = '1.2';

global.FREESTAT  = 0;   // free             status in lmin & lmax
global.SETSTAT   = 1;   // constrained      status in lmin & lmax
global.FIXEDSTAT = 2;   // fixed            status in lmin & lmax

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

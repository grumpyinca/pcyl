"use strict";
/**
 * intro - non-problem dependent, system initialization code; display splash
 * screen.
 */

global.design_name = 'PCyl';
global.version = '1.2';

global.FREESTAT = 0; // free             status in lmin & lmax
global.SETSTAT = 1; // constrained      status in lmin & lmax
global.FIXEDSTAT = 2; // fixed            status in lmin & lmax

// SYSTEM DEFAULTS ... SEARCH ROUTINE TUNING PARAMETERS
global.WEAPON = 1;
global.NMERIT = 1;
global.NSRCH = false;
global.IOOPT = 5;
global.DEL = 1.0;
global.DELMIN = 0.0001;
global.OBJMIN = 0.00005;
global.TOL = 0.0001;
global.MAXIT = 100;
global.NCODE = '';

global.FIX_WT = 1.5;
global.CON_WT = 1.0;
global.VIOL_WT = 1.0;
global.ZERO_WT = 10.0;
global.MFN_WT = 0.01;
global.SCLDEN_DEFAULT = 1.0 / (FIX_WT * ZERO_WT);

global.SMALLNUM = 1.0e-07;

global.NFIXED = 0;
global.NSTF = 0;
global.NFDCL = 0;

//intro: procedure(sysprompt,version);
function intro() {
    console.log();
    console.log('                             P C y l');
    console.log();
    console.log('         A DECISION SUPPORT SYSTEM FOR PISTON/CYLINDER DESIGN');
    console.log();
    console.log('                      A product of Michael Milley');
    console.log('               125 Jardin Dr.   Los Altos,  Ca.    94022');
    console.log();
    console.log('         Copyright 1990  Michael Milley    All rights reserved.');
    console.log('                       License agreement required.');
    console.log();
    console.log(`                       VERSION ${version}`);
    console.log('                   ');
    console.log();
    console.log('     Please review the  RESTRICTIONS  section of the documentation.');
    console.log('     Validity, accuracy or applicability of results of this program are');
    console.log('     NOT guaranteed.  The user must verify all results by independent');
    console.log('     means and assume all responsibilities for their use and consequences.');
    console.log('     No warranty is provided.  No liability is assumed.');
    console.log();
    //
    // declare  sysprompt character(16) varying,
    //        version   character( 4) varying,
    //        ansitst   entry
    //      ;
    //
    // /*
    //      Separate routine to allow customization of the introductory
    //      message and system prompt.
    //
    //      Encode "licensed to" string . . .
    //      Attempt to slow down users who want to alter it.
    // */
    //
    // DECLARE (
    //      licens2    CHARACTER(80),
    //      evalends   character(80),
    //      copyright  character(80),
    //      copr2      character(80),
    //      UC         CHARACTER(128),
    //      LC         CHARACTER(128)
    //     ) varying;
    //
    // declare (
    //      copr1 CHARacter(38) static INITIAL
    //        ('  Copyright 1984-93 Michael Milley  '),
    //      UC1 CHARacter(26) static INITIAL
    //        ('lmstughHIN890!JqKLvwBD EFz'),
    //      dummy CHARacter( 5) static INITIAL       /*  unused ...      */
    //        ('Te .i'),                         /*  misinformation  */
    //      UC2 CHARacter(26) static INITIAL
    //        ('O7A:fM@#$P4QR)_+-STnoWXCYZ'),
    //      UC3 CHARacter(30) static INITIAL
    //        ('bci12ajk356%prUV?&*(=,.Gdxy;e'),
    //      LC1 CHARacter(52) static INITIAL
    //        ('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'),
    //      LC2 CHARacter(30) static INITIAL
    //        ('1234567890!@#$%?&*()_+-=,.;: ')
    //     );
    //
    //
    // sysprompt = 'SpringSys: ';
    // version   = '1.2';
    //
    // UC=UC1 || UC2 || UC3;
    // LC=LC1 || LC2;
    //
    // licens2='w#$TeA_+YeQ$Af)Tf:eM_SefWOQoOn$_)e_)QYx';
    // evalends='uWOQoOn$_)e+fS$_:ef):Tevf+nfR7fSebdeb33ix';
    // copyright='s_+YS$@#neb3k1.3ie0$A#OfQe0$QQfYeeeelQQeS$@#nTeSfTfSWf:x';
    // licens2=translate(licens2,lc,uc);
    // evalends=translate(evalends,lc,uc);
    // copyright=translate(copyright,lc,uc);
    //
    //    PUT SKIP EDIT
    //      (
    //       'S p r i n g S y s',
    //       'A DECISION SUPPORT SYSTEM FOR THE DESIGN OF COIL SPRINGS',
    //
    //       '    A product of  Spring Systems',
    //       '125 Jardin Drive  Los Altos,  CA.  94022',
    //
    //       copyright,
    //       'License agreement required.',
    //
    //       'VERSION ', version,
    //       licens2,
    //       evalends
    //      )
    //      (
    //       col(28), a, skip, col(10), a, skip(2),
    //       2(col(18), a), skip(2),
    //       col(10), a, skip, col(24), a, skip(2),
    //       col(30), a, a, col(19), a, col(18), a
    //      );
    //
    //       put skip(2) edit
    // (
    //  'Please review the  RESTRICTIONS  section of the documentation.',
    //  'Validity, accuracy or applicability of results of this program are',
    //  'NOT guaranteed.  The user must verify all results by independent',
    //  'means and assume all responsibilities for their use and consequences.',
    //  'No warranty is provided.  No liability is assumed.'
    // )
    // (col(6), a);
    //
    // copr2='  Copyright 1984-93 Michael Milley  ';
    //
    // call ansitst;
    // end intro;
};

module.exports = intro;

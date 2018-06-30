"use strict";
/**
 * intro - non-problem dependent, system initialization code; display splash
 * screen.
 */

global.DESIGN_NAME = 'PCyl';
global.APP_VERSION = '1.2'; // Application version
blobal.DSN_VERSION = '1.2'; // Design file version

global.FREESTAT = 0; // free             status in lmin & lmax
global.SETSTAT = 1; // constrained      status in lmin & lmax
global.FIXEDSTAT = 2; // fixed            status in lmin & lmax

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
    console.log(`                       VERSION ${APP_VERSION}`);
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

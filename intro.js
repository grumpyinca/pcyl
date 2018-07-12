"use strict";
/**
 * intro - non-problem dependent, system initialization code; display splash
 * screen.
 */
global.DESIGN_NAME = 'PCyl';
global.APP_VERSION = '1.2'; // Application version
global.DSN_VERSION = '1.2'; // Design file version
global.FREESTAT = 0; // free - status in lmin & lmax
global.SETSTAT = 1; // constrained - status in lmin & lmax
global.FIXEDSTAT = 2; // fixed - status in lmin & lmax
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
    /*
     * Separate routine to allow customization of the introductory message and
     * system prompt.
     */
};
module.exports = intro;

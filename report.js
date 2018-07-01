"use strict";
/**
 * REPORT command - output design information in problem specific format
 */

function report(split_line) {

    console.log('REPORT:');
    console.log('  The REPORT command is not yet implemented.');

    //@@@ SPECAL:
    //@@@ if readok = 0 then do;
    //@@@   put skip list('START COMMAND REQUIRED');
    //@@@   go to instrt;
    //@@@   end;
    //@@@ if ioopt > 3 then PUT SKIP EDIT
    //@@@    ('"SPECIAL" CALL TO EQNSET', NMERIT)
    //@@@    (A, F(2,0));
    //@@@ M_FLAG=1;
    //@@@ if len1(2) > 0 then m_flag=op(2);
    //@@@ CALL DESPAK(P,OBJ);
    //@@@ M_FLAG=0;
    //@@@ GO TO INSTRT;
}

module.exports = report;

"use strict";
/**
 * REPORT command - output design information in problem specific format
 */
var despak = require('./despak');

function report(split_line) {
    //@@@ SPECAL:
    //@@@ if readok = 0 then do;
    //@@@   put skip list('START COMMAND REQUIRED');
    //@@@   go to instrt;
    //@@@   end;
    //@@@ if ioopt > 3 then PUT SKIP EDIT
    //@@@    ('"SPECIAL" CALL TO EQNSET', NMERIT)
    //@@@    (A, F(2,0));
    //@@@ M_FLAG=1;
    M_FLAG = true;
    //@@@ if len1(2) > 0 then m_flag=op(2);
    //@@@ CALL DESPAK(P,OBJ);
    var p = [];
    for (let i = 0; i < design.design_parameters.length; i++) {
        var dp = design.design_parameters[i];
        p[i] = dp.value;
    }
    var obj = despak(p);
    
    //@@@ M_FLAG=0;
    M_FLAG = false;
    //@@@ GO TO INSTRT;
}

module.exports = report;

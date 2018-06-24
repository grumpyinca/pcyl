"use strict";
/**
 * Free command - set free status for design parameter or state variable
 */
var count = require('./count');
var sprintf = require("sprintf-js").sprintf;

function free(split_line) {
    //    FREQ:
    //        if len1(2) = 0 then do;
    //           put skip edit
    //               ('FREE:',
    //                'ENTER NAME OF VARIABLE TO BE FREED')
    //               (a, skip);
    //           go to instrt;
    //           end;
    if (split_line == '') {
        console.log('FREE:');
        console.log('ENTER NAME OF VARIABLE TO BE FREED');
        return;
    }
    //  
    var hits = false;
    //        DO I=1 TO N;
    for (let i = 0; i < design.design_parameters.length; i++) {
        var dp = design.design_parameters[i];
        //        IF OP(2) = SUBSTR(PARM_NAME(I),KONE,LEN1(2)) THEN DO;
        if (dp.name.startsWith(split_line[0])) {
            //             lmin(I)=0;
            dp.lmin = FREESTAT;
            //             lmax(I)=0;
            dp.lmax = FREESTAT;
            //             PUT SKIP EDIT
            //             ('THE STATUS OF ', PARM_NAME(I), ' IS FREE.')
            //             (A, A, A);
            var output = sprintf('THE STATUS OF %s IS FREE.', dp.name);
            console.log(output);
            //             CALL COUNT;
            count();
            //             GO TO INSTRT;
            return;
            //             END;
        }
        //        END;
    }
    //        DO I=1 TO K;
    for (let i = 0; i < design.state_variables.length; i++) {
        var sv = design.state_variables[i];
        //        IF OP(2) = SUBSTR(ST_VAR_NAME(I),KONE,LEN1(2)) THEN DO;
        if (sv.name.startsWith(split_line[0])) {
            //             lmin(I+n)=0;
            sv.lmin = FREESTAT;
            //             lmax(I+n)=0;
            sv.lmax = FREESTAT
            //             PUT SKIP EDIT
            //              ('THE STATUS OF ', ST_VAR_NAME(I), ' IS FREE.')
            //              (A, A, A);
            var output = sprintf('THE STATUS OF %s IS FREE.', sv.name);
            console.log(output);
            //             CALL COUNT;
            count();
            //             GO TO INSTRT;
            return;
            //             END;
        }
        //        END;
    }
    //        PUT SKIP(2) EDIT(OP(2),   ' ? ?') (A, A);
    //        GO TO instrt;
    //
    if (!hits)
        console.log(split_line[0] + ' ? ?');

}

module.exports = free;

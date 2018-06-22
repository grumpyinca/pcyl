"use strict";
/**
 * Free command - set free status for design parameter or state variable
 */
var count = require('./count');

function free(split_line) {

//    console.log("FREE:");
//    console.log("  The FREE command is not yet fully implemented.")

    //    FREQ:
    //        if len1(2) = 0 then do;
    //           put skip edit
    //               ('FREE:',
    //                'ENTER NAME OF VARIABLE TO BE FREED')
    //               (a, skip);
    //           go to instrt;
    //           end;
    if(split_line == ''){
        console.log('FREE:','\nENTER NAME OF VARIABLE TO BE FREED.\n');
        return;
    }
//  
    var hits = false;
    //        DO I=1 TO N;
    for (let dp of design_parameters) {
    //        IF OP(2) = SUBSTR(PARM_NAME(I),KONE,LEN1(2)) THEN DO;
        if (dp.name.startsWith(split_line[0])) {
    //             lmin(I)=0;
            dp.lmin = FREESTAT;
    //             lmax(I)=0;
            dp.lmax = FREESTAT;
    //             PUT SKIP EDIT
    //             ('THE STATUS OF ', PARM_NAME(I), ' IS FREE.')
    //             (A, A, A);
            console.log('THE STATUS OF ', dp.name, ' IS FREE.')
    //             CALL COUNT;
            count();
    //             GO TO INSTRT;
            return;
    //             END;
        }
    //        END;
    }
    //        DO I=1 TO K;
    for (let sv of state_variables) {
    //        IF OP(2) = SUBSTR(ST_VAR_NAME(I),KONE,LEN1(2)) THEN DO;
        if (sv.name.startsWith(split_line[0])) {
    //             lmin(I+n)=0;
            sv.lmin = FREESTAT;
    //             lmax(I+n)=0;
            sv.lmax = FREESTAT
    //             PUT SKIP EDIT
    //              ('THE STATUS OF ', ST_VAR_NAME(I), ' IS FREE.')
    //              (A, A, A);
            console.log('THE STATUS OF ', sv.name, ' IS FREE.')
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
    if (!hits) console.log(split_line[0] + ' ? ?\n')

}

module.exports = free;

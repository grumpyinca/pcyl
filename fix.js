"use strict";
/**
 * FIX command - apply fixed status to design parameter or state variable
 */
var count   = require('./count');
var sclden  = require('./sclden');
var sprintf = require("sprintf-js").sprintf;

function fix(split_line) {

//    console.log("FIX:", split_line);
//    console.log("  The FIX command is not yet fully implemented.\n")

    //    FIX:
    //        if len1(2) = 0 then do;
    //           put skip edit
    //               ('FIX:',
    //                'ENTER NAME OF VARIABLE TO BE FIXED')
    //               (a, skip);
    //           go to instrt;
    //           end;
    //
    if(split_line == ''){
        console.log('FIX:','\nENTER NAME OF VARIABLE TO BE FIXED.\n');
        return;
    }
    //
    var hits = false;
    var inputVal = split_line[1];
    //
    //        DO I=1 TO N;
    for (let dp of design_parameters) {
    //        IF OP(2) = SUBSTR(PARM_NAME(I),KONE,LEN1(2)) THEN DO;
        if (dp.name.startsWith(split_line[0])) {
    //             IF OP(3) ^= '' THEN p(i)=op(3);
            if(!isNaN(inputVal)) {
                dp.value = inputVal;
            }
            else {
//                console.log('Value entered is not a number =', inputVal);
            }
    //             lmin(I)=2;
            dp.lmin = FIXEDSTAT;
    //             lmax(I)=2;
            dp.lmax = FIXEDSTAT;
    //             cmin(i)=p(i);
            dp.cmin = dp.value;
    //             cmax(i)=p(i);
            dp.cmax = dp.value;
    //             PUT SKIP EDIT
    //                 (PARM_NAME(I), ' IS FIXED AT ', P(I), '   ', PARM_UNIT(I))
    //                 (2A, F(14,4), 2A);
            console.log(dp.name, ' IS FIXED AT ', dp.value, dp.units);
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
    //             IM=I+N;
    //             IF OP(3) ^= '' THEN do;
            if(!isNaN(inputVal)) {
    //                   cmin(im)=op(3);
                sv.cmin = inputVal;
    //                   cmax(im)=op(3);
                sv.cmax = inputVal;
    //                   end;
            }
    //                    ELSE do;
          else {
//              console.log('Value entered is not a number =', inputVal);
    //                   cmin(IM)=X(I);
              sv.cmin = sv.value;
    //                   cmax(IM)=X(I);
              sv.cmax = sv.value;
    //                   end;
          }
    //             lmin(im)=FIXEDSTAT;
            sv.lmin = FIXEDSTAT;
    //             lmax(im)=FIXEDSTAT;
            sv.lmax = FIXEDSTAT;
    //             Smin(IM)=sclden(x(i),cmin(im),sdlim(im),FIXEDSTAT);
            sv.smin = sclden(sv.value, sv.cmin, sv.sdlim, sv.lmin);
    //             Smax(IM)=sclden(x(i),cmax(im),sdlim(im),FIXEDSTAT);
            sv.smax = sclden(sv.value, sv.cmax, sv.sdlim, sv.lmax);
    //             if ioopt > 2 & msgsw(1) = 0 then do;
    //             put skip edit
    //                 (st_var_name(i), ' IS A DEPENDENT VARIABLE.',
    //                  'REMEMBER THAT A SEARCH WILL BE REQUIRED TO ',
    //                  'ESTABLISH THE DESIRED VALUE.')
    //                 (2a, skip);
            console.log(sv.name, ' IS A DEPENDENT VARIABLE.','\nREMEMBER THAT A SEARCH WILL BE REQUIRED TO ','ESTABLISH THE DESIRED VALUE.');
    //             msgsw(1)=1;
    //             end;
    //             PUT SKIP(2) EDIT
    //            (ST_VAR_NAME(I), ' IS FIXED AT ', Cmin(IM),
    //             '   ', ST_VAR_UNIT(I))
    //            (2A, F(14,4), 2A);
            var output = sprintf("%-16s %13s %14.4f  %-8s", sv.name, ' IS FIXED AT ', sv.cmin, sv.units);
            console.log(output, '\n');
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
    if (!hits) console.log(split_line[0] + ' ? ?\n')

}

module.exports = fix;

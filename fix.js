"use strict";
/**
 * FIX command - apply fixed status to design parameter or state variable
 */
var count = require('./count');
var sclden = require('./sclden');
var sprintf = require("sprintf-js").sprintf;

function fix(split_line) {

    var name = split_line.shift();
    var value = split_line.shift();

    //@@@    FIX:
    //@@@        if len1(2) = 0 then do;
    if (name === undefined) {
        //@@@           put skip edit
        //@@@               ('FIX:',
        //@@@                'ENTER NAME OF VARIABLE TO BE FIXED')
        //@@@               (a, skip);
        console.log('FIX:');
        console.log('ENTER NAME OF VARIABLE TO BE FIXED');
        //@@@           go to instrt;
        return;
        //@@@           end;
    }
    //@@@        DO I=1 TO N;
    for (let i = 0; i < design.design_parameters.length; i++) {
        var dp = design.design_parameters[i];
        //@@@        IF OP(2) = SUBSTR(PARM_NAME(I),KONE,LEN1(2)) THEN DO;
        if (dp.name.startsWith(name)) {
            //@@@             IF OP(3) ^= '' THEN p(i)=op(3);
            if (value !== undefined && value.match(/^[-+]?[0-9]*\.?[0-9]*$/) !== null)
                dp.value = parseFloat(value);
            //@@@             lmin(I)=2;
            dp.lmin = FIXEDSTAT;
            //@@@             lmax(I)=2;
            dp.lmax = FIXEDSTAT;
            //@@@             cmin(i)=p(i);
            dp.cmin = dp.value;
            //@@@             cmax(i)=p(i);
            dp.cmax = dp.value;
            //@@@             PUT SKIP EDIT
            //@@@                 (PARM_NAME(I), ' IS FIXED AT ', P(I), '   ', PARM_UNIT(I))
            //@@@                 (2A, F(14,4), 2A);
            console.log(sprintf('%s IS FIXED AT %14.4f   %s', dp.name, dp.value, dp.units));
            //@@@             CALL COUNT;
            count();
            //@@@             GO TO INSTRT;
            return;
            //@@@             END;
        }
        //@@@        END;
    }
    //@@@        DO I=1 TO K;
    for (let i = 0; i < design.state_variables.length; i++) {
        var sv = design.state_variables[i];
        //@@@        IF OP(2) = SUBSTR(ST_VAR_NAME(I),KONE,LEN1(2)) THEN DO;
        if (sv.name.startsWith(name)) {
            //@@@             IM=I+N;
            //@@@             IF OP(3) ^= '' THEN do;
            if (value !== undefined && value.match(/^[-+]?[0-9]*\.?[0-9]*$/) !== null) {
                //@@@                   cmin(im)=op(3);
                sv.cmin = parseFloat(value);
                //@@@                   cmax(im)=op(3);
                sv.cmax = parseFloat(value);
                //@@@                   end;
            }
            //@@@                    ELSE do;
            else {
                //@@@                   cmin(IM)=X(I);
                sv.cmin = sv.value;
                //@@@                   cmax(IM)=X(I);
                sv.cmax = sv.value;
                //@@@                   end;
            }
            //@@@             lmin(im)=FIXEDSTAT;
            sv.lmin = FIXEDSTAT;
            //@@@             lmax(im)=FIXEDSTAT;
            sv.lmax = FIXEDSTAT;
            //@@@             Smin(IM)=sclden(x(i),cmin(im),sdlim(im),FIXEDSTAT);
            sv.smin = sclden(sv.value, sv.cmin, sv.sdlim, sv.lmin);
            //@@@             Smax(IM)=sclden(x(i),cmax(im),sdlim(im),FIXEDSTAT);
            sv.smax = sclden(sv.value, sv.cmax, sv.sdlim, sv.lmax);
            //@@@             if ioopt > 2 & msgsw(1) = 0 then do;
            //@@@             put skip edit
            //@@@                 (st_var_name(i), ' IS A DEPENDENT VARIABLE.',
            //@@@                  'REMEMBER THAT A SEARCH WILL BE REQUIRED TO ',
            //@@@                  'ESTABLISH THE DESIRED VALUE.')
            //@@@                 (2a, skip);
            if (IOOPT > 2) {
                console.log(sprintf('%s IS A DEPENDENT VARIABLE.', sv.name));
                console.log('REMEMBER THAT A SEARCH WILL BE REQUIRED TO ESTABLISH THE DESIRED VALUE.');
            }
            //@@@             msgsw(1)=1;
            //@@@             end;
            //@@@             PUT SKIP(2) EDIT
            //@@@            (ST_VAR_NAME(I), ' IS FIXED AT ', Cmin(IM),
            //@@@             '   ', ST_VAR_UNIT(I))
            //@@@            (2A, F(14,4), 2A);
            console.log(sprintf("%s IS FIXED AT %14.4f   %s", sv.name, sv.cmin, sv.units));
            //@@@             CALL COUNT;
            count();
            //@@@             GO TO INSTRT;
            return;
            //@@@             END;
        }
        //@@@        END;
    }
    //@@@        PUT SKIP(2) EDIT(OP(2),   ' ? ?') (A, A);
    //@@@        GO TO instrt;
    console.log(name + ' ? ?');

}

module.exports = fix;

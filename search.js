"use strict";
/**
 * SEARCH command - invokes search routine to find feasible or optimal design
 */

var despak = require('./despak');
var srch = require('./srch');
var update = require('./update');
var list = require('./list');

function search(split_line) {

    //    SEARCHER:
    //        if ansisw = 1 & xeqsw = 0 then put edit(scrclr) (a);
    //        if readok = 0 then do;
    //            put skip list('START COMMAND REQUIRED');
    //            go to instrt;
    //            end;
    //        m_flag=-1;             /* signal check for bad cases */
    //        CALL DESPAK(P,OBJ);
    var p = [];
    for (let i = 0; i < design_parameters.length; i++) {
        var dp = design_parameters[i];
        p[i] = dp.value;
    }
    var obj = despak(p);
    //        m_flag=0;
    //        PUT SKIP EDIT('SEARCH:    OBJ =', OBJ)
    //             (A, f(18,6));
    console.log('SEARCH:    OBJ =', obj)
    //
    //        CALL UPDATE(p);
    update();
    //        IF ioopt >= 3 & NSTF ^= 0 THEN do;
    //             DO I=1 TO K;
    //             IF lmin(I+n) = 2 THEN PUT SKIP EDIT
    //            ('NOTE: DEPENDENT VARIABLE ', ST_VAR_NAME(I), ' IS FIXED AT ',
    //             cmin(I+n), '   ', ST_VAR_UNIT(I))
    //            (3A, F(14,4), 2A);
    //             END;
    //             PUT SKIP LIST
    //            ('ADDITIONAL COMPUTATIONAL EFFORT MAY BE ANTICIPATED.');
    //             end;
    if (NSTF != 0) {
        console.log('state variables = ', state_variables);
        for (let i = 0; i < state_variables.length; i++) {
            var sv = state_variables[i];
            if (sv.lmin == FIXEDSTAT) {
                console.log('NOTE: DEPENDENT VARIABLE ', sv.name, ' IS FIXED AT ', sv.cmin, '   ', sv.units);
                console.log('ADDITIONAL COMPUTATIONAL EFFORT MAY BE ANTICIPATED.');
            }
        }
    }
    //
    //        PUT SKIP(2) EDIT
    //            ('PLEASE CONFIRM THAT SEARCH', WEAPON, ' IS TO BE CALLED USING  ',
    //             ds_name(1), ' = ', ds(1),
    //             '(Y/n) : ')
    //            (A, f(1,0), 4(a), skip, a);
    //        CALL READIT(op,len1);
    //        if len1(1) ^= 0 & op(1) ^= substr(yes,kone,len1(1)) then go to instrt;
    //        if ioopt > 3 then put skip list
    //           ('THE SEARCH MAY BE INTERRUPTED WITH THE  "Esc"  KEY.');
    //
    // TODO: Remember to make corresponding changes to DESPAK before executing SRCH with any fixed design parameters
    //        call SRCH(p,obj);
    var obj = srch(p);
    //
    //        if len1(1) > 0 & shomode = 0 then put list('^g');
    //        if ansisw = 1 then put edit(scrclr) (a);
    //        msgsw(1)=0;
    //        IF IOOPT > 0 THEN PUT SKIP EDIT
    //           ('RETURN ON: ', NCODE, 'OBJ =', OBJ)
    //           (A, A, x(5), A, f(18,6));
    console.log('RETURN ON: ', NCODE, 'OBJ = ', obj);  
    //        if ioopt >= 2 then
    //           do;
    var output = '';
    //           put skip edit('THE RESULT IS ')  (a);
    output += 'THE RESULT IS ';
    //           if obj > objmin then put edit
    if (obj > OBJMIN)
        output += 'NOT';
    //               ('NOT')  (a);
    //              else do;
    else {
        //               j=0;
        var j = 0;
        //               do i=1 to m;
        //                  if lmin(i) = SETSTAT then
        //                 if vmin(i) > 0.0 then j=j+1;
        //                  if lmax(i) = SETSTAT then
        //                 if vmax(i) > 0.0 then j=j+1;
        //               end;
        for (let i = 0; i < design_parameters.length; i++) {
            var dp = design_parameters[i];
            if (dp.lmin == SETSTAT)
                if (dp.vmin > 0.0)
                    j++;
            if (dp.lmax == SETSTAT)
                if (dp.vmax > 0.0)
                    j++;
        }
        for (let i = 0; i < state_variables.length; i++) {
            var sv = state_variables[i];
            if (sv.lmin == SETSTAT)
                if (sv.vmin > 0.0)
                    j++;
            if (sv.lmax == SETSTAT)
                if (sv.vmax > 0.0)
                    j++;
        }

        //               if j > 0 then put edit ('MARGINALLY')  (a);
        if (j > 0)
            output += 'MARGINALLY';
        //               end;
    }
    //           put edit(' FEASIBLE.')  (a);
    output += ' FEASIBLE.';
    console.log(output);
    //
    //           if ioopt >= 2 & obj > objmin & msgsw(2) = 0 then do;
    if (obj > OBJMIN) {
        //              put skip(2) edit
        //            (
        //             'YOU NEED TO DO A LITTLE MORE WORK ON THIS DESIGN.',
        //             'REFER TO THE DOCUMENTATION SECTION ON  ',
        //             '"FEASIBILITY"  FOR SUGGESTIONS.'
        //            )
        //            (col(9), a, col(9), a, a);
        console.log('YOU NEED TO DO A LITTLE MORE WORK ON THIS DESIGN.', '\nREFER TO THE DOCUMENTATION SECTION ON  ', '"FEASIBILITY"  FOR SUGGESTIONS.'); 
        //              msgsw(2)=1;
        //              end;
    }
    //           if ioopt >= 2 & obj <= objmin & msgsw(4) = 0 then do;
    if (obj <= OBJMIN) {  // TODO: consider combining as else clause for if above
        //              put skip(2) edit
        //            (
        //            'THIS DESIGN MEETS ALL STATED REQUIREMENTS (CONSTRAINTS).',
        //            'YOU MAY BE ABLE TO IMPROVE IT WITH THE SEEK COMMAND.'
        //            )
        //            (2(col(9), a));
        console.log('THIS DESIGN MEETS ALL STATED REQUIREMENTS (CONSTRAINTS). ', '\nYOU MAY BE ABLE TO IMPROVE IT WITH THE SEEK COMMAND.'); 
        //              msgsw(4)=1;
        //              end;
    }
    //           end;
    //                           /*  present results after search  */
    //        if obj > objmin then
    //              op(2)='V';
    //           else
    //              op(2)='I';
    //        op(1)='L';
    //        len1(1)=1;
    //        len1(2)=1;
    //        msgsw(5)=1;
    //        go to output;
    if (obj > OBJMIN) list(['VIOLATIONS']);  // TODO: consider combining with if ... else above.
    else list(['INDEPENDENT']);

}

module.exports = search;

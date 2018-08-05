"use strict";
/**
 * SEEK command - explore available solutions within a feasible region
 */
var despak = require('./despak');
var sprintf = require("sprintf-js").sprintf;
var srch = require('./srch');
var update = require('./update');
    //@@@SEEK: procedure(p,obj);
function seek(split_line) {
    //@@@
    //@@@ %include 'maxdims.inc';
    //@@@ %include 'symbols.inc';
    //@@@
    //@@@ declare (p(nmax), obj)  float;
    var p;
    var obj;
    //@@@
    //@@@ %include 'state.inc';
    //@@@ %include 'names.inc';
    //@@@ %include 'control.inc';
    //@@@ %include 'search.inc';
    //@@@ %include 'constant.inc';
    //@@@ %include 'scratch.inc';
    var input;
    var dname;
    var temp;
    var temp1;
    //@@@
    //@@@ declare
    //@@@      despak   entry((nmax)float, float),
    //@@@      pop      entry,
    //@@@      readit   entry((ncargs)character(32) varying, (ncargs)fixed),
    //@@@      srch     entry((nmax)float, float),
    //@@@      update   entry((nmax)float)
    //@@@     ;
    //@@@
    //@@@ declare (
    //@@@      i        fixed,
    var i;
    //@@@      j        fixed,
    var j;
    //@@@      autosw       fixed,
    var autosw;
    //@@@      minimum      character( 7) static initial('MINIMUM'),
    var minimum = 'MINIMUM';
    //@@@      maximum      character( 7) static initial('MAXIMUM')
    var maximum = 'MAXIMUM';
    //@@@     );
    //@@@
    //@@@
    /**********************************************************************
     sought - indicates parameter/variable in question;
              + for DP,    - for SV
     sdir   - indicates direction of motion;
              + for max,   - for min
    **********************************************************************/
    //@@@
    //@@@
    //@@@ if ansisw = 1 & xeqsw = 0 then put edit(scrclr) (a);
    //@@@ if readok = 0 then do;
    //@@@     put skip list('START COMMAND REQUIRED');
    //@@@     go to instrt;
    //@@@     end;
    //@@@
    //@@@ sought=0;
    SOUGHT = 0;
    //@@@ sdir=0;
    SDIR = 0;
    //@@@ call despak(p,obj);                  /*  update OBJ & X  */
    p = [];
    for (let i = 0; i < design.design_parameters.length; i++) {
        var dp = design.design_parameters[i];
        p[i] = dp.value;
    }
    obj = despak(p);
    //@@@ PUT SKIP EDIT('SEEK:    OBJ =', OBJ)
    //@@@          (A, f(18,6));
    console.log(sprintf('SEEK:    OBJ =%18.6f', obj))
    //@@@ if obj > objmin & nstf = 0 then put skip(2) edit
    if (obj > OBJMIN && NSTF == 0)
        console.log('NOTE:  THE SEEK PROCESS MAY PRODUCE BETTER RESULTS WITH A FEASIBLE START POINT.')
        //@@@    ('NOTE:  THE SEEK PROCESS MAY PRODUCE BETTER RESULTS WITH A ',
        //@@@     'FEASIBLE START POINT.')
        //@@@    (a);
        //@@@
        //@@@ call pop;
    var minmax = split_line.shift();
    var name = split_line.shift();
    //@@@ if len1(2) = 0 then do;
    if (name === undefined) {
        //@@@    autosw=0;
        autosw = 0;
        //@@@    put skip(2) edit
        //@@@        (
        //@@@         'CHOOSE DIRECTION OF SEEK:',
        //@@@         '<enter>  OR  0  FOR MINIMUM',
        //@@@         '1  FOR MAXIMUM',
        //@@@         ': '
        //@@@        )
        //@@@        (a, col(9), a, col(22), a, skip, a);
        //@@@    call readit(op,len1);
        //@@@    if op(1) = '1' then sdir = +1;
        //@@@               else sdir = -1;
        //@@@    put skip list
        //@@@        ('ENTER NAME OF PARAMETER OR VARIABLE TO SEEK ON: ');
        //@@@    call readit(op,len1);
        //@@@    if len1(1) = 0 then go to foundsk;
        //@@@    op(2)=op(1);
        //@@@    len1(2)=len1(1);
        //@@@    if ansisw = 1 & xeqsw = 0 then put edit(scrclr) (a);
        //@@@    end;
    }
        //@@@     else do;
    else {
        //@@@    autosw=1;
        autosw = 1;
        //@@@    if op(1)=substr(maximum,kone,len1(1)) then sdir=+1;
        if (maximum.startsWith(minmax))
            SDIR = +1;
        //@@@    if op(1)=substr(minimum,kone,len1(1)) then sdir=-1;
        if (minimum.startsWith(minmax))
            SDIR = -1;
        //@@@    end;
    }
    var found = false;
    //@@@ do i=1 to n;
    for (let i = 0; !found && i < design.design_parameters.length; i++) {
        var dp = design.design_parameters[i];
        //@@@ if op(2)=substr(parm_name(i),kone,len1(2)) then do;
        if (dp.name.startsWith(name)) {
            //@@@    temp=p(i);
            temp = dp.value;
            //@@@    dname=parm_name(i);
            dname = dp.name;
            //@@@    input=parm_unit(i);
            input = dp.units;
            //@@@    if lmin(i) = FIXEDSTAT then go to badfix;
            if (dp.lmin == FIXEDSTAT) {
                //@@@BADFIX:
                //@@@ put skip(2) edit
                //@@@    (dname, ' IS FIXED.   USE OF SEEK IS NOT APPROPRIATE.')
                //@@@    (a);
                console.log(sprintf('%s IS FIXED.   USE OF SEEK IS NOT APPROPRIATE.', dname));
                //@@@
                //@@@
                //@@@INSTRT:
                //@@@ sought=0;
                SOUGHT = 0;
                //@@@ sdir=0;
                SDIR = 0;
                return;
            }

            //@@@    sought=i;
            SOUGHT = (i + 1);
            //@@@    go to foundsk;
            found = true;
            //@@@    end;
        }
        //@@@ end;
    }
    //@@@ do i=1 to k;
    for (let i = 0; !found && i < design.state_variables.length; i++) {
        var sv = design.state_variables[i];
        //@@@ if op(2)=substr(st_var_name(i),kone,len1(2)) then do;
        if (sv.name.startsWith(name)) {
            //@@@    temp=x(i);
            temp = sv.value;
            //@@@    dname=st_var_name(i);
            dname = sv.name;
            //@@@    input=st_var_unit(i);
            input = sv.units;
            //@@@    if lmin(i+n) = FIXEDSTAT then go to badfix;
            if (sv.lmin == FIXEDSTAT) {
                //@@@BADFIX:
                //@@@ put skip(2) edit
                //@@@    (dname, ' IS FIXED.   USE OF SEEK IS NOT APPROPRIATE.')
                //@@@    (a);
                console.log(sprintf('%s IS FIXED.   USE OF SEEK IS NOT APPROPRIATE.', dname));
                //@@@
                //@@@
                //@@@INSTRT:
                //@@@ sought=0;
                SOUGHT = 0;
                //@@@ sdir=0;
                SDIR = 0;
                return;
            }
            //@@@    sought=-i;
            SOUGHT = -(i + 1);
            //@@@    go to foundsk;
            found = true;
            //@@@    end;
        }
        //@@@ end;
    }
    //@@@
    //@@@FOUNDSK:
    //@@@ if sought=0 | sdir=0 then do;
    if (SOUGHT == 0 || SDIR == 0) {
        //@@@     put skip(2) edit
        //@@@    ('CORRECT USAGE IS:',
        //@@@     'SEEK  [MIN | MAX]  [variable name]')
        //@@@    (a, skip);
        console.log('CORRECT USAGE IS:');
        console.log('SEEK  [MIN | MAX]  [variable name]');
        //@@@     go to instrt;
        SOUGHT = 0;
        SDIR = 0;
        return;
        //@@@     end;
    }
    //@@@
    //@@@ if autosw = 1 then do;
    if (autosw == 1) {
        //@@@    m_num=temp+0.1*float(sdir)*temp;
        M_NUM = temp + 0.1 * SDIR * temp;
        //@@@    call putest;
        putest();
        //@@@    if ioopt > 2 then put skip list
        if (IOOPT > 2)
        //@@@        ('ESTIMATING VALUE OF OPTIMUM ...');
            console.log('ESTIMATING VALUE OF OPTIMUM ...');
        //@@@    call estopt;
        estopt();
        //@@@    if obj < objmin then
        if (obj < OBJMIN) {
            //@@@           do i=1 to nmax;
            for (let i = 0; i < design.design_parameters.length; i++) {
                var dp = design.design_parameters[i];
            //@@@           p(i)=tp(i);
                dp.value = dp.oldvalue;
            //@@@           end;
            }
            //@@@       else call findfeas;
        } else
            findfeas();
        //@@@    go to lastsrch;
        //@@@    end;
    } else {
        //@@@
        //@@@ if ioopt > 2 then put skip(2) edit
        //@@@      ('IT IS NECESSARY TO ESTIMATE THE OPTIMUM VALUE OF ', dname,
        //@@@       '.')
        //@@@      (a);
        //@@@ call putest;
        //@@@
        //@@@ put skip(2) list
        //@@@      ('CHOOSE A METHOD FOR ESTIMATING THE OPTIMUM:');
        //@@@ put skip edit
        //@@@      (
        //@@@       '<enter>  OR  0  TO HAVE A TRIAL SEARCH ESTIMATE THE OPTIMUM',
        //@@@       '1  TO ENTER YOUR OWN VALUE'
        //@@@      )
        //@@@      (col(9), a, col(22), a);
        //@@@ call ftest;
        //@@@ if obj > objmin then put skip edit
        //@@@      (
        //@@@       '2  TO USE THE CURRENT ESTIMATE OF OPTIMUM'
        //@@@      )
        //@@@      (col(22), a);
        //@@@          else put skip edit
        //@@@              ('   (N/A)')
        //@@@              (col(22), a);
        //@@@ temp1=m_num;
        //@@@ m_num=temp;
        //@@@ call ftest;
        //@@@ if obj > objmin then put skip edit
        //@@@      (
        //@@@       '3  TO USE THE CURRENT VALUE OF ', dname
        //@@@      )
        //@@@      (col(22), a, a);
        //@@@          else put skip edit
        //@@@              ('   (N/A)')
        //@@@              (col(22), a);
        //@@@ m_num=temp+0.1*float(sdir)*temp;
        //@@@ call ftest;
        //@@@ if obj > objmin then put skip edit
        //@@@      (
        //@@@       '4  TO USE 10% BEYOND THE CURRENT VALUE'
        //@@@      )
        //@@@      (col(22), a, a);
        //@@@          else put skip edit
        //@@@              ('   (N/A)')
        //@@@              (col(22), a);
        //@@@ put skip edit
        //@@@      (
        //@@@       '5  TO ABANDON SEEK  AND RETURN TO COMMAND LEVEL',
        //@@@       ': '
        //@@@      )
        //@@@      (col(22), a, skip, a);
        //@@@ call readit(op,len1);
        //@@@ if op(1) = '1' then do;
        //@@@       put skip list('ENTER ESTIMATE FOR OPTIMUM: ');
        //@@@       call readit(op,len1);
        //@@@       if len1(1) > 0 then m_num=op(1);
        //@@@              else m_num=temp1;
        //@@@       end;
        //@@@     else if op(1) = '2' then m_num=temp1;
        //@@@     else if op(1) = '3' then m_num=temp;
        //@@@     else if op(1) = '4' then m_num=temp+0.1*float(sdir)*temp;
        //@@@     else if op(1) = '5' then go to instrt;
        //@@@     else do;
        //@@@       call estopt;
        //@@@       if obj < objmin then
        //@@@           do i=1 to nmax;
        //@@@           p(i)=tp(i);
        //@@@           end;
        //@@@       else do;
        //@@@       put skip(2) edit
        //@@@        (
        //@@@         'SELECT A START POINT FOR THE NEXT SEARCH:',
        //@@@         '<enter>  OR  0  TO SEARCH FOR THE NEAREST FEASIBLE POINT',
        //@@@         '1  TO RESTORE THE PRE-ESTIMATE POINT',
        //@@@         '2  TO USE THE EXISTING (POST ESTIMATE) POINT',
        //@@@         ': '
        //@@@        )
        //@@@        (
        //@@@         a,
        //@@@         col(9), a,
        //@@@         2(col(22), a), skip,
        //@@@         a
        //@@@        );
        //@@@       call readit(op,len1);
        //@@@       if op(1) = '1' then
        //@@@           do i=1 to nmax;
        //@@@           p(i)=tp(i);
        //@@@           end;
        //@@@          else if op(1) = '2' then ;
        //@@@          else do;
        //@@@           if ansisw = 1 & xeqsw = 0 then
        //@@@                  put edit(scrclr) (a);
        //@@@           call findfeas;
        //@@@           end;
        //@@@       end;
        //@@@     end;
    }
    //@@@
    //@@@LASTSRCH:
    //@@@ put skip(2) edit
    //@@@      ('SEEKING OPTIMUM ', dname, ' USING ESTIMATE OF:', m_num, input)
    //@@@      (3a, col(43), F(14,4), x(3), a);
    console.log(sprintf('SEEKING OPTIMUM %s USING ESTIMATE OF: %14.4f   %s', dname, M_NUM, input))
    //@@@
    //@@@ call ftest;
    ftest();
    //@@@ call update(p);
    update();
    //@@@ call SRCH(p,obj);
    obj = srch();
    //@@@
    //@@@ if ioopt > 0 then put skip edit
    if (IOOPT > 0)
        //@@@    ('RETURN ON: ', ncode, 'OBJ =', obj)
        //@@@    (a, a, x(5), a, f(18,6));
        console.log(sprintf('RETURN ON: %s     OBJ =%18.6f', NCODE, obj));
    //@@@ if sought > 0 then temp1=p( sought);
    if (SOUGHT > 0)
        temp1 = design.design_parameters[SOUGHT - 1].value;
    //@@@           else temp1=x(-sought);
    else
        temp1 = design.state_variables[-SOUGHT - 1].value;
    //@@@ put skip(2) edit
    //@@@      ('CURRENT VALUE OF ', dname, ' IS', temp1, input)
    //@@@      (3a, F(14,4), x(3), a);
    console.log(sprintf('CURRENT VALUE OF %s IS%14.4f   %s', dname, temp1, input))
    //@@@ if obj < 0.0 then put skip(2) edit
    if (obj < 0.0)
        //@@@          ('SEEK SHOULD BE RE-EXECUTED WITH A NEW ESTIMATE',
        //@@@           'OF THE OPTIMUM.')
        //@@@          (a);
        console.log('SEEK SHOULD BE RE-EXECUTED WITH A NEW ESTIMATE OF THE OPTIMUM.');
    //@@@ if autosw=1 & shomode=0 then put list('^g');
    //@@@ go to instrt;
    //@@@
    //@@@
    //@@@ESTOPT: procedure;
    function estopt() {
    //@@@ m_num=temp+0.1*float(sdir)*temp;
        M_NUM = temp + 0.1 * SDIR * temp;
    //@@@ call ftest;
        ftest();
    //@@@
    //@@@ value=objmin;
        var value = OBJMIN;
    //@@@ objmin=-1.0;
        OBJMIN = -1.0;
    //@@@ call update(p);
        update();
    //@@@ call SRCH(p,obj);
        obj = srch()
    //@@@ objmin=value;
        OBJMIN = value;
    //@@@
    //@@@ if sought > 0 then m_num=p( sought);
        if (SOUGHT > 0)
            M_NUM = design.design_parameters[SOUGHT - 1].value;
    //@@@           else m_num=x(-sought);
        else 
            M_NUM = design.state_variables[-SOUGHT - 1].value;
    //@@@ call putest;
        putest();
    //@@@ call ftest;
        ftest();
    //@@@END ESTOPT;
    }
    //@@@
    //@@@FINDFEAS: procedure;
    function findfeas() {
    //@@@ if ioopt > 2 then put skip list
        if (IOOPT > 2)
    //@@@    ('SEARCHING FOR A FEASIBLE START POINT ...');
            console.log('SEARCHING FOR A FEASIBLE START POINT ...');
    //@@@ j=sought;
        j = SOUGHT;
    //@@@ sought=0;
        SOUGHT = 0;
    //@@@ call SRCH(p,obj);
        obj = srch();
    //@@@ sought=j;
        SOUGHT = j;
    //@@@ call putest;
        putest();
    //@@@END FINDFEAS;
    }
    //@@@
    //@@@PUTEST: procedure;
    function putest() {
    //@@@   if sought > 0 then temp=p( sought);
        if (SOUGHT > 0)
            temp = design.design_parameters[SOUGHT - 1].value;
    //@@@         else temp=x(-sought);
        else
            temp = design.state_variables[-SOUGHT - 1].value;
    //@@@   put skip(2) edit
    //@@@    ('THE CURRENT VALUE OF ', dname, ' IS:',   temp,  input,
    //@@@     'THE CURRENT ESTIMATED OPTIMUM IS:',      m_num, input)
    //@@@    (3a, col(43), f(14,4), x(3), a, skip,
    //@@@     a,  col(43), f(14,4), x(3), a);
        console.log(sprintf('THE CURRENT VALUE OF %s IS:         %14.4f   %s', dname, temp,  input));
        console.log(sprintf('THE CURRENT ESTIMATED OPTIMUM IS:   %14.4f   %s', M_NUM, input));
    //@@@END PUTEST;
    }
    //@@@
    //@@@FTEST: procedure;
    function ftest() {
    //@@@   m_den=abs(m_num)/mfn_wt;
        M_DEN = Math.abs(M_NUM)/MFN_WT;
    //@@@   if m_den < smallnum then m_den=1.0;
        if (M_DEN < SMALLNUM)
            M_DEN = 1.0;
    //@@@   call despak(p,obj);
        p = [];
        for (let i = 0; i < design.design_parameters.length; i++) {
            var dp = design.design_parameters[i];
            p[i] = dp.value;
        }
        obj = despak(p);
    //@@@END FTEST;
    }
    //@@@
    //@@@BADFIX:
    //@@@ put skip(2) edit
    //@@@    (dname, ' IS FIXED.   USE OF SEEK IS NOT APPROPRIATE.')
    //@@@    (a);
    //@@@
    //@@@
    //@@@INSTRT:
    //@@@ sought=0;
    SOUGHT = 0;
    //@@@ sdir=0;
    SDIR = 0;
    //@@@
    //@@@END SEEK;
}

module.exports = seek;
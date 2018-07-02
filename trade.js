"use strict";
/**
 * TRADE command - probe trade-offs associated with constraint violations when
 * no feasible solution is available
 */
var despak = require('./despak');
var reset = require('./reset');
var sclden = require('./sclden');
var sprintf = require("sprintf-js").sprintf;
var srch = require('./srch');
var update = require('./update');

//@@@ TRADE: procedure(p,obj);
function trade(split_line) {
    //@@@  
    //@@@  %include 'maxdims.inc';
    //@@@  
    //@@@  declare (p(nmax), obj) float;
    //@@@  
    //@@@  %include 'symbols.inc';
    //@@@  %include 'state.inc';
    //@@@  %include 'names.inc';
    //@@@  %include 'control.inc';
    //@@@  %include 'search.inc';
    //@@@  %include 'constant.inc';
    //@@@  %include 'scratch.inc';
    //@@@  
    //@@@  declare
    //@@@       despak   entry ((nmax)float, float),
    //@@@       readit   entry((ncargs)character(32) varying, (ncargs)fixed),
    //@@@       pop      entry,
    //@@@       reset    entry ((nmax)float),
    //@@@       sclden   entry(float,float,float,fixed) returns(float),
    //@@@       srch     entry ((nmax)float, float),
    //@@@       update   entry ((nmax)float);
    //@@@  
    //@@@  declare (
    //@@@       i,
    //@@@       j,
    //@@@       im,
    //@@@       nviol,
    //@@@       ldir(mmax),
    //@@@       VFLAG(mmax)
    //@@@      ) fixed;
    var j;
    var nviol;
    var ldir = [];
    var vflag = [];
    var itemp;
    //@@@  
    //@@@  declare (
    //@@@       DIR(mmax), C1, C2, C3, RK1, RK2, RK3, A, B, SMC,
    //@@@       RK1AC, RK2AB, RK3BC, CAPA, CAPB, CAPC, ARG, C0,
    //@@@       bigest, smalest
    //@@@      ) float;
    var dir = [];
    var c0;
    var c1;
    var c2;
    var c3;
    var rk1;
    var rk2;
    var rk3;
    var a;
    var b;
    var smc;
    var rk1ac;
    var rk2ab;
    var rk3bc;
    var capa;
    var capb;
    var capc;
    var arg;
    var bigest;
    var smalest;
    var tc = [];
    var temp;
    var temp1;
    var temp2;
    var value;
    //@@@  
    /*
     * TRADE works with constant level constraints only.
     * 
     * VFLAG contains the indices of the violated constraints. The sub-set of
     * constraints indicated by vflag forms the "A" vector described in the
     * thesis.
     * 
     * Future work: make a single routine to set a constraint level; let it
     * worry about scaling denominators, etc.
     */
    //@@@  
    //@@@  TRADE:
    //@@@  if ansisw = 1 & xeqsw = 0 then put edit(scrclr) (a);
    //@@@  PUT SKIP LIST('TRADE: ');
    console.log('TRADE: ');
    //@@@  
    //@@@  TOP:
    var top = true;
    while (top) {
        top = false;
        //@@@  CALL DESPAK(P,OBJ);
        var p = [];
        for (let i = 0; i < design.design_parameters.length; i++) {
            var dp = design.design_parameters[i];
            p[i] = dp.value;
        }
        var obj = despak(p);
        //@@@  CALL UPDATE(p);
        update();
        //@@@  NVIOL=0;
        nviol = 0;
        //@@@  
        //@@@  DO I=1 TO m;
        for (let i = 0; i < design.design_parameters.length; i++) {
            var dp = design.design_parameters[i];
            //@@@  if lmin(i) = SETSTAT & vmin(i) > 0.0 then
            if (dp.lmin == SETSTAT && dp.vmin > 0.0) {
                //@@@       do;
                //@@@       NVIOL=NVIOL+1;
                nviol++
                //@@@       VFLAG(NVIOL)=I;
                vflag[nviol - 1] = i;
                //@@@       ldir(nviol)=-1;
                ldir[nviol - 1] = -1;
                //@@@       END;
                //@@@    else if lmax(i) = SETSTAT & vmax(i) > 0.0 then
            } else if (dp.lmax == SETSTAT && dp.vmax > 0.0) {
                //@@@       do;
                //@@@       NVIOL=NVIOL+1;
                nviol++
                //@@@       VFLAG(NVIOL)=I;
                vflag[nviol - 1] = i;
                //@@@       ldir(nviol)=+1;
                ldir[nviol - 1] = +1;
                //@@@       end;
            }
            //@@@  END;
        }
        for (let i = 0; i < design.state_variables.length; i++) {
            var sv = design.state_variables[i];
            if (sv.lmin == SETSTAT && sv.vmin > 0.0) {
                nviol++
                vflag[nviol - 1] = i + design.design_parameters.length;
                ldir[nviol - 1] = -1;
            } else if (sv.lmax == SETSTAT && sv.vmax > 0.0) {
                nviol++
                vflag[nviol - 1] = i + design.design_parameters.length;
                ldir[nviol - 1] = +1;
            }
        }
        //@@@  
        //@@@  IF OBJ <= OBJMIN ! NVIOL=0 THEN DO;
        if (obj <= OBJMIN || nviol == 0) {
            //@@@       PUT SKIP(2) EDIT
            //@@@      ('OBJ < OBJMIN - USE OF TRADE IS NOT APPROPRIATE.')
            //@@@      (A);
            console.log('OBJ < OBJMIN - USE OF TRADE IS NOT APPROPRIATE.');
            //@@@       GO TO EXITT;
            //@@@       END;
        } else {
            //@@@  
            //@@@  put skip(2) edit
            //@@@     ('EXISTING CONSTRAINTS:')
            //@@@     (a);
            console.log('EXISTING CONSTRAINTS:');
            //@@@  call clister;
            clister();
            //@@@  call pop;
            var choice = split_line.shift();
            //@@@  
            //@@@  WHAT:
            do {
                //@@@  IF len1(1) = 0 THEN DO;
                if (choice === undefined) {
                    //@@@     PUT SKIP(2) EDIT
                    //@@@        (
                    //@@@     'SPECIFY YOUR TRADE STRATEGY ...  RELAX CONSTRAINTS:',
                    //@@@     '<enter>  OR  0  IN PROPORTION TO THEIR CURRENT VIOLATION',
                    //@@@     '1  IN AN ARBITRARY RATIO',
                    //@@@     '2  TO THE POINT OF THE EXISTING VIOLATIONS',
                    //@@@     '3  RETURN TO COMMAND LEVEL',
                    //@@@     ': '
                    //@@@        )
                    //@@@        (A, col(9), a, 3(col(22), a), skip, a);
                    console.log('SPECIFY YOUR TRADE STRATEGY ...  RELAX CONSTRAINTS:');
                    console.log('        <enter>  OR  0  IN PROPORTION TO THEIR CURRENT VIOLATION');
                    console.log('                     1  IN AN ARBITRARY RATIO');
                    console.log('                     2  TO THE POINT OF THE EXISTING VIOLATIONS');
                    console.log('                     3  RETURN TO COMMAND LEVEL');
                    console.log(': ');
                    //@@@     CALL READIT(op,len1);
                    //  TODO: Prompt for input, return choice
                    choice = '0';
                    //  TODO: Add range check to make sure choice > '3' is eliminated
                    //@@@     END;
                }
                //@@@  
                //@@@                          
                /*  arbitrary ratio  */
                //@@@  IF OP(1)= '1' THEN
                if (choice == '1') {
                    //@@@       DO I=1 TO NVIOL;
                    for (let i = 0; i < nviol; i++) {
                        //@@@       J=VFLAG(I);
                        j = vflag[i];
                        //@@@       len1(1)=0;
                        var value_string = undefined;
                        //@@@  
                        //@@@       do while(len1(1)=0);
                        while (value_string === undefined) {
                            //@@@       if j <= n then dname=parm_name(j);
                            if (j < design.design_parameters.length) {
                                var dp = design.design_parameters[j];
                                var dname = dp.name;
                                //@@@         else dname=st_var_name(j-n);
                            } else {
                                var sv = design.state_variables[j - design.design_parameters.length];
                                var dname = sv.name;
                            }
                            //@@@       PUT SKIP EDIT
                            //@@@      ('WEIGHT FOR ', dname, ': ')
                            //@@@      (A);
                            console.log(sprintf('WEIGHT FOR %s: ', dname));
                            //@@@       CALL READIT(op,len1);
                            //  TODO: Prompt for input, return value_string;
                            var value_string = '1.0'; //  TODO: Check if this is appropriate
                            //@@@       end;
                        }
                        //@@@  
                        //@@@       value=op(1);
                        var value = parseFloat(value_string);
                        //@@@       DIR(I)=LDIR(i)*VALUE;
                        dir[i] = ldir[i] * value;
                        //@@@       END;
                    }
                }
                //@@@  
                //@@@                         /*   existing violations  */
                /* existing violations */
                //@@@    else IF OP(1)= '2' THEN
                else if (choice == '2') {
                    //@@@       DO;
                    //@@@  
                    //@@@       DO I=1 TO NVIOL;
                    for (let i = 0; i < nviol; i++) {
                        //@@@       J=VFLAG(I);
                        j = vflag[i];
                        if (j < design.design_parameters.length) {
                            var dp = design.design_parameters[j];
                            //@@@       if ldir(i) < 0 then
                            if (ldir[i] < 0) {
                                //@@@         do;
                                //@@@         Cmin(J)=Cmin(J)+Vmin(J)*Smin(J)*LDIR(i);
                                dp.cmin = dp.cmin + dp.vmin * dp.smin * ldir[i];
                                //@@@         smin(j)=sclden(x(j),cmin(j),sdlim(j),SETSTAT);
                                dp.smin = sclden(dp.value, dp.cmin, dp.sdlim, SETSTAT);
                                //@@@         end;
                            }
                            //@@@      else
                            //@@@         do;
                            else {
                                //@@@         Cmax(J)=Cmax(J)+Vmax(J)*Smax(J)*LDIR(i);
                                dp.cmax = dp.cmax + dp.vmax * dp.smax * ldir[i];
                                //@@@         smax(j)=sclden(x(j),cmax(j),sdlim(j),SETSTAT);
                                dp.smax = sclden(dp.value, dp.cmax, dp.sdlim, SETSTAT);
                                //@@@         end;
                            }
                            //@@@       END;
                        } else {
                            var sv = design.state_variables[j - design.design_parameters.length];
                            if (ldir[i] < 0) {
                                sv.cmin = sv.cmin + sv.vmin * sv.smin * ldir[i];
                                sv.smin = sclden(sv.value, sv.cmin, sv.sdlim, SETSTAT);
                            } else {
                                sv.cmax = sv.cmax + sv.vmax * sv.smax * ldir[i];
                                sv.smax = sclden(sv.value, sv.cmax, sv.sdlim, SETSTAT);
                            }
                        }
                    }
                    //@@@  
                    //@@@       PUT SKIP(2) EDIT
                    //@@@      ('CONSTRAINT LEVELS RELAXED TO EXISTING VIOLATIONS.')
                    //@@@      (A);
                    console.log('CONSTRAINT LEVELS RELAXED TO EXISTING VIOLATIONS.');
                    //@@@       GO TO EXITT;
                    var p = [];
                    for (let i = 0; i < design.design_parameters.length; i++) {
                        var dp = design.design_parameters[i];
                        p[i] = dp.value;
                    }
                    var obj = despak(p);
                    return;
                    //@@@       END;
                }
                //@@@  
                //@@@                      /*  return to command level  */
                /* return to command level */
                //@@@    else IF OP(1)= '3' THEN GO TO EXITT;
                else if (choice == '3') {
                    var p = [];
                    for (let i = 0; i < design.design_parameters.length; i++) {
                        var dp = design.design_parameters[i];
                        p[i] = dp.value;
                    }
                    var obj = despak(p);
                    return;
                }
                //@@@  
                //@@@                  /*  in proportion to existing violation  */
                /* in proportion to existing violation */
                //@@@    else
                else {
                    //@@@       DO I=1 TO NVIOL;
                    for (let i = 0; i < nviol; i++) {
                        //@@@       J=VFLAG(I);
                        j = vflag[i];
                        if (j < design.design_parameters.length) {
                            var dp = design.design_parameters[j];
                            //@@@       if ldir(i) < 0 then DIR(I)=LDIR(i)*Vmin(J);
                            if (ldir[i] < 0)
                                dir[i] = ldir[i] * dp.vmin;
                            //@@@              else dir(i)=ldir(i)*vmax(j);
                            else
                                dir[i] = ldir[i] * dp.vmax;
                        } else {
                            var sv = design.state_variables[j - design.design_parameters.length];
                            if (ldir[i] < 0)
                                dir[i] = ldir[i] * sv.vmin;
                            else
                                dir[i] = ldir[i] * sv.vmax;
                        }
                        //@@@       END;
                    }
                }
                //@@@  
                /**
                 * **** CREATE normalized VECTOR IN VIOLATED CONSTRAINT SPACE
                 * *****
                 */
                //@@@  VALUE=0.0;
                value = 0.0;
                //@@@  itemp=0;
                itemp = 0;
                //@@@  
                //@@@  DO I=1 TO NVIOL;
                for (let i = 0; i < nviol; i++) {
                    //@@@  temp2=abs(dir(i));
                    temp2 = Math.abs(dir[i]);
                    //@@@  if temp2 > value then do;
                    if (temp2 > value) {
                        //@@@           value=temp2;
                        value = temp2;
                        //@@@           itemp=i;
                        itemp = i;
                        //@@@           end;
                    }
                    //@@@  END;
                }
                //@@@  
                //@@@  IF VALUE < smallnum THEN GO TO WHAT;
            } while (value < SMALLNUM);
            //@@@  
            //@@@  DO I=1 TO NVIOL;
            for (let i = 0; i < nviol; i++) {
                //@@@  DIR(I)=DIR(I)/VALUE;
                dir[i] = dir[i] / value;
                //@@@  if ldir(i) < 0 then TC(I)=Cmin(VFLAG(I));
                j = vflag[i];
                if (j < design.design_parameters.length) {
                    var dp = design.design_parameters[j];
                    if (ldir[i] < 0)
                        tc[i] = dp.cmin;
                    //@@@         else tc(i)=cmax(vflag(i));
                    else
                        tc[i] = dp.cmax;
                } else {
                    var sv = design.state_variables[j - design.design_parameters.length];
                    if (ldir[i] < 0)
                        tc[i] = sv.cmin;
                    else
                        tc[i] = sv.cmax;
                }
                //@@@  END;
            }
            //@@@  
            //@@@  C1=0.0;
            c1 = 0.0
            //@@@  RK1=OBJ;
            rk1 = obj;
            //@@@  
            //@@@  TAGAIN:
            var tagain = true;
            while (tagain) {
                tagain = false;
                /* estimate best step size */
                //@@@  smalest=1.0;
                smalest = 1.0;
                //@@@  bigest =0.0;
                bigest = 0.0;
                //@@@  do i=1 to nviol;
                for (let i = 0; i < nviol; i++) {
                    //@@@  temp2=abs(dir(i));
                    temp2 = Math.abs(dir[i]);
                    //@@@  j=vflag(i);
                    j = vflag[i];
                    if (j < design.design_parameters.length) {
                        var dp = design.design_parameters[j];
                        //@@@  if ldir(i) < 0 then
                        if (ldir[i] < 0)
                            //@@@        if temp2 > smallnum then temp=vmin(j)/temp2;
                            if (temp2 > SMALLNUM)
                                temp = dp.vmin / temp2;
                            //@@@                else temp=vmin(j);
                            else
                                temp = dp.vmin;
                        else
                        //@@@     else
                        //@@@        if temp2 > smallnum then temp=vmax(j)/temp2;
                        if (temp2 > SMALLNUM)
                            temp = dp.vmax / temp2;
                        //@@@                else temp=vmax(j);
                        else
                            temp = dp.vmax;
                    } else {
                        var sv = design.state_variables[j - design.design_parameters.length];
                        if (ldir[i] < 0)
                            if (temp2 > SMALLNUM)
                                temp = dp.vmin / temp2;
                            else
                                temp = dp.vmin;
                        else if (temp2 > SMALLNUM)
                            temp = dp.vmax / temp2;
                        else
                            temp = dp.vmax;
                    }
                    //@@@  if temp  > smallnum
                    //@@@   & temp  < smalest  then smalest = temp;
                    if (temp > SMALLNUM && temp < smalest)
                        smalest = temp;
                    //@@@  if temp  > bigest   then bigest  = temp;
                    if (temp > bigest)
                        bigest = temp;
                    //@@@  end;
                }
                //@@@  
                //@@@  j=vflag(itemp);
                j = vflag[itemp];
                if (j < design.design_parameters.length) {
                    var dp = design.design_parameters[j];
                    //@@@  if ldir(itemp) < 0 then temp1=0.90*vmin(j);
                    if (ldir[itemp] < 0)
                        temp1 = 0.90 * dp.vmin;
                    //@@@             else temp1=0.90*vmax(j);
                    else
                        temp1 = 0.90 * dp.vmax;
                } else {
                    var sv = design.state_variables[j - design.design_parameters.length];
                    if (ldir[itemp] < 0)
                        temp1 = 0.90 * sv.vmin;
                    else
                        temp1 = 0.90 * sv.vmax;
                }
                //@@@  if temp1 < 0.01 then temp1=0.01;
                if (temp1 < 0.01)
                    temp1 = 0.01;
                do {
                    //@@@  
                    //@@@  PUT SKIP EDIT
                    //@@@     (
                    //@@@      'ENTER LOCAL EXPLORATION SIZE  (%)',
                    //@@@      'POSSIBILITIES RANGE FROM', 90.0*smalest, ' TO', 100.0*bigest,
                    //@@@      '(DEFAULT =', temp1*100.0, ' %)    : '
                    //@@@     )
                    //@@@     (A, skip, 2(a, f(6,1)), col(18), a, f(6,1), a);
                    console.log('ENTER LOCAL EXPLORATION SIZE  (%)');
                    console.log(sprintf('POSSIBILITIES RANGE FROM%6.1f TO%6.1f', 90.0 * smalest, 100.0 * bigest));
                    console.log(sprintf('                 (DEFAULT =%6.1f %%)    : ', temp1 * 100.0));
                    //@@@  CALL READIT(op,len1);
                    // TODO: Fix prompt
                    var expSize = undefined;
                    //@@@  if len1(1)=0 then c3=temp1;
                    if (expSize === undefined)
                        c3 = temp1 * 100.0;
                    //@@@           else do;
                    else {
                        //@@@          c3=op(1);
                        c3 = parseFloat(expSize);
                        //@@@          IF C3 < smallnum THEN GO TO TAGAIN;
                    }
                } while (c3 < SMALLNUM);
                //@@@          C3=C3/100.0;
                c3 = c3 / 100.0;
                //@@@          end;
                //@@@  if ansisw = 1 & xeqsw = 0 then put edit(scrclr) (a);
                //@@@  
                /**
                 * ***** TAKE FIRST EXPLORATORY RELAXATION STEP
                 * ******************
                 */
                //@@@  DO  I=1 TO NVIOL;
                for (let i = 0; i < nviol; i++) {
                    //@@@  J=VFLAG(I);
                    j = vflag[i];
                    if (j < design.design_parameters.length) {
                        var dp = design.design_parameters[j];
                        //@@@  if ldir(i) < 0 then
                        if (ldir[i] < 0) {
                            //@@@        do;
                            //@@@        Cmin(J)=Cmin(J)+DIR(I)*Cmin(J)*C3;
                            dp.cmin = dp.cmin + dir[i] * dp.cmin * c3;
                            //@@@        smin(j)=sclden(x(j),cmin(j),sdlim(j),SETSTAT);
                            dp.smin = sclden(dp.value, dp.cmin, dp.sdlim, SETSTAT);
                            //@@@        end;
                        }
                        //@@@     else
                        //@@@        do;
                        else {
                            //@@@        cmax(j)=cmax(j)+dir(i)*cmax(j)*c3;
                            dp.cmax = dp.cmax + dir[i] * dp.cmax * c3;
                            //@@@        smax(j)=sclden(x(j),cmax(j),sdlim(j),SETSTAT);
                            dp.smax = sclden(dp.value, dp.cmax, dp.sdlim, SETSTAT);
                            //@@@        end;
                        }
                    } else {
                        var sv = design.state_variables[j - design.design_parameters.length];
                        if (ldir[i] < 0) {
                            sv.cmin = sv.cmin + dir[i] * sv.cmin * c3;
                            sv.smin = sclden(sv.value, sv.cmin, sv.sdlim, SETSTAT);
                        } else {
                            sv.cmax = sv.cmax + dir[i] * sv.cmax * c3;
                            sv.smax = sclden(sv.value, sv.cmax, sv.sdlim, SETSTAT);
                        }
                    }
                    //@@@  END;
                }
                //@@@  
                //@@@  CALL DESPAK(P,OBJ);
                var p = [];
                for (let i = 0; i < design.design_parameters.length; i++) {
                    var dp = design.design_parameters[i];
                    p[i] = dp.value;
                }
                var obj = despak(p);
                //@@@  IF OBJ > OBJMIN THEN call SRCH(p,obj);
                if (obj > OBJMIN)
                    var obj = srch();
                //@@@  
                //@@@  NOTPOS:
                var notpos = true;
                while (notpos) {
                    notpos = false;
                    //@@@  IF OBJ <= OBJMIN THEN DO;
                    if (obj <= OBJMIN) {
                        //@@@       PUT SKIP(2) EDIT
                        //@@@      (
                        //@@@       'A FEASIBLE POINT HAS BEEN ESTABLISHED.',
                        //@@@       'EXISTING CONSTRAINTS:'
                        //@@@      )
                        //@@@      (A, skip);
                        console.log('A FEASIBLE POINT HAS BEEN ESTABLISHED.');
                        console.log('EXISTING CONSTRAINTS:')
                        //@@@       call clister;
                        clister();
                        //@@@       PUT SKIP(2) EDIT
                        //@@@      (
                        //@@@       'SPECIFY:',
                        //@@@       '<enter>  OR  0  TO RESTART WITH A SMALLER STEP SIZE',
                        //@@@       '1  TO RETURN TO COMMAND LEVEL WITH THESE CONSTRAINTS',
                        //@@@       ': '
                        //@@@      )
                        //@@@      (A, skip, col(9), a, col(22), a, skip, a);
                        console.log('SPECIFY:');
                        console.log('        <enter>  OR  0  TO RESTART WITH A SMALLER STEP SIZE');
                        console.log('                     1  TO RETURN TO COMMAND LEVEL WITH THESE CONSTRAINTS');
                        console.log(': ');
                        //@@@       CALL READIT(op,len1);
                        // TODO: Prompt for input, return choice
                        var choice = '1';
                        //@@@       IF OP(1)= '1' THEN GO TO EXITT;
                        if (choice == '1') {
                            var p = [];
                            for (let i = 0; i < design.design_parameters.length; i++) {
                                var dp = design.design_parameters[i];
                                p[i] = dp.value;
                            }
                            var obj = despak(p);
                            return;
                        }
                        //@@@  
                        //@@@       DO I=1 TO NVIOL;
                        for (let i = 0; i < nviol; i++) {
                            //@@@       J=VFLAG(I);
                            j = vflag[i];
                            if (j < design.design_parameters.length) {
                                var dp = design.design_parameters[j];
                                //@@@       if ldir(i) < 0 then
                                if (ldir[i] < 0) {
                                    //@@@        do;
                                    //@@@        Cmin(J)=TC(I);
                                    dp.cmin = tc[i];
                                    //@@@        smin(j)=sclden(x(j),cmin(j),sdlim(j),SETSTAT);
                                    dp.smin = sclden(dp.value, dp.cmin, dp.sdlim, SETSTAT);
                                    //@@@        end;
                                }
                                //@@@     else
                                //@@@        do;
                                else {
                                    //@@@        cmax(j)=tc(i);
                                    dp.cmax = tc[i];
                                    //@@@        smax(j)=sclden(x(j),cmax(j),sdlim(j),SETSTAT);
                                    dp.smax = sclden(dp.value, dp.cmax, dp.sdlim, SETSTAT);
                                    //@@@        end;
                                }
                            } else {
                                var sv = design.state_variables[j - design.design_parameters.length];
                                if (ldir[i] < 0) {
                                    sv.cmin = tc[i];
                                    sv.smin = sclden(sv.value, sv.cmin, sv.sdlim, SETSTAT);
                                } else {
                                    sv.cmax = tc[i];
                                    sv.smax = sclden(sv.value, sv.cmax, sv.sdlim, SETSTAT);
                                }
                            }
                            //@@@       END;
                        }
                        //@@@  
                        /* call to despak here ??? */
                        //@@@       CALL RESET(p);
                        reset();
                        //@@@       GO TO TAGAIN;
                        var tagain = true;
                        //@@@       END;
                    } else {
                        //@@@  
                        //@@@  IF IOOPT > 1 THEN
                        if (IOOPT > 1) {
                            //@@@       do;
                            //@@@       put skip(2) edit
                            //@@@       ('TRIAL (FULL STEP) CONSTRAINTS:')
                            //@@@       (a);
                            console.log('TRIAL (FULL STEP) CONSTRAINTS:');
                            //@@@       call clister;
                            clister();
                            //@@@       end;
                        }
                        //@@@  
                        //@@@  RK3=OBJ;
                        rk3 = obj;
                        //@@@  
                        /**
                         * **** MAKE SECOND EXPLORATORY STEP 1/2 WAY TO THE
                         * FIRST ONE ***
                         */
                        //@@@  C2=C3/2.0;
                        c2 = c3 / 2.0;
                        //@@@  
                        //@@@  DO I=1 TO NVIOL;
                        for (let i = 0; i < nviol; i++) {
                            //@@@  J=VFLAG(I);
                            j = vflag[i];
                            if (j < design.design_parameters.length) {
                                var dp = design.design_parameters[j];
                                //@@@  if ldir(i) < 0 then
                                if (ldir[i] < 0) {
                                    //@@@        do;
                                    //@@@        cmin(j)=tc(i)+dir(i)*tc(i)*c2;
                                    dp.cmin = tc[i] + dir[i] * tc[i] * c2;
                                    //@@@        smin(j)=sclden(x(j),cmin(j),sdlim(j),SETSTAT);
                                    dp.smin = sclden(dp.value, dp.cmin, dp.sdlim, SETSTAT);
                                    //@@@        end;
                                }
                                //@@@     else
                                //@@@        do;
                                else {
                                    //@@@        cmax(j)=tc(i)+dir(i)*tc(i)*c2;
                                    dp.cmax = tc[i] + dir[i] * tc[i] * c2;
                                    //@@@        smax(j)=sclden(x(j),cmax(j),sdlim(j),SETSTAT);
                                    dp.smin = sclden(dp.value, dp.cmax, dp.sdlim, SETSTAT);
                                    //@@@        end;
                                }
                            } else {
                                var sv = design.state_variables[j - design.design_parameters.length];
                                if (ldir[i] < 0) {
                                    sv.cmin = tc[i] + dir[i] * tc[i] * c2;
                                    sv.smin = sclden(sv.value, sv.cmin, sv.sdlim, SETSTAT);
                                } else {
                                    sv.cmax = tc[i] + dir[i] * tc[i] * c2;
                                    sv.smin = sclden(sv.value, sv.cmax, sv.sdlim, SETSTAT);
                                }
                            }
                            //@@@  END;
                        }
                        //@@@  
                        //@@@  CALL RESET(p);
                        reset();
                        //@@@  call SRCH(p,obj);
                        var obj = srch();
                        //@@@  
                        //@@@  IF OBJ <= OBJMIN THEN GO TO NOTPOS;
                        if (obj <= OBJMIN)
                            notpos = true;
                    }
                }
            }
            //@@@  
            //@@@  IF IOOPT > 1 THEN
            if (IOOPT > 1) {
                //@@@       do;
                //@@@       put skip(2) edit
                //@@@       ('TRIAL (HALF STEP) CONSTRAINTS:')
                //@@@       (a);
                console.log('TRIAL (HALF STEP) CONSTRAINTS:');
                //@@@       call clister;
                clister();
                //@@@       end;
            }
            //@@@  
            //@@@  RK2=OBJ;
            rk2 = obj;
            //@@@  
            /** ******** QUADRATIC EXTRAPOLATION ****************************** */
            /* REFER TO THESIS FIGURE 4-2 */

            /* FOR THE CASE THAT C1 ^= 0 : */

            /* A=C1-C2; */
            /* SMC=C1-C3; */
            /* CAPB= C1*(RK2AB-RK3BC) -C2*(RK1AC+RK3BC) +C3*(RK2AB-RK1AC); */
            /* CAPC= C2*C3*RK1AC -C1*C3*RK2AB +C1*C2*RK3BC; */

            /* HOWEVER IN THIS CASE C1=0, SO TERMS DROP OUT */
            //@@@  
            //@@@  A=-C2;
            a = -c2;
            //@@@  B=C2-C3;
            b = c2 - c3;
            //@@@  SMC=-C3;
            smc = -c3;
            //@@@  
            //@@@  RK1AC=RK1/(A*SMC);
            rk1ac = rk1 / (a * smc);
            //@@@  RK2AB=RK2/(A*B);
            rk2ab = rk2 / (a * b);
            //@@@  RK3BC=RK3/(B*SMC);
            rk3bc = rk3 / (b * smc);
            //@@@  
            //@@@  CAPA= RK1AC -RK2AB +RK3BC;
            capa = rk1ac - rk2ab + rk3bc;
            //@@@  CAPB= -C2*(RK1AC+RK3BC) +C3*(RK2AB-RK1AC);
            capb = -c2 * (rk1ac + rk3bc) + c3 * (rk2ab - rk1ac);
            //@@@  CAPC= RK1;
            capc = rk1;
            //@@@  
            //@@@  ARG=CAPB*CAPB-4.0*CAPA*CAPC;
            arg = capb * capb - 4.0 * capa * capc;
            //@@@  
            //@@@  IF ARG < 0.0 THEN DO;
            if (arg < 0.0) {
                //@@@       PUT SKIP(2) EDIT
                //@@@      ('THERE MAY BE NO FEASIBLE SOLUTION IN THIS DIRECTION.')
                //@@@      (A);
                console.log('THERE MAY BE NO FEASIBLE SOLUTION IN THIS DIRECTION.');
                //@@@  
                //@@@       IF IOOPT > 3 THEN DO;
                //@@@        PUT SKIP(2) EDIT('LINEAR EXTRAPOLATION:') (A);
                //@@@        C0=RK2*(C3-C2)/(RK2-RK3)+C2;
                //@@@  
                //@@@        DO I=1 TO NVIOL;
                //@@@        J=VFLAG(I);
                //@@@        VALUE=TC(I)+DIR(I)*TC(I)*C0;
                //@@@  /*  temporary deletion
                //@@@        PUT SKIP EDIT
                //@@@           (CON_NAME(J), VALUE, CON_UNIT(J))
                //@@@           (A(16), X(4), F(16,4), X(3), A);
                //@@@  */
                //@@@        END;
                //@@@        END;
                //@@@  
                //@@@       PUT SKIP(2) EDIT
                //@@@      ('PARABOLA AXIS OF SYMMETRY:')
                //@@@      (A);
                console.log('PARABOLA AXIS OF SYMMETRY:');
                //@@@       C0= -CAPB/(2.0*CAPA);
                c0 = -capb / (2.0 * capa);
                //@@@       GO TO KWIKIE;
                //@@@  END;
            } else {
                //@@@  
                //@@@  C0=(-CAPB-SQRT(ARG))/(2.0*CAPA);       
                /* TAKE SMALLER ROOT  */
                c0 = (-capb - Math.sqrt(arg)) / (2.0 * capa);
                //@@@  
                /** ******************************************************************* */
                //@@@  
                //@@@  PUT SKIP(2) EDIT
                //@@@     ('EXTRAPOLATION INDICATES A FEASIBLE SOLUTION AT:')
                //@@@     (A);
                console.log('EXTRAPOLATION INDICATES A FEASIBLE SOLUTION AT:');
            }
            //@@@  KWIKIE:
            //@@@  DO I=1 TO NVIOL;
            for (let i = 0; i < nviol; i++) {
                //@@@  J=VFLAG(I);
                j = vflag[i];
                if (j < design.design_parameters.length) {
                    var dp = design.design_parameters[j];
                    //@@@  if ldir(i) < 0 then
                    if (ldir[i] < 0) {
                        //@@@        do;
                        //@@@        Cmin(J)=TC(I)+DIR(I)*TC(I)*C0;
                        dp.cmin = tc[i] + dir[i] * tc[i] * c0;
                        //@@@        smin(j)=sclden(x(j),cmin(j),sdlim(j),SETSTAT);
                        dp.smin = sclden(dp.value, dp.cmin, dp.sdlim, SETSTAT);
                        //@@@        if j <= n
                        //@@@       then put skip edit
                        //@@@          (parm_name(j),   ' MIN', cmin(j), parm_unit(j))
                        //@@@          (r(lvlfmt));
                        console.log(sprintf('%-16s MIN%16.4f   %s', dp.name, dp.cmin, dp.units));
                        //@@@       else put skip edit
                        //@@@          (st_var_name(j-n), ' MIN', cmin(j), st_var_unit(j-n))
                        //@@@          (r(lvlfmt));
                        //@@@        end;
                    }
                    //@@@     else
                    //@@@        do;
                    else {
                        //@@@        Cmax(J)=TC(I)+DIR(I)*TC(I)*C0;
                        dp.cmax = tc[i] + dir[i] * tc[i] * c0;
                        //@@@        smax(j)=sclden(x(j),cmax(j),sdlim(j),SETSTAT);
                        dp.smax = sclden(dp.value, dp.cmax, dp.sdlim, SETSTAT);
                        //@@@        if j <= n
                        //@@@       then put skip edit
                        //@@@          (parm_name(j),   ' MAX', cmax(j), parm_unit(j))
                        //@@@          (r(lvlfmt));
                        console.log(sprintf('%-16s MAX%16.4f   %s', dp.name, dp.cmax, dp.units));
                        //@@@       else put skip edit
                        //@@@          (st_var_name(j-n), ' MAX', cmax(j), st_var_unit(j-n))
                        //@@@          (r(lvlfmt));
                        //@@@        end;
                    }
                } else {
                    var sv = design.state_variables[j - design.design_parameters.length];
                    if (ldir[i] < 0) {
                        sv.cmin = tc[i] + dir[i] * tc[i] * c0;
                        sv.smin = sclden(sv.value, sv.cmin, sv.sdlim, SETSTAT);
                        console.log(sprintf('%-16s MIN%16.4f   %s', sv.name, sv.cmin, sv.units));
                    } else {
                        sv.cmax = tc[i] + dir[i] * tc[i] * c0;
                        sv.smax = sclden(sv.value, sv.cmax, sv.sdlim, SETSTAT);
                        console.log(sprintf('%-16s MAX%16.4f   %s', sv.name, sv.cmax, sv.units));
                    }
                }
                //@@@  LVLFMT: format(a(16), a(4), F(16,4), X(3), A);
                //@@@  END;
            }
            //@@@  
            //@@@  PUT SKIP(2) EDIT
            //@@@     ('DO YOU WISH TO ESTABLISH THIS SET OF CONSTRAINTS ?  (y/N) : ')
            //@@@     (A);
            console.log('DO YOU WISH TO ESTABLISH THIS SET OF CONSTRAINTS ?  (y/N) : ');
            //@@@  CALL READIT(op,len1);
            // TODO: Prompt, return yn
            var yn = 'N';
            //@@@  if ansisw = 1 & xeqsw = 0 then put edit(scrclr) (a);
            //@@@  if len1(1) > 0 & op(1)=substr(yes,kone,len1(1)) then do;
            if (yn !== undefined && 'YES'.startsWith(yn)) {
                //@@@  
                //@@@       call SRCH(p,obj);
                var obj = srch();
                //@@@  
                //@@@       IF OBJ <= OBJMIN THEN DO;
                if (obj <= OBJMIN) {
                    //@@@        PUT SKIP(2) EDIT('THE RESULT IS FEASIBLE.') (A);
                    console.log('THE RESULT IS FEASIBLE.');
                    //@@@        GO TO EXITT;
                    var p = [];
                    for (let i = 0; i < design.design_parameters.length; i++) {
                        var dp = design.design_parameters[i];
                        p[i] = dp.value;
                    }
                    var obj = despak(p);
                    return;
                    //@@@        END;
                }
                //@@@  
                //@@@  RRC:
                while (!top) {
                    //@@@       PUT SKIP(2) EDIT
                    //@@@      (
                    //@@@       'THE RESULT IS NOT FEASIBLE:    OBJ =', OBJ,
                    //@@@       'SPECIFY:',
                    //@@@       '<enter>  OR  0  TO MAKE ANOTHER EXTRAPOLATION SERIES',
                    //@@@       '1  TO RESTART FROM THE BEGINNING OF THIS SERIES',
                    //@@@       '2  TO RETURN TO COMMAND LEVEL WITH THESE CONSTRAINTS',
                    //@@@       ': '
                    //@@@      )
                    //@@@       (A, F(18,6), SKIP(2), A, skip, col(9), a, 2(col(22), a), skip, a);
                    console.log('THE RESULT IS NOT FEASIBLE:    OBJ =%18.6f', OBJ);
                    console.log('SPECIFY:');
                    console.log('        <enter>  OR  0  TO MAKE ANOTHER EXTRAPOLATION SERIES');
                    console.log('                     1  TO RESTART FROM THE BEGINNING OF THIS SERIES');
                    console.log('                     2  TO RETURN TO COMMAND LEVEL WITH THESE CONSTRAINTS');
                    console.log(': ');
                    //@@@       CALL READIT(op,len1);
                    // TODO: Prompt for input, return choice
                    var choice = '2';
                    //@@@       if ansisw = 1 & xeqsw = 0 then put edit(scrclr) (a);
                    //@@@  
                    //@@@       IF OP(1)= '2' THEN GO TO EXITT;
                    if (choice == '2') {
                        var p = [];
                        for (let i = 0; i < design.design_parameters.length; i++) {
                            var dp = design.design_parameters[i];
                            p[i] = dp.value;
                        }
                        var obj = despak(p);
                        return;
                    }
                    //@@@       IF OP(1)= '1' THEN DO;
                    if (choice == '1') {
                        //@@@        DO I=1 TO NVIOL;
                        for (let i = 0; i < nviol; i++) {
                            //@@@        J=VFLAG(I);
                            j = vflag[i];
                            if (j < design.design_parameters.length) {
                                var dp = design.design_parameters[j];
                                //@@@        if ldir(i) < 0 then Cmin(J)=TC(I);
                                if (ldir[i] < 0)
                                    dp.cmin = tc[i];
                                //@@@               else cmax(j)=tc(i);
                                else
                                    dp.cmax = tc[i];
                            } else {
                                var sv = design.state_variables[j - design.design_parameters.length];
                                if (ldir[i] < 0)
                                    sv.cmin = tc[i];
                                else
                                    sv.cmax = tc[i];
                            }
                            //@@@        END;
                        }
                        //@@@  
                        //@@@        CALL RESET(p);
                        reset();
                        //@@@        GO TO TOP;
                        top = true;
                        //@@@        END;
                    }
                    //@@@       IF len1(1)=0 | OP(1)= '0' THEN GO TO TOP;
                    if (choice == undefined || choice == '0')
                        top = true;
                    //@@@       GO TO RRC;
                }
                //@@@  END;
            }
        }
        //@@@  
        //@@@  DO I=1 TO NVIOL;
        for (let i = 0; i < nviol; i++) {
            //@@@  J=VFLAG(I);
            j = vflag[i];
            if (j < design.design_parameters.length) {
                var dp = design.design_parameters[j];
                //@@@  if ldir(i) < 0 then Cmin(j)=TC(I);
                if (ldir[i] < 0)
                    dp.cmin = tc[i];
                //@@@         else cmax(j)=tc(i);
                else
                    dp.cmax = tc[i];
            } else {
                var sv = design.state_variables[j - design.design_parameters.length];
                if (ldir[i] < 0)
                    sv.cmin = tc[i];
                else
                    sv.cmax = tc[i];
            }
            //@@@        END;
        }
        //@@@  
        //@@@  CALL RESET(p);
        reset();
        //@@@  
        //@@@  EXITT:
    }
    //@@@  call despak(p,obj);
    var p = [];
    for (let i = 0; i < design.design_parameters.length; i++) {
        var dp = design.design_parameters[i];
        p[i] = dp.value;
    }
    var obj = despak(p);
    //@@@  
    //@@@  CLISTER: procedure;
    function clister() {
        //@@@  PUT SKIP EDIT
        //@@@     (
        //@@@      'CONSTRAINT                % VIOLATION           LEVEL'
        //@@@     )
        //@@@     (A, skip);
        console.log('CONSTRAINT                % VIOLATION           LEVEL');
        //@@@  
        //@@@  DO I=1 TO NVIOL;
        for (let i = 0; i < nviol; i++) {
            //@@@  J=VFLAG(I);
            let j = vflag[i];
            //@@@  if j <= n then
            if (j < design.design_parameters.length) {
                var dp = design.design_parameters[j];
                //@@@  do;
                //@@@  if ldir(i) < 0 then PUT SKIP EDIT
                if (ldir[i] < 0)
                    //@@@     (parm_NAME(J), ' MIN', Vmin(J)*100.0, Cmin(J),
                    //@@@      '   ', parm_UNIT(J))
                    //@@@     (r(violfmt));
                    console.log(sprintf('%-16s MIN%14.4f%18.4f   %s', dp.name, dp.vmin * 100.0, dp.cmin, dp.units));
                //@@@   else put skip edit
                else
                    //@@@     (parm_NAME(J), ' MAX', Vmax(J)*100.0, Cmax(J),
                    //@@@      '   ', parm_UNIT(J))
                    //@@@     (r(violfmt));
                    console.log(sprintf('%-16s MAX%14.4f%18.4f   %s', dp.name, dp.vmax * 100.0, dp.cmax, dp.units));
                //@@@  end;
            }
            //@@@  else do;
            else {
                var sv = design.state_variables[j - design.design_parameters.length];
                //@@@  im=j-n;
                //@@@  if ldir(i) < 0 then PUT SKIP EDIT
                if (ldir[i] < 0)
                    //@@@     (st_var_NAME(im), ' MIN', Vmin(J)*100.0, Cmin(J),
                    //@@@      '   ', st_var_UNIT(im))
                    //@@@     (r(violfmt));
                    console.log(sprintf('%-16s MIN%14.4f%18.4f   %s', sv.name, sv.vmin * 100.0, sv.cmin, sv.units));
                //@@@   else put skip edit
                else
                    //@@@     (st_var_NAME(im), ' MAX', Vmax(J)*100.0, Cmax(J),
                    //@@@      '   ', st_var_UNIT(im))
                    //@@@     (r(violfmt));
                    console.log(sprintf('%-16s MAX%14.4f%18.4f   %s', sv.name, sv.vmax * 100.0, sv.cmax, sv.units));
                //@@@  end;
            }
            //@@@  END;
        }
        //@@@  
        //@@@  VIOLFMT: format(A(16), a, F(14,4), F(18,4), A, A);
        //@@@  END CLISTER;
    }
    //@@@  
    //@@@  INSTRT:
    //@@@  
    //@@@  END TRADE;
}

module.exports = trade;

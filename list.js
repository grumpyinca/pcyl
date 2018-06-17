const despak = require('./despak');

function list(split_line) {


//LIST: procedure(p,obj);
//
//%include 'maxdims.inc';
//%include 'symbols.inc';
//
//%replace NORM    by  '0';
//%replace HILITE  by  '1';
//
//declare (p(nmax), obj) float;
//
//%include 'state.inc';
//%include 'names.inc';
//%include 'control.inc';
//%include 'search.inc';
//%include 'constant.inc';
//%include 'scratch.inc';
//
//declare
//     (checkpt, sysprint)  file,
//     (i, j, im, kd, icmd) fixed,
//     minlbl character(3) static initial('MIN'),
//     maxlbl character(3) static initial('MAX'),
//     targfile file variable external,
//     despak   entry((nmax)float, float),
//     pause    entry(fixed,fixed,fixed,fixed) returns(fixed),
//     pop      entry
//    ;
//
//%replace cmdmax by 16;          /* size of command branch table  */
//DECLARE  DESTINATION(cmdmax) LABEL,
//     COMMAND(cmdmax) CHARACTER(12) VARYING static INITIAL
//    (
//     'ALL',        'INDEPENDENT',  'DEPENDENT',   'BOTH_I&D',
//     'VIOLATIONS', 'DESIGN',       'PARAMETERS',  'STATE',
//     'VARIABLES',  'CONSTANTS',    'SATISFIED',   'OBJECTIVE',
//     'LEVELS',     'FIXED',        'LABEL',       'INTERNAL'
//    );
//
    var commands = {
        all : function() {
            display_independent();
            display_dependent();
            display_constants();
        },
        independent : function() {
            display_independent();
        },
        dependent : function() {
            display_dependent();
        },
        'both_i&d' : function() {
            display_independent();
            display_dependent();
        },
        violations : function() {
            display_violations();
        },
        design : function() {
            display_independent();
        },
        parameters : function() {
            display_independent();
        },
        state : function() {
            display_dependent();
        },
        variables : function() {
            display_dependent();
        },
        constants : function() {
            display_constants();
        },
        satisfied : function() {
            console.log('In SATISFIED');
        },
        objective : function() {
            display_objective();
        },
        levels : function() {
            display_levels();
        },
        fixed : function() {
            display_fixed_free();
        },
        label : function() {
            console.log('List label is not yet implemented.');
        },
        internal : function() {
            console.log('List intenal is not yet implemented.L');
        }
    };
//
//
//if readok = 0 then do;
//    put skip list('START COMMAND REQUIRED');
//    go to instrt;
//    end;
//m_flag=0;           /*  avoid loop induced by error recovery */
//CALL DESPAK(P,OBJ);
    var obj = despak();
    var subcommand = split_line.shift();
    if (subcommand !== undefined) {
        while (subcommand !== undefined) {
            var hits = false;
//IF OP(2) = '' THEN GO TO RERUN;
//
//CHEKER:
//   IF OP(2)='' THEN GO TO INSTRT;
//   call pop;
//
//JUMP:
//  DO icmd=1 TO cmdmax;
//  IF OP(1) = SUBSTR(COMMAND(icmd), KONE, LEN1(1)) THEN
//      do;
//      if  ansisw = 1
//        & xeqsw  = 0
//        & targfile = sysprint
//        & icmd  ^= 12
//        & msgsw(5) = 0
//       then put edit(scrclr) (a);
//      msgsw(5)=0;      /*  signal that call is after SEARCH  */
//      go to destination(icmd);
//      end;
//  END;
            if (!hits) {
                for ( var property in commands) {
                    if (commands.hasOwnProperty(property)) {
                        if (property.startsWith(subcommand)) {
                            commands[property]();
                            hits = true;
                            break;
                        }
                    }
                }
            }
//
//  j=0;
//  DO I= 1 TO N;
//  IF OP(1)=SUBSTR(PARM_NAME(I),  KONE,LEN1(1)) THEN
//     do;
//     call putdpsv(parm_name(i),p(i),parm_unit(i),i,obj);
//     j=1;
//     end;
//  END;
            if (!hits) {
                for ( var property in design_parameters) {
                    if (design_parameters.hasOwnProperty(property)) {
                        var dp = design_parameters[property];
                        if (property.startsWith(subcommand)) {
                            putdpsv(property, dp.value, dp.units, dp);
                            hits = true;
                        }
                    }
                }
            }
//
//  DO I= 1 TO K;
//  IF OP(1)=SUBSTR(ST_VAR_NAME(I),KONE,LEN1(1)) THEN
//     do;
//     im=i+n;
//     call putdpsv(st_var_name(i),x(i),st_var_unit(i),im,obj);
//     j=1;
//     end;
//  END;
            if (!hits) {
                for ( var property in state_variables) {
                    if (state_variables.hasOwnProperty(property)) {
                        var sv = state_variables[property];
                        if (property.startsWith(subcommand)) {
                            putdpsv(property, sv.value, sv.units, sv);
                            hits = true;
                        }
                    }
                }
            }
//
//  do i= 1 to lds;
//  if op(1)=substr(ds_name(I),    kone,len1(1)) then do;
//     put skip edit
//    (ds_name(i), '= ', ds(i)  )
//    (r(consfmt));
//     j=1;
//     end;
//  end;
//
//  do i= 1 to ldi;
//  if op(1)=substr(di_name(I),    kone,len1(1)) then do;
//     put skip edit
//    (di_name(i), '=', di(i), di_unit(i))
//    (r(conifmt));
//     j=1;
//     end;
//  end;
//
//  do i= 1 to ld;
//  if op(1)=substr(dc_name(I),    kone,len1(1)) then do;
//     put skip edit
//    (dc_name(i), '=', d(i), dc_unit(i))
//    (r(parmfmt));
//     j=1;
//     end;
//  end;
            if (!hits) {
                for ( var property in constants) {
                    if (constants.hasOwnProperty(property)) {
                        var constant = constants[property];
                        if (property.startsWith(subcommand)) {
                            console.out(property, '=', constant.value, constant.units);
                            hits = true;
                        }
                    }
                }
            }
//
//if j=1 then go to cheker;
//PUT SKIP EDIT(OP(1), ' ? ?') (A,A);
            if (!hits) {
                console.log(subcommand + ' ? ?')
            }
//
//RERUN:
//put skip edit
//    (
//     'LIST:',
//     'ENTER MODIFIERS INDICATING OUTPUT DESIRED.'
//    )
//    (a, skip);
//if ioopt > 2 then put skip edit
//    (
//     'POSSIBLE MODIFIERS ARE:',
//     ((command(i), ',  ') do i = 1 to cmdmax-1),
//     command(cmdmax)
//    )
//    (a, skip, 3(col(4), 6(a, a), skip));
//go to instrt;
//
            subcommand = split_line.shift();
        }
    } else {
        console.log("LIST:");
        console.log("ENTER MODIFIERS INDICATING OUTPUT DESIRED.");
        console.log("POSSIBLE MODIFIERS ARE:");
        var i = 0;
        var string = '';
        for ( var property in commands) {
            if (commands.hasOwnProperty(property)) {
                i++;
                if (string != '') string += ", ";
                string += property;
                if (i % 6 == 0) {console.log(string); i=0; string='';}
            }
        }
        if (string != '') {console.log(string);}
    }
//destination( 1): go to lblout;      /* "ALL"        */
//destination( 2): go to indep;       /* I  only      */
//destination( 3): go to dep;         /* D  only      */
//destination( 4): go to indep;       /* both I & D   */
//destination( 5): go to viol;
//destination( 6): go to dpsv;
//destination( 7): go to dpsv;
//destination( 8): go to sv;
//destination( 9): go to sv;
//destination(10): go to dcout;
//destination(11): go to viol;
//destination(12): go to objt;
//destination(13): go to levels;
//destination(14): go to fxfr;
//destination(15): go to lblout;
//destination(16): go to intern;
//
//
    // TODO Add LABEL Processing
//LBLOUT:
//put file(targfile) skip;
//if targfile=checkpt & lineno(checkpt) > 50 then
//                    put file(targfile) page;
//put file(targfile) list('LABEL:');
//do i=1 to lblmax;
//if lblprmt(i) ^= '' then
//     put file(targfile) skip edit
//       (lblprmt(i), lblarry(i)) (col(8), a, col(40), a, skip);
//end;
//IF icmd ^= 1 THEN GO TO CHEKER;
//
//DCOUT:
//if targfile=checkpt & lineno(checkpt) > 45 then
//                    put file(targfile) page;
//if targfile=checkpt | ioopt >= 3 then
//   PUT file(targfile) SKIP(2) EDIT
//   ('CONSTANTS') (a);
//if lds > 0 then put file(targfile) skip(2) edit
//     (((ds_name(i), '= ',             ds(i)) do i=1 to lds))
//     ( r(consfmt));
//if ldi > 0 then put file(targfile) skip    edit
//     (((di_name(i), '=', di(i),  di_unit(i)) do i=1 to ldi))
//     ( r(conifmt));
//if lds+ldi+ld > 25 & targfile=sysprint then
//   do;
//   put skip(2);
//   itemp=pause(ansisw,shomode,isec,0);
//   IF icmd ^= 1 & itemp = 0 THEN GO TO CHEKER;
//   end;
//if ld  > 0 then put file(targfile) skip    edit
//     (((dc_name(i), '=', d(i),   dc_unit(i)) do i=1 to ld))
//     ( r(confmt));
//IF icmd ^= 1 THEN GO TO CHEKER;
//
    function display_constants() {
        console.log('CONSTANTS') ;
        for ( var property in constants) {
            if (constants.hasOwnProperty(property)) {
                  console.log(property + ' = ' + constants[property].value
                          + constants[property].units);
            }
        }
    }
//
//INDEP:
//put file(targfile) skip;
//if targfile=checkpt & lineno(checkpt) > 45 then
//                    put file(targfile) page;
//put file(targfile) skip edit
//     ('INDEPENDENT VARIABLES', 'CONSTRAINT LEVELS',
//      'STATUS', '  MIN ', '   MAX')
//     (r(lttlfmt));
//do i=1 to n;
//if  targfile=checkpt
//  | ioopt >= dpclass(i)
//  | ioopt >= 4
//  | lmin(i) ^= FREESTAT
//  | lmax(i) ^= FREESTAT
//   then call putdpsv(parm_name(i),p(i),parm_unit(i),i,obj);
//end;
//if icmd ^= 1 & icmd ^= 4 then go to cheker;
    function display_independent() {
      console.log('INDEPENDENT VARIABLES', 'CONSTRAINT LEVELS', 'STATUS', '  MIN ', '   MAX');
        for ( var property in design_parameters) {
            if (design_parameters.hasOwnProperty(property)) {
                var dp = design_parameters[property];
                if (dp.lmin != FREESTAT || p.lmin != FREESTAT) {
                    putdpsv(property, dp.value, dp.units, dp);
                }
            }
        }
    }
//
//DEP:
//put file(targfile) skip;
//if targfile=checkpt & lineno(checkpt) > 45 then
//                    put file(targfile) page;
//if icmd ^= 4 then put file(targfile) skip edit
//     ('DEPENDENT VARIABLES', 'CONSTRAINT LEVELS',
//      'STATUS', '  MIN ', '   MAX')
//     (r(lttlfmt));
//do i= 1 to k;
//im=i+n;
//if targfile=checkpt
// | ioopt >= svclass(i)
// | ioopt >= 4
//  | lmin(im) ^= FREESTAT
//  | lmax(im) ^= FREESTAT
//  then call putdpsv(st_var_name(i),x(i),st_var_unit(i),im,obj);
//end;
//IF icmd ^= 1 THEN GO TO CHEKER;
    function display_dependent() {
        console.log('DEPENDENT VARIABLES', 'CONSTRAINT LEVELS', 'STATUS', '  MIN ', '   MAX');
        for ( var property in state_variables) {
            if (state_variables.hasOwnProperty(property)) {
                var sv = state_variables[property];
                if (sv.lmin != FREESTAT || p.lmin != FREESTAT) {
                    putdpsv(property, sv.value, sv.units, sv);
                }
            }
        }
    }
//
//FXFR:
//put file(targfile) skip;
//if targfile=checkpt & lineno(checkpt) > 45 then
//                    put file(targfile) page;
//IF NFIXED=0 & NSTF = 0 THEN
//   PUT file(targfile) SKIP LIST
//    ('NO VARIABLES HAVE "FIXED" STATUS.');
//  else
//   do;
//   PUT file(targfile) SKIP edit
//      ('VARIABLES WITH "FIXED" STATUS ARE:', ' ',
//   'STATUS', '  MIN ', '   MAX')
//      (r(lttlfmt));
//   IF NFIXED > 0 THEN
//      DO I=1 TO N;
//      IF lmin(I) = 2 THEN
//    call putdpsv(parm_name(i),p(i),parm_unit(i),i,obj);
//      END;
//   PUT file(targfile) SKIP;
//   IF NSTF > 0 THEN
//      DO I=1 TO K;
//      im=i+n;
//      IF lmin(im) = 2 THEN
//    call putdpsv(st_var_name(i),x(i),st_var_unit(i),im,obj);
//      END;
//   end;
//if icmd ^= 1 then go to cheker;
    function display_fixed_free() {
        if (NFIXED == 0 & NSTF == 0) {
            console.log('NO VARIABLES HAVE "FIXED" STATUS.');
        } else {
            console.log('VARIABLES WITH "FIXED" STATUS ARE:', ' ', 'STATUS', '  MIN ', '   MAX')
            if (NFIXED > 0) {
                for ( var property in design_parameters) {
                    if (design_parameters.hasOwnProperty(property)) {
                        var dp = design_parameters[property];
                        if (dp.lmin == FIXEDSTAT) {
                            putdpsv(property, dp.value, dp.units, dp);
                        }
                    }
                }
            }
            if (NSTF > 0) {
                for ( var property in state_variables) {
                    if (state_variables.hasOwnProperty(property)) {
                        var sv = state_variables[property];
                        if (sv.lmin == FIXEDSTAT) {
                            putdpsv(property, sv.value, sv.units, sv);
                        }
                    }
                }
            }
        }
    }
//
//LEVELS:
//put file(targfile) skip(2);
//if targfile=checkpt & lineno(checkpt) > 45 then
//                    put file(targfile) page;
//if nfdcl = 0 then put file(targfile) edit('THERE ARE NO ') (a);
//put file(targfile) edit('FUNCTIONALLY DETERMINED CONSTRAINT LEVELS:')
//    (a);
//if ioopt > 2 then put file(targfile) skip list
//   ('(REFER TO DOCUMENTATION SECTION  "FUNCTION".)');
//if nfdcl > 0 then
//   do;
//   put file(targfile) skip(2) edit
//      ('CONSTRAINT ON:           IS CURRENT VALUE OF:',
//   '----------------         -------------------')
//      (a, skip);
//   do i=1 to m;
//   if lmin(i) < 0 then call putlevel(lmin(i),minlbl);
//   if lmax(i) < 0 then call putlevel(lmax(i),maxlbl);
//   end;
//   end;
//IF icmd ^= 1 THEN GO TO CHEKER;
    function display_levels() {
        if (NFDCL == 0) {
            console.log('THERE ARE NO ')
        }
        console.log('FUNCTIONALLY DETERMINED CONSTRAINT LEVELS:');
        console.log('(REFER TO DOCUMENTATION SECTION  "FUNCTION".)');
        if (NFDCL == 0) {
            console.log('CONSTRAINT ON:           IS CURRENT VALUE OF:', '----------------         -------------------');
            for ( var property in design_parameters) {
                if (design_parameters.hasOwnProperty(property)) {
                    var dp = design_parameters[property];
                    if (dp.lmin < 0) {
                        putlevel(property, dp.lmin);
                    }
                    if (dp.lmax < 0) {
                        putlevel(property, dp.lmax);
                    }
                }
            }
            for ( var property in state_variables) {
                if (state_variables.hasOwnProperty(property)) {
                    var sv = state_variables[property];
                    if (sv.lmin < 0) {
                        putlevel(property, sv.lmin);
                    }
                    if (sv.lmax < 0) {
                        putlevel(property, sv.lmax);
                    }
                }
            }
        }
    }
//
//VIOL:
//if targfile=checkpt & lineno(checkpt) > 45 then
//                    put file(targfile) page;
//kd=0;
//do i=1 to m;
//if vmin(i) > 0.0 then kd=1;
//if vmax(i) > 0.0 then kd=1;
//end;
//
//if kd = 0 then
//   do;
//   put file(targfile) skip(2) list
//   ('NO CONSTRAINTS ARE VIOLATED');
//   if  targfile ^= checkpt
//     & ioopt ^> 3
//     & icmd  ^= 1
//     & icmd  ^= 11
//      then go to lsvfv;
//   end;
//
//PUT file(targfile) SKIP(2) EDIT
//   ('CONSTRAINT VIOLATIONS',
//    'VALUE', 'LEVEL', 'DIFFERENCE' ,'PERCENT')
//   (r(ttlfmt));
//
//do i=1 to n;
//call putviol(parm_name(i),p(i),
//         lmin(i),vmin(i),cmin(i),smin(i),minlbl);
//call putviol(parm_name(i),p(i),
//         lmax(i),vmax(i),cmax(i),smax(i),maxlbl);
//end;
//
//DO I=1 TO k;
//im=i+n;
//call putviol(st_var_name(i),x(i),
//         lmin(im),vmin(im),cmin(im),smin(im),minlbl);
//call putviol(st_var_name(i),x(i),
//         lmax(im),vmax(im),cmax(im),smax(im),maxlbl);
//END;
    function display_violations() {

        var has_violations = false;

        for ( var property in design_parameters) {
            if (design_parameters.hasOwnProperty(property)) {
                var dp = design_parameters[property];
                if (dp.vmin > 0.0)
                    has_violations = true
                if (sp.vmax > 0.0)
                    has_violations = true
            }
        }
        for ( var property in state_variables) {
            if (state_variables.hasOwnProperty(property)) {
                var sv = state_variables[property];
                if (sv.vmin > 0.0)
                    has_violations = true
                if (sv.vmax > 0.0)
                    has_violations = true
            }
        }

        if (!has_violations) {
            console.log('NO CONSTRAINTS ARE VIOLATED');
        } else {
            console.log('CONSTRAINT VIOLATIONS', 'VALUE', 'LEVEL', 'DIFFERENCE', 'PERCENT');
            for ( var property in design_parameters) {
                if (design_parameters.hasOwnProperty(property)) {
                    var dp = design_parameters[property];
                    if (dp.vmin > 0.0)
                        putviol(property, dp.value, dp.lmin, dp.vmin, dp.cmin, dp.smin);
                    if (dp.vmax > 0.0)
                        putviol(property, dp.value, dp.lmax, dp.vmax, dp.cmax, dp.smax);
                }
            }
            for ( var property in state_variables) {
                if (state_variables.hasOwnProperty(property)) {
                    var sv = state_variables[property];
                    if (sv.vmin > 0.0)
                        putviol(property, sv.value, sv.lmin, sv.vmin, sv.cmin, sv.smin);
                    if (sv.vmax > 0.0)
                        putviol(property, sv.value, sv.lmax, sv.vmax, sv.cmax, sv.smax);
                }
            }
        }
    }
//
//LSVFV:
//if targfile=checkpt & lineno(checkpt) > 45 then
//                    put file(targfile) page;
//IF NSTF > 0 THEN DO;
//  PUT file(targfile) SKIP(2) EDIT
//   ('DEPENDENT VARIABLE FIX VIOLATIONS',
//    'VALUE', 'LEVEL', 'DIFFERENCE' ,'WEIGHTED')
//   (r(ttlfmt));
//
//  DO I=1 TO K;
//  im=i+n;
//  if lmin(im) = 2 then
//     do;
//     VALUE=ABS(Vmin(IM));
//     PUT file(targfile) SKIP EDIT
//    (st_var_name(i), ' = ', x(i), cmin(im),
//     VALUE*Smin(IM), VALUE*100., ST_VAR_UNIT(I))
//     (r(violfmt));
//     end;
//  END;
//
//END;
//PUT file(targfile) SKIP;
    function display_violations_fixed() {
        if (NSTF > 0) {
            console.log('DEPENDENT VARIABLE FIX VIOLATIONS', 'VALUE', 'LEVEL', 'DIFFERENCE' ,'WEIGHTED')
        }
        for ( var property in state_variables) {
            if (state_variables.hasOwnProperty(property)) {
                var sv = state_variables[property];
                if (sv.lmin == FIXEDSTAT) {
                    var value = Math.abs(sv.vmin);
                    console.log(property, ' = ', sv.value, sv.cmin, value*sv.smin, value*100., sv.units);
                }
            }
        }
    }
//
//OBJT:
//if targfile=checkpt & lineno(checkpt) > 55 then
//                    put file(targfile) page;
//PUT file(targfile) SKIP EDIT
//   ('VALUE OF THE OBJECTIVE FUNCTION AT THIS POINT IS:', OBJ)
//   (A, col(54), F(18,6));
//put file(targfile) skip;
//IF icmd ^= 1 THEN GO TO CHEKER;
//
//if targfile = checkpt then go to cheker;
    function display_objective() {
        console.log('VALUE OF THE OBJECTIVE FUNCTION AT THIS POINT IS:', obj);
    }
//
//DPSV:
//PUT file(targfile) SKIP(2) EDIT
//   ('INDEPENDENT VARIABLES  (inputs)',
//    'BEFORE SEARCH', ' ')
//   (A, col(55), A, SKIP, A);
//
//DO I=1 TO N;
//if  targfile=checkpt
//  | ioopt >= dpclass(i)
//  | ioopt >= 4
//   then do;
//   IF lmin(I)=2 THEN DNAME=' <-- FIXED';
//        ELSE DNAME='';
//   PUT file(targfile) SKIP EDIT
//     (PARM_NAME(I), '=', P(I),  PARM_UNIT(I), DNAME, TP(I))
//     (r(parmfmt));
//   end;
//END;
//IF icmd ^= 1 then go to cheker;
//
//SV:
//if targfile=checkpt | ioopt >= 3 then
//   PUT file(targfile) SKIP(2) EDIT
//   ('DEPENDENT VARIABLES  (outputs)',
//    'BEFORE SEARCH', ' ')
//   (A, col(55), A, SKIP, A);
//do i= 1 to k;
//  if targfile=checkpt | ioopt >= svclass(i) | ioopt >= 4 then do;
//      if lmin(i+n)=2 then dname=' <-- FIXED';  else dname='';
//      put file(targfile) skip edit
//   (st_var_name(i), '=', x(i), st_var_unit(i), dname, tx(i))
//   (r(parmfmt));
//   end;
//end;
//IF icmd ^= 1 THEN GO TO CHEKER;
//
    // TODO: Implement List Internal
//INTERN:
//if targfile=checkpt & lineno(checkpt) > 45 then
//                    put file(targfile) page;
//if targfile=checkpt | ioopt >= 4 then
//   PUT file(targfile) SKIP(2) EDIT
//   ('INTERNAL VARIABLES') (a);
//
//put file(targfile) skip(2) edit
//   ('IOOPT  =', IOOPT,  'DEL    =', DEL,    'FIX_WT  =', FIX_WT,
//    'MAXIT  =', MAXIT,  'DELMIN =', DELMIN, 'CON_WT  =', CON_WT,
//    'SEARCH =', weapon, 'TOL    =', TOL,    'ZERO_WT =', ZERO_WT,
//    'EQNSET =', nmerit, 'OBJMIN =', OBJMIN, 'VIOL_WT =', VIOL_WT,
//                        'MFN_WT  =', mfn_wt)
//   (4(a, f(4,0), col(25), a, f(9,6), col(50), a, f(7,2), skip),
//                     col(50), a, f(7,2)       );
//
//if weapon = 2 then PUT file(targfile) SKIP EDIT
//   ('MODE   =', MODE,   'EST    =', EST, 'DELTA  =', delta )
//   (  a, f(4,0), col(25), a, f(9,6), col(50), a, f(9,6));
///* add eta 1-4, gamma_zero, omega_zero, print option  */
//
//if len1(2) = 0 then go to cheker;
//                      /*  undocumented debug output  */
//call pop;
//put skip(2) list('min, max for: l, c, v, s');
//put skip;
//do i=1 to m;
//put skip edit
//(lmin(i), lmax(i), cmin(i), cmax(i), vmin(i), vmax(i), smin(i), smax(i))
//(2(f(3,0)), 6(f(11,3)));
//end;
//
//GO TO CHEKER;
//
//parmfmt: format
//     (A(16), a, F(14,4), X(2), A( 8), a(10), 2(F(14,4)));
//
//confmt:  format
//     (A(16), A, F(14,4), X(3), A, SKIP);
//
//consfmt: format
//     (A(16), A, A, SKIP);
//
//conifmt: format
//     (A(16), A, F( 9,0), X(8), A, SKIP);
//
//ttlfmt: format
//     (a, skip, col(25), a, col(38), a, col(48), a, col(62), a);
//
//violfmt: format
//     (a(16), a(3), 2(f(13,4)), 2(f(12,4)), col(72), a);
//
//lttlfmt: format
//     (a, col(59), a, col(37), 3(x(7), a) );
//
//
//PUTDPSV: procedure(dpsvname,dpsvvalue,dpsvunit,vcsindex,obj);
//declare
//     dpsvname  character(16) varying,
//     dpsvvalue float,
//     dpsvunit  character(16) varying,
//     vcsindex  fixed,
//     obj       float
//    ;
//
//declare
//     sgrcode  fixed,
//     hilitefp entry(float, character(2) varying, fixed)
//    ;
//
//put file(targfile) skip edit
//  (dpsvname, '=', dpsvvalue,  dpsvunit)
//  (r(parmfmt));
//dname = '        ';
//if lmin(vcsindex) < FREESTAT
// | lmax(vcsindex) < FREESTAT
//    then dname = 'FUNCTION';
//if lmin(vcsindex) = FIXEDSTAT then dname = '   FIXED';
//put file(targfile) edit(dname) (a);
//if targfile = checkpt | ansisw ^= 1 then
//      do;
//      if lmin(vcsindex) ^= FREESTAT then put file(targfile) edit
//                  (cmin(vcsindex)) (r(minfmt));
//      if lmax(vcsindex) ^= FREESTAT then put file(targfile) edit
//                  (cmax(vcsindex)) (r(maxfmt));
//      end;
//   else
//      do;
//      if lmin(vcsindex) ^= FREESTAT then
//     do;
//     if obj > objmin & vmin(vcsindex) > 0.0 then sgrcode=HILITE;
//                        else sgrcode=NORM;
//     call hilitefp(cmin(vcsindex),'51',sgrcode);
//     end;
//      if lmax(vcsindex) ^= FREESTAT then
//     do;
//     if  obj > objmin & vmax(vcsindex) > 0.0 then sgrcode=HILITE;
//                         else sgrcode=NORM;
//     call hilitefp(cmax(vcsindex),'65',sgrcode);
//     end;
//      end;
//
//
//minfmt: format
//     (col(51), f(14,4));
//
//maxfmt: format
//     (col(65), f(14,4));
//
//end putdpsv;
//
    function putdpsv(dpsvname, dpsvvalue, dpsvunit, dp) {
        output = dpsvname + ' = ' + dpsvvalue + ' ' + dpsvunit;
        var dname = '';
        if (dp.lmin < FREESTAT || dp.lmax < FREESTAT)
            dname = ' FUNCTION';
        if (dp.lmin = FIXEDSTAT)
            dname = ' FIXED';
        output += dname;
        if (dp.lmin ^= FREESTAT)
            output += ' ' + dp.cmin;
        if (dp.lmax ^= FREESTAT)
            output += ' ' + dp.cmax;
        console.log(output);
    }
//
//PUTVIOL: procedure(dpsvname,dpsvvalue,lmm,vmm,cmm,smm,mmlabl);
//declare
//     dpsvname  character(16) varying,
//     dpsvvalue float,
//     lmm       fixed,
//     vmm       float,
//     cmm       float,
//     smm       float,
//     mmlabl    character(3)
//    ;
//
//if  targfile=checkpt
//  | vmm  > 0.0
//  | ioopt > 3
//  | icmd  = 1
//  | icmd  = 11
//   then if lmm = SETSTAT | lmm < FREESTAT then
//      do;
//      value=abs(vmm*smm);
//      if vmm > 0.0 then dname = 'VIOLATED';
//           else dname = '';
//      put file(targfile) skip edit
//     (dpsvname, mmlabl, dpsvvalue, cmm,
//      value, vmm*100.0, dname)
//     (r(violfmt));
//      end;
//
//end putviol;
//
    function putviol(dpsvname, dpsvvalue, lmm, vmm, cmm, smm) {
        if (lmm == SETSTAT || lmm < FREESTAT) {
            var value = Math.abs(vmm * smm);
            var dname = '';
            if (vmm > 0.0) {
                var dname = 'VIOLATED';
            }
            console.log(`${dpsvname} ${dpsvvalue} ${cmm} ${value} ${vmm*100.0} ${dname}`);
        }
    }
//
//PUTLEVEL: procedure(lmm,mmlabl);
//declare
//     lmm       fixed,
//     mmlabl    character(3)
//    ;
//
//      if i <= n then put file(targfile) skip edit
//             (parm_name(i),      mmlabl, ' ') (r(lfmt));
//        else put file(targfile) skip edit
//             (st_var_name(i-n),  mmlabl, ' ') (r(lfmt));
//      if lmm < -m
//        then put file(targfile) edit
//            (dc_name(-lmm-m)) (a);
//     else if lmm < -n
//       then put file(targfile) edit
//           (st_var_name(-lmm-n)) (a);
//       else put file(targfile) edit
//           (parm_name(-lmm))     (a);
//
//lfmt: format(a, col(20), a, x(2), a);
//end putlevel;
//
    function putlevel(name, lmm, mmlabl) {
        console.log(name);
    }
//
//INSTRT:
//END LIST;

}

module.exports = list;
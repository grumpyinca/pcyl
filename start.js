"use strict";
/**
 * START command - reads startup file, computes scaling den, invokes contnt for
 * problem specific constants.
 */

var contnt = require('./contnt');
var count = require('./count');
var despak = require('./despak');
var sclden = require('./sclden');
var update = require('./update');

function start(split_line) {

 // ====================================================================

//  STARTER:
//  if ansisw = 1 & xeqsw = 0 then put edit(scrclr) (a);
//  targfile=sysprint;
//  if len1(4) > 0 then
//     do;
//     xeqsw=0;
//     close file(xeqin);
//     xeqname = 'CON:';
//     op(2)='';
//     len1(2)=0;
//     if ansisw = 1 then put edit(scrclr) (a);
//     end;
//
//  call start(p,sfname);
//
//  if readok ^= 1 then go to instrt;
//  CALL COUNT;
//  call_flag=1;
//  CALL CONTNT(call_flag,p);
//  CALL DESPAK(P,OBJ);
//  if ansisw = 1 & xeqsw = 0 then put edit(scrclr) (a);
//  GO TO INSTRT;

 // ====================================================================

 // START: procedure(p,sfname);
 // 
 // %include 'maxdims.inc';
 // %include 'symbols.inc';
 // 
 // declare  p(nmax) float;
 // declare  sfname  character(16) varying;
 // 
 // %include 'state.inc';
 // %include 'names.inc';
 // %include 'control.inc';
 // %include 'search.inc';
 // %include 'constant.inc';
 // %include 'scratch.inc';
 // 
 // declare (
//       startup,
//       sysprint
//      )  file;
 // 
 // declare (
//       pop      entry,
//       readit   entry((ncargs)character(32) varying, (ncargs)fixed),
//       sclden   entry(float,float,float,fixed) returns(float),
//       update   entry((nmax)float)
//      );
 // 
 // declare (i, im) fixed;
 // 
 // 
 // on undefinedfile(startup) begin;
//     put skip(2) edit
//        (dname, ' IS NOT A VALID FILE NAME.',
//         'PLEASE INVOKE THE START COMMAND WITH A VALID FILE NAME.')
//        (a, a, skip);
//     go to instrt;
//     end;
 // 
 // ON ENDFILE(STARTUP) BEGIN;
//     CLOSE FILE(STARTUP);
//     PUT SKIP(2) LIST
//        ('*** END OF STARTUP FILE ENCOUNTERED PREMATURELY. ***');
//     go to instrt;
//     END;
 // 
 // 
 // put skip list('START:');
 // if op(2) = '' then do;
//     put skip edit
//       ('ENTER NAME OF STARTUP FILE.',
//        '  (DEFAULT = ', sfname, ') : ')
//       (a, skip, a, a, a);
//     call readit(op,len1);
//     end;
 // else call pop;
 // 
 // if op(1) ^= '' then do;
//        i = index(op(1),'.');
//        if i > 0 then sfname=substr(op(1),kone,i-1);
//         else sfname=op(1);
//        end;
 // 
 // if op(2) = '' then do;
//     if weapon = 0 then go to setdef;
//     put skip list
//      ('RETAIN CURRENT INTERNAL VARIABLES & OPTIONS ?  (y/N) : ');
//     call readit(op,len1);
//     end;
 // else call pop;
 // 
 // if len1(1) > 0 & op(1)=substr(yes,kone,len1(1)) then do;
//     if ioopt > 2 then PUT SKIP EDIT
//       ('CURRENT INTERNAL VARIABLES & OPTIONS RETAINED.',
//        'DESIGN PARAMETERS & CONSTRAINT LEVELS CHANGED TO THOSE IN ',
//        'THE STARTUP FILE.')
//       (A, SKIP, A, A);
//     GO TO FILERD;
//     END;
 // 
 // SETDEF:    /*  SYSTEM DEFAULTS ... SEARCH ROUTINE TUNING PARAMETERS   */
 // WEAPON= 1;
 // NMERIT=1;
 // NSRCH=0;
 // DEL=1.0;
 // DELMIN=0.0001;
 // OBJMIN=0.00005;
 // TOL=0.0001;
 // MAXIT=100;
 // 
 // ETA(1)=1.0e-04;
 // ETA(2)=1.0E-04;
 // ETA(3)=1.0e-06;
 // ETA(4)=1.0E-06;
 // MODE=2;
 // OPTION='PRINT_ON_RESTART';
 // GAMMA_ZERO=2.0;
 // OMEGA_ZERO=0.0;
 // DELTA=1.0E-05;
 // 
 // FIX_WT=1.5;           /* was 10.0, then 4.0  */
 // CON_WT=1.0;
 // VIOL_WT = 1.0;
 // ZERO_WT=10.0;         /* was 100.0 */
 // mfn_wt=0.01;
 // 
 // m_num=0.0;
 // m_den=100.0;
 // 
 // M_FLAG=0;
 // sought=0;
 // IOOPT=3;
 // smallnum=1.0e-07;
 // 
 // 
//            /* INITIALIZE EVERYTHING TO FREE - SET ARRAYS TO ZERO  */
 // NFIXED=0;
 // NSTF=0;
 // temp=1.0/(FIX_WT*ZERO_WT);
 // 
 // do i=1 to dmax;
 // d(i)=0.0;
 // end;
 // do i=1 to dimax;
 // di(i)=0;
 // end;
 // do i=1 to dsmax;
 // ds(i)='';
 // end;
 // 
 // do i=1 to kmax;
 // svclass(i)=1;
 // end;
 // 
 // do i=1 to mmax;
 // lmin(i)=FREESTAT;
 // lmax(i)=FREESTAT;
 // cmin(i)=0.0;
 // cmax(i)=0.0;
 // smin(i)=temp;
 // smax(i)=temp;
 // sdlim(i)=temp;
 // end;
 // 
 // do i=1 to lblmax;
 // lblprmt(i)='';
 // lblarry(i)='';
 // end;
 // 
 // if ioopt > 2 then PUT SKIP list
//     ('INTERNAL VARIABLES & OPTIONS HAVE BEEN SET.');
 // 
 // FILERD:
 // do i=1 to 8;
 // msgsw(i)=0;
 // end;
 // 
 // n=nmax;
 // k=kmax;
 // call update(p);           /*  depends on compiler initialization */
 // 
 // readok=0;
 // dname = sfname || '.DSN';
 // close file(startup);           /*  cope with previous error  */
 // OPEN FILE(STARTUP) stream input title(dname);
 // 
 // if ioopt > 2 then PUT SKIP EDIT
//     ('READING STARTUP FILE ', dname, ' ...')
//     (A);
 // 
 // get file(startup)list(dname, dname, dname);           /* version tag */
 // if dname ^= version then
//     do;
//     put skip(2) edit
//     (
//      'WARNING:',
//      'A VERSION ', version,
//      '  SpringSys  STARTUP FILE WAS EXPECTED.',
//      sfname, ' WAS CREATED BY VERSION ', dname, ' OF SpringSys.',
//      'REFER TO THE NEW_FEATURES SECTION OF THE DOCUMENTATION ',
//      'FOR INSTRUCTIONS.',
//      'CONTINUE ?  (y/N): '
//     )
//     (a, skip, 3a, skip, 4a, skip, 2a, skip);
//     call readit(op,len1);
//     if op(1) ^= 'Y' then go to instrt;
//     end;
 // get file(startup) list(input);
 // put skip(2) list('COMMENT FIELD SAVED WITH THIS DESIGN IS:');
 // put skip list(input);
 // 
 // GET FILE(STARTUP) LIST
//     (nmerit, N, lds, ldi, ld, K);
 // m=n+k;
 // 
 // get file(startup) list
//     (((ds_name(i),   ds(i)        )
//        do i=1 to lds));
 // get file(startup) list
//     (((di_name(i),   di(i), di_unit(i))
//        do i=1 to ldi));
 // get file(startup) list
//     (((dc_name(i),   d(i),  dc_unit(i))
//        do i=1 to ld));
 // 
 // do i=1 to n;
 // GET FILE(STARTUP) LIST (
//       PARM_NAME(I), P(I), PARM_UNIT(I),
//       lmin(i), lmax(i), cmin(i), cmax(i),
//       dpclass(i), sdlim(i));
 // end;
 // 
 // DO I=1 TO K;
//     im=i+n;
//     GET FILE(STARTUP) LIST
//        (ST_VAR_NAME(I), x(i), ST_VAR_UNIT(I),
//     lmin(im), lmax(im), cmin(im), cmax(im),
//     SVCLASS(I), sdlim(im));
//     if lmin(im) ^= FREESTAT then
//        smin(im)  = sclden(x(i),cmin(im),sdlim(im),lmin(im));
//     if lmax(im) ^= FREESTAT then
//        smax(im)  = sclden(x(i),cmax(im),sdlim(im),lmax(im));
//     if lmin(im)  = FIXEDSTAT then
//        do;
//        lmax(im)  = FIXEDSTAT;
//        smax=smin;
//        put skip edit
//       (st_var_name(i), ' IS FIXED AT ', cmin(im), '  ',
//        st_var_unit(i))
//       (a, a, f(14,6), a, a);
//        end;
 // end;
 // do i=1 to n;
//     if lmin(i) ^= FREESTAT then
//        smin(i)  = sclden(p(i),cmin(i),sdlim(i),lmin(i));
//     if lmax(i) ^= FREESTAT then
//        smax(i)  = sclden(p(i),cmax(i),sdlim(i),lmax(i));
 // END;
 // 
 //  /*                        not supported in DRI PLI
//      GET FILE(STARTUP) DATA;
 //  */
 // 
 // do i=1 to lblmax;
 // get file(startup) list(lblprmt(i), lblarry(i));
 // if lblprmt(i)='' then go to nomor;
 // end;
 // 
 // NOMOR:
 // CLOSE FILE(STARTUP);
 // readok=1;
 // 
 // INSTRT:
 // 
 // END START;
 // 
 // 

// ====================================================================
    
    update();

    // TODO: Read the startup file here

    for (let i = 0; i < design_parameters.length; i++) {
        var dp = design_parameters[i];
        if (dp.lmin != FREESTAT) {
            dp.smin = sclden(dp.value, dp.cmin, dp.sdlim, dp.lmin);
        } else {
            dp.smin = SCLDEN_DEFAULT;
        }
        if (dp.lmax != FREESTAT) {
            dp.smax = sclden(dp.value, dp.cmax, dp.sdlim, dp.lmax);
        } else {
            dp.smax = SCLDEN_DEFAULT;
        }
    }

    for (let i = 0; i < state_variables.length; i++) {
        var sv = state_variables[i];
        if (sv.lmin != FREESTAT) {
            sv.smin = sclden(sv.value, sv.cmin, sv.sdlim, sv.lmin);
        } else {
            sv.smin = SCLDEN_DEFAULT;
        }
        if (sv.lmax != FREESTAT) {
            sv.smax = sclden(sv.value, sv.cmax, sv.sdlim, sv.lmax);
        } else {
            sv.smax = SCLDEN_DEFAULT;
        }
        if (sv.lmin == FIXEDSTAT) {
            sv.lmax = FIXEDSTAT;
            sv.smax = sv.smin;
            console.log(`${sv.name} is fixed at ${sv.cmin} ${sv.units}`);
        }
    }

    // design_parameters[1].lmin = 2;
    // state_variables.force.lmin = 2;
    // state_variables.stress.lmin = -1;
    count();
    // console.log('start: NFIXED, NSTF, NFDCL = ', NFIXED, NSTF, NFDCL);

    contnt();

    var p = [];
    for (let i = 0; i < design_parameters.length; i++) {
        var dp = design_parameters[i];
        p[i] = dp.value;
    }
    var obj = despak(p);

    //console.log('design parameters = ', design_parameters);
    //for (let i = 0; i < design_parameters.length; i++) {
    //    var dp = design_parameters[i];
    //    console.log(dp.name + ' = ' + dp.value + ' ' + sp.units);
    //}

    //console.log('state variables = ', state_variables);
    //for (let i = 0; i < state_variables.length; i++) {
    //    var sv = state_variables[i];
    //    console.log(sv.name + ' = ' + sv.value + ' ' + sv.units);
    //}

}

module.exports = start;

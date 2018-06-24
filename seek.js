"use strict";
/**
 * SEEK command - explore available solutions within a feasible region
 */

//SEEK: procedure(p,obj);
function seek(split_line) {

    console.log('SEEK:');
    console.log('  The SEEK command is not yet implemented.');

    // 
    // %include 'maxdims.inc';
    // %include 'symbols.inc';
    // 
    // declare (p(nmax), obj)  float;
    // 
    // %include 'state.inc';
    // %include 'names.inc';
    // %include 'control.inc';
    // %include 'search.inc';
    // %include 'constant.inc';
    // %include 'scratch.inc';
    // 
    // declare
    //      despak   entry((nmax)float, float),
    //      pop      entry,
    //      readit   entry((ncargs)character(32) varying, (ncargs)fixed),
    //      srch     entry((nmax)float, float),
    //      update   entry((nmax)float)
    //     ;
    // 
    // declare (
    //      i        fixed,
    //      j        fixed,
    //      autosw       fixed,
    //      minimum      character( 7) static initial('MINIMUM'),
    //      maximum      character( 7) static initial('MAXIMUM')
    //     );
    // 
    // 
    // /**********************************************************************
    //  sought - indicates parameter/variable in question;
    //           + for DP,    - for SV
    //  sdir   - indicates direction of motion;
    //           + for max,   - for min
    // **********************************************************************/
    // 
    // 
    // if ansisw = 1 & xeqsw = 0 then put edit(scrclr) (a);
    // if readok = 0 then do;
    //     put skip list('START COMMAND REQUIRED');
    //     go to instrt;
    //     end;
    // 
    // sought=0;
    // sdir=0;
    // call despak(p,obj);                  /*  update OBJ & X  */
    // PUT SKIP EDIT('SEEK:    OBJ =', OBJ)
    //          (A, f(18,6));
    // if obj > objmin & nstf = 0 then put skip(2) edit
    //    ('NOTE:  THE SEEK PROCESS MAY PRODUCE BETTER RESULTS WITH A ',
    //     'FEASIBLE START POINT.')
    //    (a);
    // 
    // call pop;
    // if len1(2) = 0 then do;
    //    autosw=0;
    //    put skip(2) edit
    //        (
    //         'CHOOSE DIRECTION OF SEEK:',
    //         '<enter>  OR  0  FOR MINIMUM',
    //         '1  FOR MAXIMUM',
    //         ': '
    //        )
    //        (a, col(9), a, col(22), a, skip, a);
    //    call readit(op,len1);
    //    if op(1) = '1' then sdir = +1;
    //               else sdir = -1;
    //    put skip list
    //        ('ENTER NAME OF PARAMETER OR VARIABLE TO SEEK ON: ');
    //    call readit(op,len1);
    //    if len1(1) = 0 then go to foundsk;
    //    op(2)=op(1);
    //    len1(2)=len1(1);
    //    if ansisw = 1 & xeqsw = 0 then put edit(scrclr) (a);
    //    end;
    //     else do;
    //    autosw=1;
    //    if op(1)=substr(maximum,kone,len1(1)) then sdir=+1;
    //    if op(1)=substr(minimum,kone,len1(1)) then sdir=-1;
    //    end;
    // do i=1 to n;
    // if op(2)=substr(parm_name(i),kone,len1(2)) then do;
    //    temp=p(i);
    //    dname=parm_name(i);
    //    input=parm_unit(i);
    //    if lmin(i) = FIXEDSTAT then go to badfix;
    //    sought=i;
    //    go to foundsk;
    //    end;
    // end;
    // do i=1 to k;
    // if op(2)=substr(st_var_name(i),kone,len1(2)) then do;
    //    temp=x(i);
    //    dname=st_var_name(i);
    //    input=st_var_unit(i);
    //    if lmin(i+n) = FIXEDSTAT then go to badfix;
    //    sought=-i;
    //    go to foundsk;
    //    end;
    // end;
    // 
    // FOUNDSK:
    // if sought=0 | sdir=0 then do;
    //     put skip(2) edit
    //    ('CORRECT USAGE IS:',
    //     'SEEK  [MIN | MAX]  [variable name]')
    //    (a, skip);
    //     go to instrt;
    //     end;
    // 
    // if autosw = 1 then do;
    //    m_num=temp+0.1*float(sdir)*temp;
    //    call putest;
    //    if ioopt > 2 then put skip list
    //        ('ESTIMATING VALUE OF OPTIMUM ...');
    //    call estopt;
    //    if obj < objmin then
    //           do i=1 to nmax;
    //           p(i)=tp(i);
    //           end;
    //       else call findfeas;
    //    go to lastsrch;
    //    end;
    // 
    // if ioopt > 2 then put skip(2) edit
    //      ('IT IS NECESSARY TO ESTIMATE THE OPTIMUM VALUE OF ', dname,
    //       '.')
    //      (a);
    // call putest;
    // 
    // put skip(2) list
    //      ('CHOOSE A METHOD FOR ESTIMATING THE OPTIMUM:');
    // put skip edit
    //      (
    //       '<enter>  OR  0  TO HAVE A TRIAL SEARCH ESTIMATE THE OPTIMUM',
    //       '1  TO ENTER YOUR OWN VALUE'
    //      )
    //      (col(9), a, col(22), a);
    // call ftest;
    // if obj > objmin then put skip edit
    //      (
    //       '2  TO USE THE CURRENT ESTIMATE OF OPTIMUM'
    //      )
    //      (col(22), a);
    //          else put skip edit
    //              ('   (N/A)')
    //              (col(22), a);
    // temp1=m_num;
    // m_num=temp;
    // call ftest;
    // if obj > objmin then put skip edit
    //      (
    //       '3  TO USE THE CURRENT VALUE OF ', dname
    //      )
    //      (col(22), a, a);
    //          else put skip edit
    //              ('   (N/A)')
    //              (col(22), a);
    // m_num=temp+0.1*float(sdir)*temp;
    // call ftest;
    // if obj > objmin then put skip edit
    //      (
    //       '4  TO USE 10% BEYOND THE CURRENT VALUE'
    //      )
    //      (col(22), a, a);
    //          else put skip edit
    //              ('   (N/A)')
    //              (col(22), a);
    // put skip edit
    //      (
    //       '5  TO ABANDON SEEK  AND RETURN TO COMMAND LEVEL',
    //       ': '
    //      )
    //      (col(22), a, skip, a);
    // call readit(op,len1);
    // if op(1) = '1' then do;
    //       put skip list('ENTER ESTIMATE FOR OPTIMUM: ');
    //       call readit(op,len1);
    //       if len1(1) > 0 then m_num=op(1);
    //              else m_num=temp1;
    //       end;
    //     else if op(1) = '2' then m_num=temp1;
    //     else if op(1) = '3' then m_num=temp;
    //     else if op(1) = '4' then m_num=temp+0.1*float(sdir)*temp;
    //     else if op(1) = '5' then go to instrt;
    //     else do;
    //       call estopt;
    //       if obj < objmin then
    //           do i=1 to nmax;
    //           p(i)=tp(i);
    //           end;
    //       else do;
    //       put skip(2) edit
    //        (
    //         'SELECT A START POINT FOR THE NEXT SEARCH:',
    //         '<enter>  OR  0  TO SEARCH FOR THE NEAREST FEASIBLE POINT',
    //         '1  TO RESTORE THE PRE-ESTIMATE POINT',
    //         '2  TO USE THE EXISTING (POST ESTIMATE) POINT',
    //         ': '
    //        )
    //        (
    //         a,
    //         col(9), a,
    //         2(col(22), a), skip,
    //         a
    //        );
    //       call readit(op,len1);
    //       if op(1) = '1' then
    //           do i=1 to nmax;
    //           p(i)=tp(i);
    //           end;
    //          else if op(1) = '2' then ;
    //          else do;
    //           if ansisw = 1 & xeqsw = 0 then
    //                  put edit(scrclr) (a);
    //           call findfeas;
    //           end;
    //       end;
    //     end;
    // 
    // LASTSRCH:
    // put skip(2) edit
    //      ('SEEKING OPTIMUM ', dname, ' USING ESTIMATE OF:', m_num, input)
    //      (3a, col(43), F(14,4), x(3), a);
    // 
    // call ftest;
    // call update(p);
    // call SRCH(p,obj);
    // 
    // if ioopt > 0 then put skip edit
    //    ('RETURN ON: ', ncode, 'OBJ =', obj)
    //    (a, a, x(5), a, f(18,6));
    // if sought > 0 then temp1=p( sought);
    //           else temp1=x(-sought);
    // put skip(2) edit
    //      ('CURRENT VALUE OF ', dname, ' IS', temp1, input)
    //      (3a, F(14,4), x(3), a);
    // if obj < 0.0 then put skip(2) edit
    //          ('SEEK SHOULD BE RE-EXECUTED WITH A NEW ESTIMATE',
    //           'OF THE OPTIMUM.')
    //          (a);
    // if autosw=1 & shomode=0 then put list('^g');
    // go to instrt;
    // 
    // 
    // ESTOPT: procedure;
    // m_num=temp+0.1*float(sdir)*temp;
    // call ftest;
    // 
    // value=objmin;
    // objmin=-1.0;
    // call update(p);
    // call SRCH(p,obj);
    // objmin=value;
    // 
    // if sought > 0 then m_num=p( sought);
    //           else m_num=x(-sought);
    // call putest;
    // call ftest;
    // END ESTOPT;
    // 
    // FINDFEAS: procedure;
    // if ioopt > 2 then put skip list
    //    ('SEARCHING FOR A FEASIBLE START POINT ...');
    // j=sought;
    // sought=0;
    // call SRCH(p,obj);
    // sought=j;
    // call putest;
    // END FINDFEAS;
    // 
    // PUTEST: procedure;
    //   if sought > 0 then temp=p( sought);
    //         else temp=x(-sought);
    //   put skip(2) edit
    //    ('THE CURRENT VALUE OF ', dname, ' IS:',   temp,  input,
    //     'THE CURRENT ESTIMATED OPTIMUM IS:',      m_num, input)
    //    (3a, col(43), f(14,4), x(3), a, skip,
    //     a,  col(43), f(14,4), x(3), a);
    // END PUTEST;
    // 
    // FTEST: procedure;
    //   m_den=abs(m_num)/mfn_wt;
    //   if m_den < smallnum then m_den=1.0;
    //   call despak(p,obj);
    // END FTEST;
    // 
    // BADFIX:
    // put skip(2) edit
    //    (dname, ' IS FIXED.   USE OF SEEK IS NOT APPROPRIATE.')
    //    (a);
    // 
    // 
    // INSTRT:
    // sought=0;
    // sdir=0;
    // 
    // END SEEK;
}

module.exports = seek;

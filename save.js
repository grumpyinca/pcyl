"use strict";
/**
 * SAVE command - write current design into a file that can be read as a STARTUP
 * file. optionally, create a print listing
 */

function save(split_line) {

//    var fs = require('fs');
//    var json = JSON.stringify(design);
//    fs.writeFile('jsondesign.json', json, 'utf8');

// CPOINT:
//  if ansisw = 1 & xeqsw = 0 then put edit(scrclr) (a);
// RPOINT:
//  PUT SKIP LIST('SAVE ...');
//  CHECKNUM=CHECKNUM+1;
//
//  call pop;
//  itemp=1;
//  if len1(1) = 0 then do;
//     put skip edit
//       ('SELECT:',
//        '<enter> OR  0  TO  RETURN TO COMMAND LEVEL.',
//            '1  TO  WRITE ONE FILE  TO DISK IN',
//            '       STARTUP (.DSN) FORMAT.',
//            '2  TO  WRITE TWO FILES TO DISK;',
//            '       STARTUP (.DSN)  AND PRINTER (.PRN) FORMATS.',
//            '3  FOR IMMEDIATE OUTPUT TO PRINTER,',
//            '       NOTHING TO DISK.',
//        ': ')
//       (a, skip, col(9), a, 3(skip(2), col(21), a, col(21), a), skip, a);
//     call readit(op,len1);
//     if len1(1) ^= 1   | op(1) < '1'   | op(1) > '3' then go to instrt;
//     itemp=op(1);
//     if itemp = 3 then cpname='PRN:';
//        else do;
//        put skip edit
//       ('ENTER FILE NAME IN WHICH TO SAVE CURRENT STATUS',
//        '(DEFAULT WILL USE  ', cpname, '.DSN  &  ', cpname,
//        '.PRN).   : ')
//       (a, skip, 5(a));
//        call readit(op,len1);
//        end;
//     end;
//
//  if len1(1) > 0 & itemp ^= 3 then do;
//      i = index(op(1),'.');
//      if i > 0 then op(1)=substr(op(1),kone,i-1);
//      i = index(op(1),':')+1;
//      dname=substr(op(1),i);
//      if length(dname) > 8 then do;
//     put skip list
//          ('FILE NAMES ARE LIMITED TO 8 CHARACTERS.');
//     len1(2)=0;
//     go to rpoint;
//     end;
//      cpname=op(1);
//      end;
//
//                 /*  test for existing cpname in sfwriter  */
//  call pop;
//  if len1(1) = 0 then do;
//     put skip edit
//        ('ENTER COMMENT FIELD', ': ')
//        (A, SKIP, a);
//     CALL READIT(op,len1);
//     end;
//
//  input='';
//  do i=1 to ncargs while (len1(i) >0);
//  dname=translate(op(i),'"',quote);
//  input = input !! dname !! blank;
//  end;
//
//   /* add code to start sequence to review available checkpoint names */
//  if len1(1) > 0 then
//      do i=1 to lblmax;
//      if lblprmt(i) = 'COMMENT FIELD:' then lblarry(i)=input;
//      end;
//
//  if cpname ^= 'PRN:' then i=sfwriter(p,cpname);
//  if i = 0 | itemp = 1 then go to instrt;
//
//  on endfile(checkpt) begin;
//     put skip(2) edit
//        ('*** END OF PRINT FILE ENCOUNTERED PREMATURELY ***',
//     '       CHECK FOR DISK FULL CONDITION.')
//        (a, skip);
//     targfile=sysprint;
//     go to instrt;
//     end;
//
//     dname=cpname || '.PRN';
//     OPEN FILE(CHECKPT) output print title(dname);
//     put file(checkpt) edit
//     (sysprompt, 'VERSION ', version)
//     (col(25), a, col(40), a, a);
//     call dantime(datstr);
//     PUT FILE(CHECKPT) skip(2) EDIT
//     ('SESSION IDENTIFICATION: ', RUNID,
//      'CHECKPOINT', checknum, '  FILED IN: ', cpname, datstr,
//      INPUT,
//      'STARTUP FILE: ', sfname)
//     (A, A, SKIP, A, f(3,0), a, A, x(5), a, skip, a, skip, a, a);
//     put file(checkpt) skip(2);
//
//     targfile=checkpt;
//
//                 /*  write special info into checkpt file  */
//     m_flag=1;
//     call despak(p,obj);
//     m_flag=0;
//     put file(checkpt) skip;
//     m_flag=2;
//     call despak(p,obj);
//     m_flag=0;
//     put file(checkpt) skip;
//
//     op(1)='OUTPUT';
//     len1(1)=6;
//     op(2)='ALL';
//     len1(2)=3;
//     op(3)='';
//     len1(3)=0;
//     go to output;



// SFWRITER: procedure(p,cpname) returns(fixed);
// 
// %include 'maxdims.inc';
// 
// declare  p(nmax) float;
// declare  cpname  character(16) varying;
// 
// %include 'state.inc';
// %include 'names.inc';
// %include 'control.inc';
// %include 'search.inc';
// %include 'constant.inc';
// %include 'scratch.inc';
// 
// 
// declare
//      (cpdat, sysprint)  file,
//      (i, im) fixed,
//      kzero fixed static initial(0),
//      readit   entry (
//            (ncargs)character(32) varying,
//            (ncargs)fixed
//           )
//    ;
// 
// 
// dname=cpname || '.DSN';
//                    /*  check for existing file  */
// on undefinedfile(cpdat) begin;
//    go to nofile;
//    end;
// 
// open file(cpdat) stream input title(dname);
// close file(cpdat);
// if xeqsw = 0 then
//    do;
//    put skip(2) edit
//      (dname, ' ALREADY EXISTS ...',
//       'OVER WRITE ?   (y/N): ')
//      (a, a, skip);
//    call readit(op,len1);
//                 /*  strange problems with compiler ...
//                 doesn't seem to like substr & YES   */
//    if op(1)='Y' | op(1)='YE' | op(1)='YES' then ;
//       else go to err_exit;           /*  set abort flag  */
//    end;
// 
// NOFILE:
// on undefinedfile(cpdat) begin;
//    put skip(2) list
//       ('*** ERROR IN FILE NAME ***');
//    go to err_exit;               /*  set abort flag  */
//    end;
// 
// ON ENDFILE(cpdat) BEGIN;
//    CLOSE FILE(cpdat);
//    PUT SKIP(2) edit
//       ('*** END OF FILE ENCOUNTERED PREMATURELY. ***',
//        '    CHECK FOR DISK FULL CONDITION.')
//       (a);
//    go to err_exit;               /*  set abort flag  */
//    END;
// 
// open file(cpdat) output title(dname) linesize(100);
// 
// put file(cpdat) edit
//    (sysprompt, 'VERSION ', version)
//    (3(a, x(2)));
// put file(cpdat) skip edit
//    (quote, input, quote)
//    (a);
// 
// put file(cpdat) skip list
//    (nmerit, N, lds, ldi, ld, K);
// 
// do i=1 to lds;
//       put file(cpdat) skip edit
//      (ds_name(i),  ds(i) )
//      (a(16), x(1), a(16));
// end;
// do i=1 to ldi;
//       put file(cpdat) skip edit
//      (di_name(i),  di(i), di_unit(i))
//      (a(16), x(1), f(11,0), x(2), a(8));
// end;
// do i=1 to ld;
//    if abs(d(i)) < 1000.0 then
//       put file(cpdat) skip edit
//      (dc_name(i),   d(i), dc_unit(i))
//      (r(sffmt1));
//    else
//       put file(cpdat) skip edit
//      (dc_name(i),   d(i), dc_unit(i))
//      (r(sffmt2));
// end;
// 
// temp=1000.0;
// do i=1 to n;
// if abs(p(i))    < temp
//  & abs(cmin(i)) < temp
//  & abs(cmax(i)) < temp
//    then
//    put file(cpdat) skip edit
//       (parm_name(i), p(i), parm_unit(i),
//        lmin(i), lmax(i), cmin(i), cmax(i),
//        dpclass(i), sdlim(i))
//       (r(sffmt1));
//    else
//       put file(cpdat) skip edit
//      (parm_name(i), p(i), parm_unit(i),
//       lmin(i), lmax(i), cmin(i), cmax(i),
//       dpclass(i), sdlim(i))
//      (r(sffmt2));
// end;
// 
// do i=1 to k;
// im=i+n;
// if abs(x(i))     < temp
//  & abs(cmin(im)) < temp
//  & abs(cmax(im)) < temp
//    then
//       put file(cpdat) skip edit
//      (st_var_name(i), x(i), st_var_unit(i),
//       lmin(im), lmax(im), cmin(im), cmax(im),
//       svclass(i), sdlim(im))
//      (r(sffmt1));
//    else
//       put file(cpdat) skip edit
//      (st_var_name(i), x(i), st_var_unit(i),
//       lmin(im), lmax(im), cmin(im), cmax(im),
//       svclass(i), sdlim(im))
//      (r(sffmt2));
// end;
// 
// do i=1 to lblmax while(lblprmt(i) ^= '');
// put file(cpdat) skip edit
//    (quote, lblprmt(i), quote, blank, blank, quote, lblarry(i), quote)
//    (a);
// end;
// put file(cpdat) skip edit
//    (quote, quote, blank, blank, quote, quote)
//    (a);
// 
// put file(cpdat) skip edit(input) (skip, a);
// put file(cpdat) skip    edit
//    ('*** END ***',
//     sysprompt, 'VERSION ', version)
//    (a, skip, 3(a, x(2)));
// 
// close file(cpdat);
// if ioopt >= 3 then put skip list(dname, 'IS COMPLETE');
// return(kone);
// 
// 
// sffmt1: format
//     (a(16), x(1), f(12,6), x(1), a(8),
//      2(f(4,0)), 2(f(12,6)), f(3,0), f(10,4));
// sffmt2: format
//     (a(16), x(1), f(12,1), x(1), a(8),
//      2(f(4,0)), 2(f(12,1)), f(3,0), f(10,1));
// 
// ERR_EXIT:
// return(kzero);
// 
// END SFWRITER;
//

}

module.exports = save;

"use strict";
/**
 * SET command - user input to internal variables and program control see CHANGE
 * command for input of changes to problem variables
 */

//SET: procedure;
function set(split_line) {

    console.log('SET:');
    console.log('  The SET command is not yet implemented.');

    // 
    // %include 'maxdims.inc';
    // %include 'scratch.inc';
    // %include 'names.inc';
    // %include 'search.inc';
    // %include 'control.inc';
    // %include 'constant.inc';
    // 
    // %replace nsargs by 15;            /* number of sub commands  */
    // 
    // declare (i, j) fixed;
    // 
    // declare subdest(nsargs) label;
    // declare subcmd(nsargs) character(10) varying static initial
    //     (
    //      'IOOPT',  'MAXIT',  'SEARCH',   'EQNSET',
    //      'FIX_WT', 'CON_WT', 'ZERO_WT',  'VIOL_WT', 'MFN_WT',
    //      'OBJMIN', 'DEL',    'DELMIN',
    //      'LABEL',  'SCREEN', 'CLASS'
    //     );
    // 
    // declare
    //      readit entry
    //          ((ncargs)character(32) varying, (ncargs)fixed),
    //      pop    entry
    //    ;
    // 
    // declare
    //      color   character(5) static initial('COLOR'),
    //      blink   character(5) static initial('BLINK'),
    //      bold    character(4) static initial('BOLD')
    //    ;
    // 
    // /*
    //     Permit change of various internal variables by the user.
    //     Replaces function lost by absence of GET DATA in DRI PL/I
    // 
    //     Assume OP is POPped by main routine
    // */
    // 
    // 
    //       /*  DRI PLI does not accept conversion condition directly  */
    // ON error(1) BEGIN;
    //    PUT SKIP(2) EDIT(' ***  CONVERSION ERROR  ***') (A);
    //    len1(1) = 0;
    //    GO TO PROMPT;
    //    END;
    // 
    //                   /*  beware of clearing error messages  */
    // if len1(1) = 0 & ansisw = 1 & xeqsw = 0 then put edit(scrclr) (a);
    // 
    // prompt:
    //   if len1(1) = 0 then do;
    //      put skip(2) edit
    //    (
    //     'SET ...',
    //     'ENTER:',
    //     '  INTERNAL VARIABLE NAME      NEW VALUE',
    //     '              OR',
    //     '  <enter>  TO RETURN TO COMMAND LEVEL WITHOUT CHANGES',
    //     ' '
    //    )
    //     (a,skip);
    //      if ioopt > 2 then put skip edit
    //     (
    //      'INTERNAL VARIABLES AVAILABLE FOR CHANGE ARE: ',
    //      ((subcmd(i), ', ') do i=1 to nsargs-kone), subcmd(nsargs),
    //      ': '
    //     )
    //     (a, 2(col(4), 7(a, a)) );
    //      call readit(op,len1);
    //      end;
    // 
    //   if len1(1) = 0 then go to xit;
    // 
    //                           /*  a bit of a kludge  */
    //   do i=13 to 15;
    //   if op(1)=substr(subcmd(i),kone,len1(1)) then go to subdest(i);
    //   end;
    // 
    //   if len1(2) = 0 then do;
    //    put skip list('PLEASE SUPPLY BOTH NAME AND VALUE.');
    //    len1(1) = 0;                 /*  avoid infinite loop  */
    //    go to prompt;
    //    end;
    // 
    //   dname=op(1);
    //   do i=1 to nsargs;
    //   if dname=substr(subcmd(i),kone,len1(1)) then go to subdest(i);
    //   end;
    // 
    //   put skip list(dname || ' ? ?');
    //   len1(1) = 0;
    //   go to prompt;
    // 
    // subdest(1):
    //   i=op(2);
    //   ioopt=i;
    //   go to xit;
    // 
    // subdest(2):
    //   i=op(2);
    //   maxit=i;
    //   go to xit;
    // 
    // subdest(3):
    //   if len1(2) > 1 then do;
    //       op(1)='';
    //       go to prompt;
    //       end;
    //   i=op(2);
    //   weapon=i;
    //   if weapon < 1 then weapon = 1;
    //   go to xit;
    // 
    // subdest(4):
    //   if len1(2) > 1 then do;
    //       op(1)='';
    //       go to prompt;
    //       end;
    //   i=op(2);
    //   nmerit=i;
    //   if nmerit < 1 then nmerit = 1;
    //   go to xit;
    // 
    // subdest(5):
    //   value=op(2);
    //   fix_wt=value;
    //   go to xit;
    // 
    // subdest(6):
    //   value=op(2);
    //   con_wt=value;
    //   go to xit;
    // 
    // subdest(7):
    //   value=op(2);
    //   zero_wt=value;
    //   go to xit;
    // 
    // subdest(8):
    //   value=op(2);
    //   viol_wt=value;
    //   go to xit;
    // 
    // subdest(9):
    //   value=op(2);
    //   mfn_wt=value;
    //   go to xit;
    // 
    // subdest(10):
    //   value=op(2);
    //   objmin=value;
    //   go to xit;
    // 
    // subdest(11):
    //   value=op(2);
    //   del=value;
    //   go to xit;
    // 
    // subdest(12):
    //   value=op(2);
    //   delmin=value;
    //   go to xit;
    // 
    // subdest(13):             /* label  */
    //   if ansisw = 1 & xeqsw = 0 then put edit(scrclr) (a);
    //   put skip edit
    //    ('ENTER LABEL:',
    //     '       USE    <enter>  TO KEEP CURRENT VALUE',
    //     '              A BACKSLASH ("\")  TO DELETE CURRENT VALUE',
    //     '              A PERIOD (".")  TO TERMINATE.')
    //    (a, skip);
    //   put skip(2);
    // 
    //   do j=1 to lblmax;
    //     put edit(lblprmt(j), ' ', lblarry(j), ' ')
    //         (a, a, a, col(48), a);
    //     call readit(op,len1);
    //     if op(1) ^= '' then
    //    do;
    //    if op(1) = '.' then go to xit;
    //    if op(1) = '\' then
    //          do;
    //          lblarry(j) = '';
    //          dname=j;
    //          if lblprmt(j) = dname then lblprmt(j) = '';
    //          end;
    //       else
    //          do;
    //          lblarry(j)='';
    //          do i=1 to ncargs while(len1(i) > 0);
    //          dname=translate(op(i),'"',quote);
    //          lblarry(j) = lblarry(j) !! dname !! blank;
    //          end;
    //          if lblprmt(j) = '' then lblprmt(j) = j;
    //          end;
    //    end;
    //   end;
    //   go to xit;
    // 
    // subdest(14):                       /*  screen  */
    //   call pop;
    //   if len1(1) = 0 then
    //      do;
    //      put skip edit(
    //      'ENTER KEYWORD  "COLOR", "BLINK", "BOLD"',
    //      'OR ENTER 6 SCREEN RENDITION PARAMETERS.',
    //      'REFER TO DOCUMENTATION FOR ADDITIONAL INFORMATION.',
    //      '   MONOCHROME EXAMPLE:   0  0  0  0  1  5',
    //      '   COLOR EXAMPLE:        1 37 44  1 33 44',
    //      ': '
    //     ) (a, skip);
    //      call readit(op,len1);
    //      if len1(1) = 0 then go to xit;
    //      end;
    // 
    //   if op(1) = substr(COLOR,kone,len1(1)) then
    //    do;
    //    op(1)='1';
    //    op(2)='37';
    //    op(3)='44';
    //    op(4)='1';
    //    op(5)='33';
    //    op(6)='44';
    //    end;
    //   else if op(1) = substr(BOLD,kone,len1(1)) then
    //       do;
    //       op(1)='';
    //       op(2)='';
    //       op(3)='';
    //       op(4)='';
    //       op(5)='';
    //       op(6)='1';
    //       end;
    //   else if op(1) = substr(BLINK,kone,len1(1)) then
    //       do;
    //       op(1)='';
    //       op(2)='';
    //       op(3)='';
    //       op(4)='';
    //       op(5)='1';
    //       op(6)='5';
    //       end;
    //   else if len1(1) > 2 then go to subdest(14);
    // 
    //   norm_attr  = op(1);
    //   norm_fore  = op(2);
    //   norm_back  = op(3);
    //   hi_attr    = op(4);
    //   hi_fore    = op(5);
    //   hi_back    = op(6);
    // 
    //   dname = sgr_1 ||  '0'      || sgr_2 || norm_attr || sgr_2 ||
    //            norm_fore || sgr_2 || norm_back || sgr_3;
    //   if ansisw = 1 then put edit(dname, scrclr) (a);
    //   go to xit;
    // 
    // subdest(15):                       /*  class  */
    //   call pop;
    //   if len1(2) = 0 then
    //      do;
    //      put skip edit('ENTER NAME AND NEW CLASS: ') (a);
    //      call readit(op,len1);
    //      if len1(2) = 0 then go to xit;
    //      end;
    //   do i=1 to n;
    //      if op(1)=substr(parm_name(i),kone,len1(1)) then do;
    //     j=op(2);
    //     dpclass(i)=j;
    //     go to xit;
    //     end;
    //   end;
    //   do i=1 to k;
    //      if op(1)=substr(st_var_name(i),kone,len1(1)) then do;
    //     j=op(2);
    //     svclass(i)=j;
    //     go to xit;
    //     end;
    //   end;
    //   put skip list(op(2), ' ? ?');
    //   go to prompt;
    // 
    // xit: return;
    // 
    // END SET;
}

module.exports = set;

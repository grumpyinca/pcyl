"use strict";
/**
 * SET command - user input to internal variables and program control see CHANGE
 * command for input of changes to problem variables
 */


//@@@SET: procedure;
function set(split_line) {

//@@@    console.log('SET:');
//@@@    console.log('  The SET command is not yet fully implemented.');

    //@@@ 
    //@@@ %include 'maxdims.inc';
    //@@@ %include 'scratch.inc';
    //@@@ %include 'names.inc';
    //@@@ %include 'search.inc';
    //@@@ %include 'control.inc';
    //@@@ %include 'constant.inc';
    //@@@ 
    //@@@ %replace nsargs by 15;            /* number of sub commands  */
    //@@@ 
    //@@@ declare (i, j) fixed;
    //@@@ 
    //@@@ declare subdest(nsargs) label;
    //@@@ declare subcmd(nsargs) character(10) varying static initial
    //@@@     (
    //@@@      'IOOPT',  'MAXIT',  'SEARCH',   'EQNSET',
    //@@@      'FIX_WT', 'CON_WT', 'ZERO_WT',  'VIOL_WT', 'MFN_WT',
    //@@@      'OBJMIN', 'DEL',    'DELMIN',
    //@@@      'LABEL',  'SCREEN', 'CLASS'
    //@@@     );
    var commands = [
        { name: 'IOOPT', destination: function() {
            set_ioopt();
        }},
        { name: 'MAXIT', destination: function() {
            set_maxit();
        }},
        { name: 'SEARCH', destination: function() {
            set_search();
        }},
        { name: 'EQNSET', destination: function() {
            set_eqnset();
        }},
        { name: 'FIX_WT', destination: function() {
            set_fix_wt();
        }},
        { name: 'CON_WT', destination: function() {
            set_con_wt();
        }},
        { name: 'ZERO_WT', destination: function() {
            set_zero_wt();
        }},
        { name: 'VIOL_WT', destination: function() {
            set_viol_wt();
        }},
        { name: 'MFN_WT', destination: function() {
            set_mfn_wt();
        }},
        { name: 'OBJMIN', destination: function() {
            set_objmin();
        }},
        { name: 'DEL', destination: function() {
            set_del(false, false);
        }},
        { name: 'DELMIN', destination: function() {
            set_delmin();
        }},
        { name: 'LABEL', destination: function() {
            set_label();
        }},
//@@@        { name: 'SCREEN', destination: function() {
//@@@            set_screen();
//@@@        }},
        { name: 'CLASS', destination: function() {
            set_class();
        }}
    ];
    //@@@ 
    //@@@ declare
    //@@@      readit entry
    //@@@          ((ncargs)character(32) varying, (ncargs)fixed),
    //@@@      pop    entry
    //@@@    ;
    //@@@ 
    //@@@ declare
    //@@@      color   character(5) static initial('COLOR'),
    //@@@      blink   character(5) static initial('BLINK'),
    //@@@      bold    character(4) static initial('BOLD')
    //@@@    ;
    //@@@ 
     /*
         * Permit change of various internal variables by the user. Replaces
         * function lost by absence of GET DATA in DRI PL/I
         * 
         * Assume OP is POPped by main routine
         */
    //@@@ 
    //@@@ 
    //@@@       /*  DRI PLI does not accept conversion condition directly  */
    //@@@ ON error(1) BEGIN;
    //@@@    PUT SKIP(2) EDIT(' ***  CONVERSION ERROR  ***') (A);
    //@@@    len1(1) = 0;
    //@@@    GO TO PROMPT;
    //@@@    END;
    //@@@ 
    //@@@                   /*  beware of clearing error messages  */
    //@@@ if len1(1) = 0 & ansisw = 1 & xeqsw = 0 then put edit(scrclr) (a);
    //@@@ 
    console.log('SET ...');
    //@@@ prompt:
    //@@@   if len1(1) = 0 then do;
    //@@@      put skip(2) edit
    //@@@    (
    //@@@     'SET ...',
    //@@@     'ENTER:',
    //@@@     '  INTERNAL VARIABLE NAME      NEW VALUE',
    //@@@     '              OR',
    //@@@     '  <enter>  TO RETURN TO COMMAND LEVEL WITHOUT CHANGES',
    //@@@     ' '
    //@@@    )
    //@@@     (a,skip);
    //@@@      if ioopt > 2 then put skip edit
    //@@@     (
    //@@@      'INTERNAL VARIABLES AVAILABLE FOR CHANGE ARE: ',
    //@@@      ((subcmd(i), ', ') do i=1 to nsargs-kone), subcmd(nsargs),
    //@@@      ': '
    //@@@     )
    //@@@     (a, 2(col(4), 7(a, a)) );
    //@@@      call readit(op,len1);
    //@@@      end;
    //@@@ 
    //@@@   if len1(1) = 0 then go to xit;
    function display_help() {
        console.log('ENTER:');
        console.log('  INTERNAL VARIABLE NAME      NEW VALUE');
        console.log();
        if (IOOPT > 2) {
            console.log('INTERNAL VARIABLES AVAILABLE FOR CHANGE ARE: ');
            var i = 0;
            var string = '   ';
            for (let command of commands) {
                i++;
                if (string != '   ')
                    string += ",  ";
                string += command.name;
                if (i % 7 == 0) {
                    string += ",  ";
                    console.log(string);
                    i = 0;
                    string = '   ';
                }
            }
            if (string != '   ') {
                console.log(string);
            }
        }
    }
    //@@@ 
    var subcommand = split_line.shift();
    if (subcommand == undefined) {
        display_help();
        return;
    }

    var value = split_line.shift();
    if (value !== undefined) {
            var gotName = value;
        if (value.match(/^[-+]?[0-9]*\.?[0-9]*$/) !== null) {
            var gotNum = value;
            var gotFloat = parseFloat(value);
        }
    }
    else{
        console.log('PLEASE SUPPLY BOTH NAME AND VALUE.');
        console.log();
        display_help();
        return;
    }
        
    //@@@                           /*  a bit of a kludge  */
    //@@@   do i=13 to 15;
    //@@@   if op(1)=substr(subcmd(i),kone,len1(1)) then go to subdest(i);
    //@@@   end;
    //@@@ 
    //@@@   if len1(2) = 0 then do;
    //@@@    put skip list('PLEASE SUPPLY BOTH NAME AND VALUE.');
    //@@@    len1(1) = 0;                 /*  avoid infinite loop  */
    //@@@    go to prompt;
    //@@@    end;
    //@@@ 
    //@@@   dname=op(1);
    //@@@   do i=1 to nsargs;
    //@@@   if dname=substr(subcmd(i),kone,len1(1)) then go to subdest(i);
    //@@@   end;
    for (let command of commands) {
        if (command.name.startsWith(subcommand)) {
            command.destination();
            return;
        }
    }
    //@@@ 
    //@@@   put skip list(dname || ' ? ?');
    //@@@   len1(1) = 0;
    //@@@   go to prompt;
        console.log(subcommand + ' ? ?');
        display_help();
//@@@        Falls through to end
    //@@@ 
    //@@@ subdest(1):
    //@@@   i=op(2);
    //@@@   ioopt=i;
    function set_ioopt() {
        IOOPT = gotNum;
        console.log('IOOPT has been set to:', IOOPT);
    }
    //@@@   go to xit;
    //@@@ 
    //@@@ subdest(2):
    //@@@   i=op(2);
    //@@@   maxit=i;
    function set_maxit() {
        MAXIT = gotNum;
        console.log('MAXIT has been set to: ', MAXIT);
    }
    //@@@   go to xit;
    //@@@ 
    //@@@ subdest(3):
    //@@@   if len1(2) > 1 then do;
    //@@@       op(1)='';
    //@@@       go to prompt;
    //@@@       end;
    //@@@   i=op(2);
    //@@@   weapon=i;
    //@@@   if weapon < 1 then weapon = 1;
    function set_search() {
        if (gotNum < 1) gotNum = 1;
        WEAPON = gotNum;
        console.log('SEARCH - WEAPON has been set to:', WEAPON);
    }
    //@@@   go to xit;
    //@@@ 
    //@@@ subdest(4):
    //@@@   if len1(2) > 1 then do;
    //@@@       op(1)='';
    //@@@       go to prompt;
    //@@@       end;
    //@@@   i=op(2);
    //@@@   nmerit=i;
    //@@@   if nmerit < 1 then nmerit = 1;
    function set_eqnset() {
        if (gotNum < 1) gotNum = 1;
        NMERIT = gotNum;
        console.log('EQNSET - NMERIT has been set to:', NMERIT);
    }
    //@@@   go to xit;
    //@@@ 
    //@@@ subdest(5):
    //@@@   value=op(2);
    //@@@   fix_wt=value;
    function set_fix_wt() {
        FIX_WT = gotFloat;
        console.log('FIX_WT has been set to', FIX_WT);
    }
    //@@@   go to xit;
    //@@@ 
    //@@@ subdest(6):
    //@@@   value=op(2);
    //@@@   con_wt=value;
    function set_con_wt() {
        CON_WT = gotFloat;
        console.log('CON_WT has been set to', CON_WT);
    }
    //@@@   go to xit;
    //@@@ 
    //@@@ subdest(7):
    //@@@   value=op(2);
    //@@@   zero_wt=value;
    function set_zero_wt() {
        ZERO_WT = gotFloat;
        console.log('ZERO_WT has been set to', ZERO_WT);
    }
    //@@@   go to xit;
    //@@@ 
    //@@@ subdest(8):
    //@@@   value=op(2);
    //@@@   viol_wt=value;
    function set_viol_wt() {
        VIOL_WT = gotFloat;
        console.log('VIOL_WT has been set to', VIOL_WT);
    }
    //@@@   go to xit;
    //@@@ 
    //@@@ subdest(9):
    //@@@   value=op(2);
    //@@@   mfn_wt=value;
    function set_mfn_wt() {
        MFN_WT = gotFloat;
        console.log('MFN_WT has been set to', MFN_WT);
    }
    //@@@   go to xit;
    //@@@ 
    //@@@ subdest(10):
    //@@@   value=op(2);
    //@@@   objmin=value;
    function set_objmin() {
        OBJMIN = gotFloat;
        console.log('OBJMIN has been set to', OBJMIN);
    }
    //@@@   go to xit;
    //@@@ 
    //@@@ subdest(11):
    //@@@   value=op(2);
    //@@@   del=value;
    function set_del() {
        DEL = gotFloat;
        console.log('DEL has been set to', DEL);
    }
    //@@@   go to xit;
    //@@@ 
    //@@@ subdest(12):
    //@@@   value=op(2);
    //@@@   delmin=value;
    function set_delmin() {
        DELMIN = gotFloat;
        console.log('DELMIN has been set to', DELMIN);
    }
    //@@@   go to xit;
    //@@@ 
    //@@@ subdest(13):             
    /* label */
    //@@@   if ansisw = 1 & xeqsw = 0 then put edit(scrclr) (a);
    //@@@   put skip edit
    //@@@    ('ENTER LABEL:',
    //@@@     '       USE    <enter>  TO KEEP CURRENT VALUE',
    //@@@     '              A BACKSLASH ("\")  TO DELETE CURRENT VALUE',
    //@@@     '              A PERIOD (".")  TO TERMINATE.')
    //@@@    (a, skip);
    //@@@   put skip(2);
    //@@@ 
    //@@@   do j=1 to lblmax;
    //@@@     put edit(lblprmt(j), ' ', lblarry(j), ' ')
    //@@@         (a, a, a, col(48), a);
    //@@@     call readit(op,len1);
    //@@@     if op(1) ^= '' then
    //@@@    do;
    //@@@    if op(1) = '.' then go to xit;
    //@@@    if op(1) = '\' then
    //@@@          do;
    //@@@          lblarry(j) = '';
    //@@@          dname=j;
    //@@@          if lblprmt(j) = dname then lblprmt(j) = '';
    //@@@          end;
    //@@@       else
    //@@@          do;
    //@@@          lblarry(j)='';
    //@@@          do i=1 to ncargs while(len1(i) > 0);
    //@@@          dname=translate(op(i),'"',quote);
    //@@@          lblarry(j) = lblarry(j) !! dname !! blank;
    //@@@          end;
    //@@@          if lblprmt(j) = '' then lblprmt(j) = j;
    //@@@          end;
    //@@@    end;
    //@@@   end;
    function set_label() {
        console.log('Label ... gotName =', gotName);
        var labelVal = split_line.shift();
        if (labelVal !== undefined) {
            console.log('labelVal =', labelVal);
        }
        else{
            console.log('PLEASE SUPPLY BOTH LABEL NAME AND VALUE.');
            return;
        }
        console.log('LABEL is not implemented yet');
    }
    //@@@   go to xit;
    //@@@ 
    //@@@ subdest(14):                       
    /* screen */
    //@@@   call pop;
    //@@@   if len1(1) = 0 then
    //@@@      do;
    //@@@      put skip edit(
    //@@@      'ENTER KEYWORD  "COLOR", "BLINK", "BOLD"',
    //@@@      'OR ENTER 6 SCREEN RENDITION PARAMETERS.',
    //@@@      'REFER TO DOCUMENTATION FOR ADDITIONAL INFORMATION.',
    //@@@      '   MONOCHROME EXAMPLE:   0  0  0  0  1  5',
    //@@@      '   COLOR EXAMPLE:        1 37 44  1 33 44',
    //@@@      ': '
    //@@@     ) (a, skip);
    //@@@      call readit(op,len1);
    //@@@      if len1(1) = 0 then go to xit;
    //@@@      end;
    //@@@ 
    //@@@   if op(1) = substr(COLOR,kone,len1(1)) then
    //@@@    do;
    //@@@    op(1)='1';
    //@@@    op(2)='37';
    //@@@    op(3)='44';
    //@@@    op(4)='1';
    //@@@    op(5)='33';
    //@@@    op(6)='44';
    //@@@    end;
    //@@@   else if op(1) = substr(BOLD,kone,len1(1)) then
    //@@@       do;
    //@@@       op(1)='';
    //@@@       op(2)='';
    //@@@       op(3)='';
    //@@@       op(4)='';
    //@@@       op(5)='';
    //@@@       op(6)='1';
    //@@@       end;
    //@@@   else if op(1) = substr(BLINK,kone,len1(1)) then
    //@@@       do;
    //@@@       op(1)='';
    //@@@       op(2)='';
    //@@@       op(3)='';
    //@@@       op(4)='';
    //@@@       op(5)='1';
    //@@@       op(6)='5';
    //@@@       end;
    //@@@   else if len1(1) > 2 then go to subdest(14);
    //@@@ 
    //@@@   norm_attr  = op(1);
    //@@@   norm_fore  = op(2);
    //@@@   norm_back  = op(3);
    //@@@   hi_attr    = op(4);
    //@@@   hi_fore    = op(5);
    //@@@   hi_back    = op(6);
    //@@@ 
    //@@@   dname = sgr_1 ||  '0'      || sgr_2 || norm_attr || sgr_2 ||
    //@@@            norm_fore || sgr_2 || norm_back || sgr_3;
    //@@@   if ansisw = 1 then put edit(dname, scrclr) (a);

    function set_screen() {
        console.log('SCREEN  will not be implemented.');
    }
    //@@@   go to xit;
    //@@@ 
    //@@@ subdest(15):                       
    /* class */
    //@@@   call pop;
    //@@@   if len1(2) = 0 then
    //@@@      do;
    //@@@      put skip edit('ENTER NAME AND NEW CLASS: ') (a);
    //@@@      call readit(op,len1);
    //@@@      if len1(2) = 0 then go to xit;
    //@@@      end;
    //@@@   do i=1 to n;
    //@@@      if op(1)=substr(parm_name(i),kone,len1(1)) then do;
    //@@@     j=op(2);
    //@@@     dpclass(i)=j;
    //@@@     go to xit;
    //@@@     end;
    //@@@   end;
    //@@@   do i=1 to k;
    //@@@      if op(1)=substr(st_var_name(i),kone,len1(1)) then do;
    //@@@     j=op(2);
    //@@@     svclass(i)=j;
    //@@@     go to xit;
    //@@@     end;
    //@@@   end;
    function set_class() {
        console.log('Class ... gotName =', gotName);
        var classVal = split_line.shift();
        if (classVal !== undefined) {
            if (classVal.match(/^[-+]?[0-9]*\.?[0-9]*$/) !== null) {
                console.log('classVal =', classVal);
            }
            else {
                console.log('PLEASE SUPPLY NUMERIC VALUE FOR IO CLASS OF:', gotName);
                return;
            }
        }
        else{
            console.log('PLEASE SUPPLY BOTH IO CLASS NAME AND VALUE.');
            return;
        }
        console.log('CLASS is not implemented yet');
    }
    //@@@   put skip list(op(2), ' ? ?');
    //@@@   go to prompt;
    //@@@ 
    //@@@ xit: return;
    //@@@ 
    //@@@ END SET;
}

module.exports = set;

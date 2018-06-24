"use strict";
/**
 * EXECUTE command - invoke a command script
 */

function execute(split_line) {

    console.log('EXECUTE:');
    console.log('  The EXECUTE command is not yet implemented.');

    // XEQ:
    // put skip list('EXECUTE:');
    // if len1(2) = 0 then do;
    //  put skip list('ENTER NAME OF A  .XEQ  FILE TO EXECUTE : ');
    //  call readit(op,len1);
    //  if len1(1)=0 then go to instrt;
    //  end;
    //  else call pop;
    // 
    // if op(1) = 'CON:' then go to closxeq;
    // if len1(2) > 0 then shomode=1;
    //      else shomode=0;
    // 
    // i = index(op(1),'.');
    // if i > 0 then xeqname=substr(op(1),kone,i-1);
    //    else xeqname=op(1);
    // close file(xeqin);
    // dname='';
    // 
    // FIXUP:
    // dname=dname || xeqname || '.XEQ';
    // open file(xeqin) stream input title(dname);
    // xeqsw=1;
    // if ansisw = 1 then put edit(scrclr) (a);
    // go to instrt;
    // 
    // CLOSXEQ:
    // close file(xeqin);
    // xeqname = 'CON:';
    // xeqsw=0;
    // go to instrt;
}

module.exports = execute;

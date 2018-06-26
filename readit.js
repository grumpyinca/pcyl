"use strict";
var fs = require('fs');

//READIT: PROCEDURE(op,len1);
function readit() {
    //
    //%include 'maxdims.inc';
    //%include 'control.inc';
    //%include 'constant.inc';
    //
    let buffer = Buffer.alloc(256);
    let count = 0;
    let input = '';
    let fd;
    //declare  (
    //   op(ncargs)   character(32) varying,
    //   len1(ncargs) fixed
    //     );
    //
    ///*********************************************************************/
    ///*     Command input and parser for CADSYS           */
    ///*********************************************************************/
    ///*  THIS PROCEDURE READS AN INPUT LINE FROM THE CONSOLE AND RETURNS  */
    ///*  THE INDIVIDUAL WORDS AS OP(1...ncargs)  WITH CORRESPONDING   */
    ///*  LENGTHS LEN1(1...ncargs)                         */
    ///*********************************************************************/
    //
    //declare (
    //   xeqin file,
    //   dname character(32) varying,
    //   input character(80) varying,
    //   UC CHARacter(26) static INITIAL('ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
    //   LC CHARacter(26) static INITIAL('abcdefghijklmnopqrstuvwxyz'),
    //   ktwo fixed static initial(2)
    //    );
    //
    //DECLARE (i, IR, JR, JARG, KD) fixed;
    //
    ///*********************************************************************/
    //
    //     do i=1 to ncargs;
    //     OP(i)='';              /* RETURN NULL STRING IF NOTHING IS READ */
    //     LEN1(i)=0;
    //     end;
    //
    //NXTLIN:
    do {
        //     if xeqsw = 1 then get file(xeqin) edit(input) (a);
        //     else get edit(input) (a);     /* input from console */
        if (process.platform === 'win32') {
            fd = process.stdin.fd;
        } else {
            fd = fs.openSync('/dev/stdin', 'rs');
        }
        try {
            count = fs.readSync(fd, buffer, 0, buffer.length);
        } catch (err) {
            console.log(err.toString());
        } finally {
            fs.closeSync(fd);
        }
        input += buffer.toString('utf-8', 0, count - 1);
        //     dname=substr(input,kone,kone);             /* or macro file */
        //     if dname = '|' then do;
        //   put skip list(substr(input,ktwo));       /* echo comments */
        //   go to nxtlin;
        //   end;
        if (input.substring(0, 1) == '|') {
            console.log(input.substring(1));
        }
    } while (input.substring(0, 1) == '|');
    //     INPUT=TRANSLATE(INPUT,UC,LC);        /* upcase commands */
    input = input.trim().toUpperCase();
    //     if xeqsw = 1 & dname ^= '\' then          /* echo commands from */
    //                       /* macro file         */
    //    do;
    //    if ansisw = 1 then
    //       do;
    //       op(6) = sgr_1 || hi_attr   || sgr_2     ||
    //        hi_fore  || sgr_2     || hi_back   || sgr_3;
    //       op(7) = cuf_1 || '79'      || cuf_2;
    //       op(8) = sgr_1 || '0'       || sgr_2 || norm_attr || sgr_2 ||
    //                norm_fore || sgr_2 || norm_back || sgr_3;
    //       put edit
    //          (op(6), input, op(8), cuu, op(7))
    //          (2(a), skip, 3(a));
    //       op(6)='';
    //       op(7)='';
    //       op(8)='';
    //       end;
    //    else put edit(input) (a);
    console.log(input);
    //    end;
    //
    //     INPUT=INPUT !! BLANK;       /* ADD BLANK FOR VERIFY & INDEX */
    //     DO KD=1 TO ncargs;       /* defines max cmd args per input line */
    //    IR=VERIFY(INPUT,BLANK);    /* IR IS THE FIRST NON-BLANK CHAR */
    //    IF IR = 0 THEN RETURN;     /* RETURN ON REST OF STRING BLANK */
    //    JARG=IR+1;        /* INCLUDE BLANK, AVOID CONVERSION */
    //    JR =INDEX(SUBSTR(INPUT,JARG),BLANK);     /* finds next blank */
    //    len1(kd)=jr;             /* NUMBER OF CHARACTERS IN WORD */
    //    dname=SUBSTR(INPUT,IR,JR);       /* PULL SINGLE WORD OUT */
    //    op(kd)=dname;
    //    JARG=IR+JR+1;          /* DON'T BOTHER TO SCAN THE BLANK */
    //    INPUT=SUBSTR(INPUT,JARG);  /* REPEAT FOR FOLLOWING MODIFIERS */
    //      END;
    var split_input = input.split(/ +/);
    return split_input;
    //END READIT;
    //
}

module.exports = readit;
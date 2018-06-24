"use strict";
/**
 * HELP command - display pages from on-line documentation
 */

//HELP: procedure(target,kd);
function help(split_line) {

    console.log('HELP:');
    console.log('  The HELP command is not yet implemented.');

    // 
    // declare (
    //    target character(32) varying,
    //    kd     fixed
    //     );
    // 
    // /*
    //    Implements direct access HELP file.  Requires matched pair index
    //    file and direct access formatted help file.
    // 
    //    Note that other formulations are possible.  Notably one that uses a
    //    byte count of section titles, then superimposes that on top of
    //    PL/I's record structure.  This method was chosen because it seems to
    //    be able to simplify (and speed up) the read process at a modest
    //    increase in complexity of the file generation process.
    // */
    // 
    // %replace rl by 254;
    // %replace true by '1'b;
    // 
    // %include 'maxdims.inc';
    // %include 'control.inc';
    // %include 'constant.inc';
    // %include 'scratch.inc';
    // 
    // 
    // declare
    //     (helpfile, hindx)  file,
    //     recbuf character(rl),
    //     zm character( 2) static initial('ZM'),
    //     zx character( 2) static initial('ZX'),
    //     h_file character(12) varying,
    //     h_prim character( 4) static initial('.D_A'),
    //     h_aux  character( 4) static initial('.AUX'),
    // 
    //     i     fixed,
    //     sptr  fixed,
    //     fptr  fixed,
    //     ktwo  fixed static initial(2)
    //       ;
    // 
    // declare 1 rec,
    //       2 secttl character(16),
    //       2 recno  fixed;
    // 
    // 
    // on undefinedfile(hindx) begin;
    //    put skip(2)list
    //    ('HELP INDEX FILE NOT AVAILABLE.');
    //    go to outspot;
    //    end;
    // 
    // on undefinedfile(helpfile) begin;
    //    put skip(2) edit
    //    (
    //     'HELP:  ', input,
    //     ' IS NOT AVAILABLE IN CURRENT DIRECTORY.',
    //     'ENTER DRIVE LETTER CONTAINING HELP FILE, OR',
    //     '<enter> TO RETURN TO COMMAND LEVEL.        : '
    //    )
    //    (3(a), skip(2), a, skip, a);
    //    get edit(dname) (a);        /*  avoid reading from macro  */
    //    dname=substr(dname,kone,kone) || ':';
    //    if ansisw = 1 then put edit(scrclr) (a);
    //    if dname >= 'a' & dname <= 'z' then go to fixup;
    //    if dname >= 'A' & dname <= 'Z' then go to fixup;
    //    go to outspot;
    //    end;
    // 
    // on endfile(helpfile) begin;
    //    put skip(2) list
    //    ('END OF HELP FILE ENCOUNTERED PREMATURELY.');
    //    go to outspot;
    //    end;
    // 
    // 
    // 
    // open file(hindx)    input  record sequential
    //             title('helpfile.idx');
    // 
    // if ansisw = 1 & xeqsw = 0 then put edit(scrclr) (a);
    //               else put skip(2);
    // if kd=0 then do;
    //   put list('AVAILABLE TOPICS INCLUDE:');
    //   put skip(2);
    // 
    //   do while(true);
    //   do i=1 to 4;
    //   read file(hindx) into(rec);
    //   do while(substr(secttl,kone,kone)='@');
    //   read file(hindx) into(rec);
    //   end;
    //   if secttl = zx then do;
    //      put skip;
    //      go to cycle;
    //      end;
    //   put edit(secttl) (a(18));
    //   end;
    //   put skip;
    //   end;
    // 
    // CYCLE:
    //   put skip(2) edit
    //      ('FOR HELP ENTER:  HELP  <topic name>',
    //       'WHERE  <topic name>  IS A TOPIC LISTED ABOVE.',
    //       'example:   HELP COMMANDS')
    //      (a, skip, col(32), a, col(32), a);
    //   go to closer;
    //   end;
    // 
    //   do while(true);
    //   read file(hindx) into(rec);
    //   if secttl = zx then do;
    //       put skip list
    //      ('NO HELP IS AVAILABLE FOR ', target);
    //       go to closer;
    //       end;
    //   if substr(secttl,kone,kd) = target then go to got1;
    //   end;
    // 
    // GOT1:
    //   dname='';
    //   h_file='HELPFILE';
    //   if recno < 0 then
    //        do;
    //        h_file=h_file || h_aux;
    //        recno=-recno-1;
    //        end;
    //       else h_file=h_file || h_prim;
    // 
    // FIXUP:
    // input = dname || h_file;
    // open file(helpfile) input  direct environment(f(rl),b(ktwo*ktwo*rl))
    //             title (input);
    // 
    // NEWREC:
    //   read file(helpfile) into(recbuf) key(recno);
    //   recno=recno+kone;
    //   sptr=kone;
    // 
    // FINDZM:                  /*   preferred implementation is */
    //                     /*   fptr=index(recbuf,zm,sptr); */
    //   fptr=index(substr(recbuf,sptr),zm);
    //   if fptr > 0 then fptr=fptr+sptr-kone;
    // 
    //   if fptr > 0 then do;
    //      put edit(substr(recbuf,sptr,fptr-sptr)) (a);
    //      input = substr(secttl,kone,index(secttl,' '));
    //      if input = '' then input=secttl;
    //      put skip edit
    //      ('MORE HELP ON ', input, '?  (Y/n): ')
    //      (a);
    //      get edit(input) (a);
    //      if substr(input,kone,kone) = 'n' !
    //     substr(input,kone,kone) = 'N'   then go to closer;
    //      sptr=fptr+ktwo;
    //      if ansisw = 1 then put edit(scrclr) (a);
    //      go to findzm;
    //      end;
    // 
    //                             /*  FINDZX   */
    //   fptr=index(recbuf,zx);
    //   if fptr > 0 then do;
    //      put edit(substr(recbuf,sptr,fptr-sptr-kone)) (a);
    //      go to closer;
    //      end;
    // 
    //                           /*  DUMP REMAINDER */
    //   put edit(substr(recbuf,sptr)) (a);
    //   go to newrec;
    // 
    // 
    // CLOSER:
    //   ;
    // OUTSPOT:
    //   close file(helpfile);
    //   close file(hindx);
    // 
    // END HELP;
}

module.exports = help;

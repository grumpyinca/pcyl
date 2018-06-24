"use strict";
/**
 * Compute problem specific design.constants. Each different design problem gets a
 * different version of this code.
 */

//CONTNT: procedure(call_flag,p);
function contnt() {

    // For the Piston-Cylinder problem, this function is mostly a placeholder.
    // For other problems, this function might be complex and possibly interactive.

    // TODO: implement call_flag before implementing SELECT CATALOG 

    // %include 'maxdims.inc';
    // declare
    //       call_flag fixed,
    //       p(nmax)   float
    //     ;
    // 
    // /*
    //     This application dependent procedure is used to compute those
    //     design.constants that are needed by the application's EQNSET.
    // 
    //     This procedure is called during execution of the START command after
    //     the start file is read.  These calls are distinguished by a value of
    //     CALL_FLAG = 1.  D values read from the start file may be used or
    //     over-written here.
    // 
    //     It is possible for design.constants to be a function of other design.constants
    //     which are subject to change by the user interactively.  Therefor
    //     this routine is called after the change of any constant.  These
    //     calls are distinguished by a value of CALL_FLAG = 0.
    // 
    //     Calls to this routine from the catalog selection code are
    //     distinguished by a value of CALL_FLAG = 2.
    // */
    // 
    // declare
    //       j fixed,
    //       (ptrd, ptrds, ptrdi)  external pointer,
    //       pause    entry(fixed,fixed,fixed,fixed) returns(fixed)
    //     ;
    // 
    // %include 'control.inc';
    // %include 'constant.inc';
    // %include 'd_const.inc';
    // 
    //                     /*  call from START  command  */
    // if call_flag = 1 then
    //        do;
    //        pi=3.1415927;
    design.constants[0].value = 4.0 * Math.atan(1.0);
    //        j=pause(ansisw,shomode,isec,2);
    //        end;
    // 
    //                     /*  call from CHANGE command  */
    //     else if call_flag = 0 then
    //        do;
    //         /*  do nothing  */
    //        end;
    // 
    //                     /*  call from catalog select  */
    //     else if call_flag = 2 then
    //        do;
    //         /*  do nothing  */
    //        end;
    // 
    //                     /*  call from CHANGE command  */
    //                     /*  announce reason for override  */
    //     else if call_flag = 3 then
    //        do;
    //        if ansisw = 1 & xeqsw = 0 then put edit(scrclr) (a);
    //        if msgsw(3) = 0 & ioopt > 2 then
    //       do;
    //       put skip edit
    //          (
    //           'NOTE: This is a non-repeating test message.'
    //          )
    //          (a, skip);
    //       msgsw(3)=1;
    //       end;
    //        end;
    // 
    // end contnt;
}

module.exports = contnt;

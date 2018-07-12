"use strict";
/**
 * Compute problem specific design.constants. Each different design problem gets
 * a different version of this code.
 */
function contnt() {
    // For the Piston-Cylinder problem, this function is mostly a placeholder.
    // For other problems, this function might be complex and possibly interactive.
    // TODO: implement call_flag before implementing SELECT CATALOG 
    /*
     * This application dependent procedure is used to compute those
     * design.constants that are needed by the application's EQNSET.
     * 
     * This procedure is called during execution of the START command after the
     * start file is read. These calls are distinguished by a value of CALL_FLAG =
     * 1. D values read from the start file may be used or over-written here.
     * 
     * It is possible for design.constants to be a function of other
     * design.constants which are subject to change by the user interactively.
     * Therefor this routine is called after the change of any constant. These
     * calls are distinguished by a value of CALL_FLAG = 0.
     * 
     * Calls to this routine from the catalog selection code are distinguished
     * by a value of CALL_FLAG = 2.
     */
    /* call from START command */
    design.constants[0].value = 4.0 * Math.atan(1.0);
    /* call from CHANGE command */
    /* call from catalog select */
    /* call from CHANGE command */
    /* announce reason for override */
}
module.exports = contnt;

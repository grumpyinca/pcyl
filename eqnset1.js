"use strict";
//@@@ EQNSET1:PROCEDURE(P);
function eqnset1() {
    //@@@ /*  Piston - Cylinder problem  */
    //@@@ %include 'maxdims.inc';
    //@@@ declare p(nmax)  float;
    //@@@ 
    //@@@ %include 'control.inc';
    //@@@ declare
    //@@@ (ptrdi, ptrd, ptrx) external pointer,
    //@@@ targfile file variable external
    //@@@ ;
    //@@@ 
    /** ***************************************************************** */
    /*
     * EQNSET contains an equation set providing a math model of the design
     * problem. The values of the problem's independent variables (P) are input
     * to it via the argument list.
     */
    /** ***************************************************************** */
    /*
     * P=vector of design parameters (length=N) X=vector of state variables (
     * =K) M=K+N, L=vector of constraint control info ( =M) LMIN, LMAX V=vector
     * of constraint violations ( =M) VMIN, VMAX C=vector of constraint levels (
     * =M) CMIN, CMAX S=vector of constraint scaling denominators (=M) SMIN,
     * SMAX D=vector of externally computed quantities
     * 
     * m_flag = 0 if call is from search, no console I/O permitted. m_flag > 0
     * if "special" call requesting direct output.
     */
    //@@@ /********************************************************************/
    //@@@ 
    var pi = 0;
    //@@@ declare
    //@@@ ptrp pointer
    //@@@ ;
    //@@@ 
    //@@@ DECLARE
    //@@@ 1 PO BASED(PTRP),
    //@@@ 2 (
    //@@@ pressure,
    //@@@ radius,
    //@@@ thickness
    //@@@ )             float,
    var pressure = 0;
    var radius = 1;
    var thickness = 2;
    //@@@ 
    //@@@ 1 XO BASED(PTRX),
    //@@@ 2 (
    //@@@ force,
    //@@@ area,
    //@@@ stress
    //@@@ )             float;
    var force = 0;
    var area = 1;
    var stress = 2;
    //@@@ 
    //@@@ %include 'd_const.inc';
    //@@@ 
    //@@@ 
    //@@@ PTRP=ADDR(P);
    //@@@ 
    //@@@ /*  *******  DESIGN EQUATIONS  *******                  */
    //@@@ 
    //@@@ area=pi*radius*radius;
    //@@@ force=pressure*area;
    //@@@ stress=(pressure*radius)/(2.0*thickness);
    design.state_variables[area].value = design.constants[pi].value * design.design_parameters[radius].value * design.design_parameters[radius].value;
    design.state_variables[force].value = design.design_parameters[pressure].value * design.state_variables[area].value;
    design.state_variables[stress].value = (design.design_parameters[pressure].value * design.design_parameters[radius].value) / (2.0 * design.design_parameters[thickness].value);
    //@@@ 
    //@@@ /********************************************************************/
    //@@@ 
    //@@@ if m_flag ^= 0 then
    if (M_FLAG)
        //@@@ put skip list('No report available.');
        console.log('No report available.');
    //@@@ 
    //@@@ END EQNSET1;
    //@@@ 
}

module.exports = eqnset1;

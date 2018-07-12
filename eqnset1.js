"use strict";
function eqnset1() {
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
    var pi = 0;
    var pressure = 0;
    var radius = 1;
    var thickness = 2;
    var force = 0;
    var area = 1;
    var stress = 2;
    design.state_variables[area].value = design.constants[pi].value * design.design_parameters[radius].value * design.design_parameters[radius].value;
    design.state_variables[force].value = design.design_parameters[pressure].value * design.state_variables[area].value;
    design.state_variables[stress].value = (design.design_parameters[pressure].value * design.design_parameters[radius].value) / (2.0 * design.design_parameters[thickness].value);
    if (M_FLAG)
        console.log('No report available.');
}
module.exports = eqnset1;

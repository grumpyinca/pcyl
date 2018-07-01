"use strict";
function eqnset1() {

    var pi = 0;
    var pressure = 0;
    var radius = 1;
    var thickness = 2;
    var force = 0;
    var area = 1;
    var stress = 2;

    //@@@ area=pi*radius*radius;
    //@@@ force=pressure*area;
    //@@@ stress=(pressure*radius)/(2.0*thickness);

    //@@@ console.log('pressure = ' + p[pressure]);
    //@@@ console.log('radius = ' + p[radius]);
    //@@@ console.log('thickness = ' + p[thickness]);

    design.state_variables[area].value = design.constants[pi].value * design.design_parameters[radius].value * design.design_parameters[radius].value;
    design.state_variables[force].value = design.design_parameters[pressure].value * design.state_variables[area].value;
    design.state_variables[stress].value = (design.design_parameters[pressure].value * design.design_parameters[radius].value) / (2.0 * design.design_parameters[thickness].value);

    //@@@ for (let i = 0; i < design.state_variables.length; i++) {
    //@@@     var sv = design.state_variables[i];
    //@@@     console.log(sv.name + ' = ' + sv.value + ' ' + sv.units);
    //@@@ }
}

module.exports = eqnset1;

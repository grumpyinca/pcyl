constants = {
        pi: {value:  4.0 * Math.atan(1.0), units : '' }
}
console.log('pi=' + constants.pi.value);

design_parameters = {
	pressure : {value : 500.0, units : ' LBS/SQ-IN', lmin : 0, lmax : 1, cmin : 0.0, cmax : 1500.0, ioclass : 0, sdlim : 0.0},
	radius :   {value : 0.4,   units : ' INCH',      lmin : 1, lmax : 1, cmin : 0.0, cmax :    0.5, ioclass : 0, sdlim : 0.0},
	thickness :{value : 0.04,  units : ' INCH',      lmin : 1, lmax : 1, cmin : 0.0, cmax :   0.05, ioclass : 0, sdlim : 0.0}
};

state_variables = {
	force  : {value : 0.0, units : ' LBS.',    lmin : 1, lmax : 0, cmin : 1000.0, cmax : 0.0,    ioclass : 0, sdlim : 0.0},
	area   : {value : 0.0, units : ' SQ.-IN.', lmin : 0, lmax : 0, cmin : 0.0,    cmax : 0.0,    ioclass : 0, sdlim : 0.0},
	stress : {value : 0.0, units : ' PSI',     lmin : 0, lmax : 1, cmin : 0.0,    cmax : 3000.0, ioclass : 0, sdlim : 0.0}
};

// Need to add a check of fixed/free status and function calls to sclden here (sets scaling denominators)

console.log('design parameters = ', design_parameters);
console.log('pressure = ' +  design_parameters.pressure.value  + design_parameters.pressure.units);
console.log('radius = '   +  design_parameters.radius.value    + design_parameters.radius.units);
console.log('thickness = ' + design_parameters.thickness.value + design_parameters.thickness.units);

function eqnset1() {
    state_variables.area.value   =  constants.pi.value * design_parameters.radius.value * design_parameters.radius.value;
    state_variables.force.value  =  design_parameters.pressure.value * state_variables.area.value;
    state_variables.stress.value = (design_parameters.pressure.value * design_parameters.radius.value) / (2.0 * design_parameters.thickness.value);
}

console.log('state variables = ', state_variables);
console.log('force = '  + state_variables.force.value  + state_variables.force.units);
console.log('area = '   + state_variables.area.value   + state_variables.area.units);
console.log('stress = ' + state_variables.stress.value + state_variables.stress.units);

module.exports = eqnset1;

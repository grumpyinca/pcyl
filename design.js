global.constants = {
        pi : {value:  4.0 * Math.atan(1.0), units : '_' }
}

//console.log('constants = ', constants);
//console.log('pi = ' + constants.pi.value + constants.pi.units);

global.design_parameters = {
    pressure  : {value : 500.0, units : 'LBS/SQ-IN', lmin : 0, lmax : 1, cmin : 0.0, cmax : 1500.0, ioclass : 0, sdlim : 0.0},
    radius    : {value : 0.4,   units : 'INCH',      lmin : 1, lmax : 1, cmin : 0.0, cmax :    0.5, ioclass : 0, sdlim : 0.0},
    thickness : {value : 0.04,  units : 'INCH',      lmin : 1, lmax : 1, cmin : 0.0, cmax :   0.05, ioclass : 0, sdlim : 0.0}
};

//console.log('design parameters = ', design_parameters);
//for ( var property in design_parameters) {
//    if (design_parameters.hasOwnProperty(property)) {
//        console.log(property + ' = ' + design_parameters[property].value
//                + design_parameters[property].units);
//    }
//}

global.state_variables = {
    force  : {value : 0.0, units : 'LBS.',    lmin : 1, lmax : 0, cmin : 1000.0, cmax : 0.0,    ioclass : 0, sdlim : 0.0},
    area   : {value : 0.0, units : 'SQ.-IN.', lmin : 0, lmax : 0, cmin : 0.0,    cmax : 0.0,    ioclass : 0, sdlim : 0.0},
    stress : {value : 0.0, units : 'PSI',     lmin : 0, lmax : 1, cmin : 0.0,    cmax : 3000.0, ioclass : 0, sdlim : 0.0}
};

//console.log('state variables = ', state_variables);
//for ( var property in state_variables) {
//    if (state_variables.hasOwnProperty(property)) {
//        console.log(property + ' = ' + state_variables[property].value
//                + state_variables[property].units);
//    }
//}

module.exports = null;
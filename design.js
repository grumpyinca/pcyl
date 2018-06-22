global.constants = [
    { name: 'PI', value : 0.0, units : '_' }
];

//console.log('constants = ', constants);
//for (let c of constants) {
//    console.log(c.name + ' = ' + c.value + c.units);
//}

global.design_parameters = [
    { name: 'PRESSURE',  value : 500.0, oldvalue : 0.0, units : 'LB/SQ-IN', lmin : 0, lmax : 1, cmin : 0.0, cmax : 1500.0, ioclass : 0, sdlim : 0.0},
    { name: 'RADIUS',    value : 0.4,   oldvalue : 0.0, units : 'INCH',     lmin : 1, lmax : 1, cmin : 0.0, cmax :    0.5, ioclass : 0, sdlim : 0.0},
    { name: 'THICKNESS', value : 0.04,  oldvalue : 0.0, units : 'INCH',     lmin : 1, lmax : 1, cmin : 0.0, cmax :   0.05, ioclass : 0, sdlim : 0.0}
];

//console.log('design parameters = ', design_parameters);
//for (let dp of design_parameters) {
//    console.log(dp.name + ' = ' + dp.value + ' ' + dp.units);
//}

global.state_variables = [
    { name: 'FORCE',  value : 0.0, oldvalue : 0.0, units : 'LBS.',    lmin : 1, lmax : 0, cmin : 1000.0, cmax : 0.0,    ioclass : 0, sdlim : 0.0},
    { name: 'AREA',   value : 0.0, oldvalue : 0.0, units : 'SQ.-IN.', lmin : 0, lmax : 0, cmin : 0.0,    cmax : 0.0,    ioclass : 0, sdlim : 0.0},
    { name: 'STRESS', value : 0.0, oldvalue : 0.0, units : 'PSI',     lmin : 0, lmax : 1, cmin : 0.0,    cmax : 3000.0, ioclass : 0, sdlim : 0.0}
];

//console.log('state variables = ', state_variables);
//for (let sv of state_variables) {
//    console.log(sv.name + ' = ' + sv.value + ' ' + sv.units);
//}

module.exports = null;

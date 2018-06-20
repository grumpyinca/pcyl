function eqnset1(p) {
    
    var pi = 0;
    var pressure = 0;
    var radius = 1;
    var thickness = 2;
    var force = 0;
    var area = 1;
    var stress = 2;
    
    // area=pi*radius*radius;
    // force=pressure*area;
    // stress=(pressure*radius)/(2.0*thickness);
    
    state_variables[area].value = constants[pi].value * p[radius] * p[radius];
    state_variables[force].value = p[pressure] * state_variables[area].value;
    state_variables[stress].value = (p[pressure] * p[radius]) / (2.0 * p[thickness]);
    
//    for (let sv of state_variables) {
//        console.log(sv.name + ' = ' + sv.value + ' ' + sv.units);
//    }
}

module.exports = eqnset1;

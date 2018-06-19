function eqnset1() {
    state_variables[1].value   =  constants[0].value * design_parameters[1].value * design_parameters[1].value;
    state_variables[0].value  =  design_parameters[0].value * state_variables[0].value;
    state_variables[2].value = (design_parameters[0].value * design_parameters[1].value) / (2.0 * design_parameters[2].value);
}

module.exports = eqnset1;

function eqnset1() {
    state_variables.area.value   =  constants.pi.value * design_parameters.radius.value * design_parameters.radius.value;
    state_variables.force.value  =  design_parameters.pressure.value * state_variables.area.value;
    state_variables.stress.value = (design_parameters.pressure.value * design_parameters.radius.value) / (2.0 * design_parameters.thickness.value);
}

module.exports = eqnset1;

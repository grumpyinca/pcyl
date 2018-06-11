module.exports = function(split_line) {
    var hits = false;
    if (design_parameters[split_line[1]] !== undefined) {
        console.log(design_parameters[split_line[1]].value + design_parameters[split_line[1]].units);
        hits = true;
    }
    if (state_variables[split_line[1]] !== undefined) {
        console.log(state_variables[split_line[1]].value + state_variables[split_line[1]].units);
        hits = true;
    }
    if (!hits && split_line[1] !== undefined) {
        console.log(split_line[1] + ' ? ?')
    }
}

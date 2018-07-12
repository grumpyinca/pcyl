"use strict";
/**
 * Free command - set free status for design parameter or state variable
 */
var count = require('./count');
var sprintf = require("sprintf-js").sprintf;
function free(split_line) {
    if (split_line == '') {
        console.log('FREE:');
        console.log('ENTER NAME OF VARIABLE TO BE FREED');
        return;
    }
    var hits = false;
    for (let i = 0; i < design.design_parameters.length; i++) {
        var dp = design.design_parameters[i];
        if (dp.name.startsWith(split_line[0])) {
            dp.lmin = FREESTAT;
            dp.lmax = FREESTAT;
            console.log(sprintf('THE STATUS OF %s IS FREE.', dp.name));
            count();
            return;
        }
    }
    for (let i = 0; i < design.state_variables.length; i++) {
        var sv = design.state_variables[i];
        if (sv.name.startsWith(split_line[0])) {
            sv.lmin = FREESTAT;
            sv.lmax = FREESTAT
            console.log(sprintf('THE STATUS OF %s IS FREE.', sv.name));
            count();
            return;
        }
    }
    if (!hits)
        console.log(split_line[0] + ' ? ?');
}
module.exports = free;

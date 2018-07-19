"use strict";
/**
 * FIX command - apply fixed status to design parameter or state variable
 */
var count = require('./count');
var sclden = require('./sclden');
var sprintf = require("sprintf-js").sprintf;
function fix(split_line) {
    var name = split_line.shift();
    var value = split_line.shift();
    if (name === undefined) {
        console.log('FIX:');
        console.log('ENTER NAME OF VARIABLE TO BE FIXED');
        return;
    }
    for (let i = 0; i < design.design_parameters.length; i++) {
        var dp = design.design_parameters[i];
        if (dp.name.startsWith(name)) {
            if (value !== undefined) {
                if (value.match(/^[-+]?[0-9]*\.?[0-9]*$/) !== null) {
                    dp.value = parseFloat(value);
                } else {
                    console.log(sprintf('INVALID VALUE GIVEN, ASSUMING CURRENT VALUE %14.4f', dp.value));
                }
            }
            dp.lmin = FIXEDSTAT;
            dp.lmax = FIXEDSTAT;
            dp.cmin = dp.value;
            dp.smin = sclden(dp.value, dp.cmin, dp.sdlim, dp.lmin);
            dp.cmax = dp.value;
            dp.smax = sclden(dp.value, dp.cmax, dp.sdlim, dp.lmax);
            console.log(sprintf('%s IS FIXED AT %14.4f   %s', dp.name, dp.value, dp.units));
            count();
            return;
        }
    }
    for (let i = 0; i < design.state_variables.length; i++) {
        var sv = design.state_variables[i];
        if (sv.name.startsWith(name)) {
            if (value !== undefined) {
                if (value.match(/^[-+]?[0-9]*\.?[0-9]*$/) !== null) {
                    sv.cmin = parseFloat(value);
                    sv.cmax = parseFloat(value);
                } else {
                    console.log(sprintf('INVALID VALUE GIVEN, ASSUMING CURRENT VALUE %14.4f', sv.value));
                    sv.cmin = sv.value;
                    sv.cmax = sv.value;
                }
            } else {
                sv.cmin = sv.value;
                sv.cmax = sv.value;
            }
            sv.lmin = FIXEDSTAT;
            sv.lmax = FIXEDSTAT;
            sv.smin = sclden(sv.value, sv.cmin, sv.sdlim, sv.lmin);
            sv.smax = sclden(sv.value, sv.cmax, sv.sdlim, sv.lmax);
            if (IOOPT > 2) {
                console.log(sprintf('%s IS A DEPENDENT VARIABLE.', sv.name));
                console.log('REMEMBER THAT A SEARCH WILL BE REQUIRED TO ESTABLISH THE DESIRED VALUE.');
            }
            console.log(sprintf("%s IS FIXED AT %14.4f   %s", sv.name, sv.cmin, sv.units));
            count();
            return;
        }
    }
    console.log(name + ' ? ?');
}
module.exports = fix;

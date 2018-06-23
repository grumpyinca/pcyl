"use strict";
/**
 * START command - reads startup file, computes scaling den, invokes contnt for
 * problem specific constants.
 */

var contnt = require('./contnt');
var count = require('./count');
var despak = require('./despak');
var sclden = require('./sclden');
var update = require('./update');

function start(split_line) {

    console.log("START:");
    console.log("  The START command is not yet fully implemented.")

    update();
    
    // TODO: Read the startup file here

    for (let i = 0; i < design_parameters.length; i++) {
        var dp = design_parameters[i];
        if (dp.lmin != FREESTAT) {
            dp.smin = sclden(dp.value, dp.cmin, dp.sdlim, dp.lmin);
        } else {
            dp.smin = SCLDEN_DEFAULT;
        }
        if (dp.lmax != FREESTAT) {
            dp.smax = sclden(dp.value, dp.cmax, dp.sdlim, dp.lmax);
        } else {
            dp.smax = SCLDEN_DEFAULT;
        }
    }

    for (let i = 0; i < state_variables.length; i++) {
        var sv = state_variables[i];
        if (sv.lmin != FREESTAT) {
            sv.smin = sclden(sv.value, sv.cmin, sv.sdlim, sv.lmin);
        } else {
            sv.smin = SCLDEN_DEFAULT;
        }
        if (sv.lmax != FREESTAT) {
            sv.smax = sclden(sv.value, sv.cmax, sv.sdlim, sv.lmax);
        } else {
            sv.smax = SCLDEN_DEFAULT;
        }
        if (sv.lmin == FIXEDSTAT) {
            sv.lmax = FIXEDSTAT;
            sv.smax = sv.smin;
            console.log(`${sv.name} is fixed at ${sv.cmin} ${sv.units}`);
        }
    }

    // design_parameters[1].lmin = 2;
    // state_variables.force.lmin = 2;
    // state_variables.stress.lmin = -1;
    count();
    // console.log('start: NFIXED, NSTF, NFDCL = ', NFIXED, NSTF, NFDCL);

    contnt();

    var p = [];
    for (let i = 0; i < design_parameters.length; i++) {
        var dp = design_parameters[i];
        p[i] = dp.value;
    }
    var obj = despak(p);

    //console.log('design parameters = ', design_parameters);
    //for (let i = 0; i < design_parameters.length; i++) {
    //    var dp = design_parameters[i];
    //    console.log(dp.name + ' = ' + dp.value + ' ' + sp.units);
    //}

    //console.log('state variables = ', state_variables);
    //for (let i = 0; i < state_variables.length; i++) {
    //    var sv = state_variables[i];
    //    console.log(sv.name + ' = ' + sv.value + ' ' + sv.units);
    //}

}

module.exports = start;

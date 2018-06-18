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

    for ( var property in design_parameters) {
        if (design_parameters.hasOwnProperty(property)) {
            var dp = design_parameters[property];
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
    }

    for ( var property in state_variables) {
        if (state_variables.hasOwnProperty(property)) {
            var sv = state_variables[property];
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
                console.log(`${property} is fixed at ${sv.cmin} ${sv.units}`);
            }
        }
    }

    // design_parameters.radius.lmin = 2;
    // state_variables.force.lmin = 2;
    // state_variables.stress.lmin = -1;
    count();
    // console.log('start: NFIXED, NSTF, NFDCL = ', NFIXED, NSTF, NFDCL);

    contnt();

    var obj = despak();

    //console.log('design parameters = ', design_parameters);
    //for ( var property in design_parameters) {
    //    if (design_parameters.hasOwnProperty(property)) {
    //        console.log(property + ' = ' + design_parameters[property].value
    //                + design_parameters[property].units);
    //    }
    //}

    //console.log('state variables = ', state_variables);
    //for ( var property in state_variables) {
    //    if (state_variables.hasOwnProperty(property)) {
    //        console.log(property + ' = ' + state_variables[property].value
    //                + state_variables[property].units);
    //    }
    //}

}

module.exports = start;

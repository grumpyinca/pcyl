"use strict";
/**
 * SEARCH command - invokes search routine to find feasible or optimal design
 */
var despak = require('./despak');
var list = require('./list');
var sprintf = require("sprintf-js").sprintf;
var srch = require('./srch');
var update = require('./update');
function search(split_line) {
    M_FLAG = true;
    var p = [];
    for (let i = 0; i < design.design_parameters.length; i++) {
        var dp = design.design_parameters[i];
        p[i] = dp.value;
    }
    var obj = despak(p);
    M_FLAG = false;
    console.log(sprintf('SEARCH:    OBJ =%18.6f', obj))
    update();
    if (IOOPT >= 3 && NSTF != 0) {
        for (let i = 0; i < design.state_variables.length; i++) {
            var sv = design.state_variables[i];
            if (sv.lmin == FIXEDSTAT) {
                console.log(sprintf('NOTE: DEPENDENT VARIABLE %s IS FIXED AT %14.4f   %s', sv.name, sv.cmin, sv.units));
                console.log('ADDITIONAL COMPUTATIONAL EFFORT MAY BE ANTICIPATED.');
            }
        }
    }
    // TODO: Remember to make corresponding changes to DESPAK before executing SRCH with any fixed design parameters
    var obj = srch();
    if (IOOPT > 0) {
        console.log(sprintf('RETURN ON: %s     OBJ =%18.6f', NCODE, obj));
    }
    if (IOOPT >= 2) {
        var output = '';
        output += 'THE RESULT IS ';
        if (obj > OBJMIN)
            output += 'NOT';
        else {
            var j = 0;
            for (let i = 0; i < design.design_parameters.length; i++) {
                var dp = design.design_parameters[i];
                if (dp.lmin == SETSTAT)
                    if (dp.vmin > 0.0)
                        j++;
                if (dp.lmax == SETSTAT)
                    if (dp.vmax > 0.0)
                        j++;
            }
            for (let i = 0; i < design.state_variables.length; i++) {
                var sv = design.state_variables[i];
                if (sv.lmin == SETSTAT)
                    if (sv.vmin > 0.0)
                        j++;
                if (sv.lmax == SETSTAT)
                    if (sv.vmax > 0.0)
                        j++;
            }
            if (j > 0)
                output += 'MARGINALLY';
        }
        output += ' FEASIBLE.';
        console.log(output);
    }
    if (IOOPT >= 2 && obj > OBJMIN) {
        console.log('         YOU NEED TO DO A LITTLE MORE WORK ON THIS DESIGN.');
        console.log('         REFER TO THE DOCUMENTATION SECTION ON  "FEASIBILITY"  FOR SUGGESTIONS.');
    }
    if (IOOPT >= 2 && obj <= OBJMIN) { // TODO: consider combining as else clause for if above
        console.log('         THIS DESIGN MEETS ALL STATED REQUIREMENTS (CONSTRAINTS).');
        console.log('         YOU MAY BE ABLE TO IMPROVE IT WITH THE SEEK COMMAND.');
    }
    /* present results after search */
    if (obj > OBJMIN)
        list([ 'VIOLATIONS' ]); // TODO: consider combining with if ... else above.
    else
        list([ 'INDEPENDENT' ]);
}
module.exports = search;

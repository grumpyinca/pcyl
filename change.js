"use strict";
/**
 * CHANGE command - allows user to input changes to problem variables see SET
 * command for user input to internal variables and program control
 */
var count = require('./count');
var sclden = require('./sclden');
var sprintf = require("sprintf-js").sprintf;
function change(split_line) {
    var minimum = 'MINIMUM';
    var maximum = 'MAXIMUM';
    var name = split_line.shift();
    var minmax = split_line.shift();
    var value = split_line.shift();
    if (name !== undefined && minmax !== undefined) {
        var found_minmax = false;
        if (minimum.startsWith(minmax)) found_minmax = true;
        if (maximum.startsWith(minmax)) found_minmax = true;
        if (!found_minmax) {
            value = minmax;
            /*
             * test for character string constant first, then check for valid OP(2)
             */
            for (let c of design.constants) {
                if (c.name.startsWith(name)) {
                    c.value = value;
                    // TODO: Do we need to do this later?
                    /* update design.constants if necessary */
                    /* announce exceptions if necessary */
                    if (IOOPT > 2) {
                        console.log(sprintf('%s CHANGED TO %s', c.name, c.value));
                    }
                    return;
                }
            }
            if (value.match(/^[-+]?[0-9]*\.?[0-9]*$/) !== null) {
                for (let i = 0; i < design.design_parameters.length; i++) {
                    var dp = design.design_parameters[i];
                    if (dp.name.startsWith(name)) {
                            dp.value = parseFloat(value);
                        if (dp.lmin == FIXEDSTAT) {
                            dp.cmin = dp.value;
                            dp.smin = sclden(dp.value, dp.cmin, dp.sdlim, SETSTAT);
                            dp.cmax = dp.value;
                            dp.smax = sclden(dp.value, dp.cmax, dp.sdlim, SETSTAT);
                        }
                        if (IOOPT > 2 && name != dp.name) {
                            console.log(sprintf('%s CHANGED TO %14.4f   %s',dp.name, dp.value, dp.units));
                        }
                        return;
                    }
                }
                for (let i = 0; i < design.state_variables.length; i++) {
                    var sv = design.state_variables[i];
                    if (sv.name.startsWith(name)) {
                        sv.cmin = parseFloat(value);
                        sv.cmax = parseFloat(value);
                        if (sv.lmin != FIXEDSTAT) {
                            if (IOOPT > 2) {
                                console.log(sprintf('%s IS A DEPENDENT VARIABLE.', sv.name));
                                console.log('REMEMBER THAT A SEARCH WILL BE REQUIRED TO ESTABLISH THE DESIRED VALUE.');
                            }
                            if (IOOPT > 2) {
                                console.log(sprintf('%s FIXED AT %14.4f   %s', sv.name, sv.cmin, sv.units));
                            }
                            sv.lmin = FIXEDSTAT;
                            sv.lmax = FIXEDSTAT;
                            count();
                        }
                        sv.smin = sclden(sv.value, sv.cmin, sv.sdlim, FIXEDSTAT);
                        sv.smax = sv.smin;
                        return;
                    }
                }
                console.log(name, ' ? ?');
            }
        } else {
            if (value !== undefined) {
                if (value.match(/^[-+]?[0-9]*\.?[0-9]*$/) !== null) {
                    for (let i = 0; i < design.design_parameters.length; i++) {
                        var dp = design.design_parameters[i];
                        if (dp.name.startsWith(name)) {
                            var ctemp = dp.value;
                            if (dp.lmin == FIXEDSTAT) {
                                console.log('WARNING ...  FIXED STATUS REPLACED.');
                                dp.lmin = FREESTAT;
                                dp.lmax = FREESTAT;
                            }
                            if (minimum.startsWith(minmax)) {
                                dp.lmin = SETSTAT;
                                dp.cmin = parseFloat(value);
                                // TODO: DO for FDCL, skipping for right now
                               dp.smin = sclden(ctemp, dp.cmin, dp.sdlim, dp.lmin);
                               if (IOOPT > 2 && name != '') {
                                   console.log(sprintf('%s MINIMUM CHANGED TO %14.4f   %s', dp.name, dp.cmin, dp.units));
                               }
                            }
                            else {
                                dp.lmax = SETSTAT;
                                dp.cmax = parseFloat(value);
                                // TODO: DO for FDCL, skipping for right now
                                dp.smax = sclden(ctemp, dp.cmax, dp.sdlim, dp.lmax); // TODO: Changed lmin to lmax?
                                if (IOOPT > 2 && name != '') {
                                    console.log(sprintf('%s MAXIMUM CHANGED TO %14.4f   %s', dp.name, dp.cmax, dp.units));
                                }
                            }
                            count();
                            return;
                        }
                    }
                    for (let i = 0; i < design.state_variables.length; i++) {
                        var sv = design.state_variables[i];
                        if (sv.name.startsWith(name)) {
                            var ctemp = sv.value;
                            if (sv.lmin == FIXEDSTAT) {
                                console.log('WARNING ...  FIXED STATUS REPLACED.');
                                sv.lmin = FREESTAT;
                                sv.lmax = FREESTAT;
                            }
                            if (minimum.startsWith(minmax)) {
                                sv.lmin = SETSTAT;
                                sv.cmin = parseFloat(value);
                                // TODO: DO for FDCL, skipping for right now
                                sv.smin = sclden(ctemp, sv.cmin, sv.sdlim, sv.lmin);
                                if (IOOPT > 2 && name != '') {
                                    console.log(sprintf('%s MINIMUM CHANGED TO %14.4f   %s', sv.name, sv.cmin, sv.units));
                                }
                            }
                            else {
                                sv.lmax = SETSTAT;
                                sv.cmax = parseFloat(value);
                                // TODO: DO for FDCL, skipping for right now
                                sv.smax = sclden(ctemp, sv.cmax, sv.sdlim, sv.lmax); // TODO: Changed lmin to lmax?
                                if (IOOPT > 2 && name != '') {
                                    console.log(sprintf('%s MAXIMUM CHANGED TO %14.4f   %s', sv.name, sv.cmax, sv.units));
                                }
                            }
                            count();
                            return;
                        }
                    }
                    console.log(name, ' ? ?');
                }
                // TODO: DO for FDCL, skipping for right now
                // TODO: DO for FDCL, skipping for right now
            }
        }
    }
        console.log('CHANGE ...');
        console.log('SYNTAX:   CHANGE  NAME  VALUE');
        console.log('    OR    CHANGE  NAME  [MIN | MAX]  VALUE');
        console.log('    OR    CHANGE  NAME  [MIN | MAX]  NAME');
}
module.exports = change;

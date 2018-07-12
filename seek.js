"use strict";
/**
 * SEEK command - explore available solutions within a feasible region
 */
var despak = require('./despak');
var sprintf = require("sprintf-js").sprintf;
var srch = require('./srch');
var update = require('./update');
function seek(split_line) {
    var minimum = 'MINIMUM';
    var maximum = 'MAXIMUM';
    /***************************************************************************
     * sought - indicates parameter/variable in question; + for DP, - for SV
     * sdir - indicates direction of motion; + for max, - for min
     **************************************************************************/
    SOUGHT = 0;
    SDIR = 0;
    var p = [];
    for (let i = 0; i < design.design_parameters.length; i++) {
        var dp = design.design_parameters[i];
        p[i] = dp.value;
    }
    var obj = despak(p); /* update OBJ & X */
    console.log(sprintf('SEEK:    OBJ =%18.6f', obj));
    if (obj > OBJMIN && NSTF == 0)
        console.log('NOTE:  THE SEEK PROCESS MAY PRODUCE BETTER RESULTS WITH A FEASIBLE START POINT.');
    var minmax = split_line.shift();
    var name = split_line.shift();
    if (name === undefined) {
        var autosw = 0;
    } else {
        var autosw = 1;
        if (maximum.startsWith(minmax))
            SDIR = +1;
        if (minimum.startsWith(minmax))
            SDIR = -1;
    }
    var found = false;
    for (let i = 0; !found && i < design.design_parameters.length; i++) {
        var dp = design.design_parameters[i];
        if (dp.name.startsWith(name)) {
            var temp = dp.value;
            var dname = dp.name;
            var input = dp.units;
            if (dp.lmin == FIXEDSTAT) {
                console.log(sprintf('%s IS FIXED.   USE OF SEEK IS NOT APPROPRIATE.', dname));
                SOUGHT = 0;
                SDIR = 0;
                return;
            }
            SOUGHT = (i + 1);
            found = true;
        }
    }
    for (let i = 0; !found && i < design.state_variables.length; i++) {
        var sv = design.state_variables[i];
        if (sv.name.startsWith(name)) {
            var temp = sv.value;
            var dname = sv.name;
            var input = sv.units;
            if (sv.lmin == FIXEDSTAT) {
                console.log(sprintf('%s IS FIXED.   USE OF SEEK IS NOT APPROPRIATE.', dname));
                SOUGHT = 0;
                SDIR = 0;
                return;
            }
            SOUGHT = -(i + 1);
            found = true;
        }
    }
    if (SOUGHT == 0 || SDIR == 0) {
        console.log('CORRECT USAGE IS:');
        console.log('SEEK  [MIN | MAX]  [variable name]');
        SOUGHT = 0;
        SDIR = 0;
        return;
    }
    if (autosw == 1) {
        M_NUM = temp + 0.1 * SDIR * temp;
        putest();
        if (IOOPT > 2)
            console.log('ESTIMATING VALUE OF OPTIMUM ...');
        estopt();
        if (obj < OBJMIN) {
            for (let i = 0; i < design.design_parameters.length; i++) {
                var dp = design.design_parameters[i];
                dp.value = dp.oldvalue;
            }
        } else
            findfeas();
    } else {
    }
    console.log(sprintf('SEEKING OPTIMUM %s USING ESTIMATE OF:     %14.4f   %s', dname, M_NUM, input));
    ftest();
    update();
    var obj = srch();
    if (IOOPT > 0)
        console.log(sprintf('RETURN ON: %s     OBJ =%18.6f', NCODE, obj))
    if (SOUGHT > 0)
        var temp1 = design.design_parameters[SOUGHT - 1].value;
    else
        var temp1 = design.state_variables[-SOUGHT - 1].value;
    console.log(sprintf('CURRENT VALUE OF %s IS%14.4f   %s', dname, temp1, input));
    if (obj < 0.0)
        console.log('SEEK SHOULD BE RE-EXECUTED WITH A NEW ESTIMATEOF THE OPTIMUM.');
    function estopt() {
        M_NUM = temp + 0.1 * SDIR * temp;
        ftest();
        var value = OBJMIN;
        OBJMIN = -1.0;
        update(p);
        var obj = srch();
        OBJMIN = value;
        if (SOUGHT > 0)
            M_NUM = design.design_parameters[SOUGHT - 1].value;
        else
            M_NUM = design.state_variables[-SOUGHT - 1].value;
        putest();
        ftest();
    }
    function findfeas() {
        if (IOOPT > 2)
            console.log('SEARCHING FOR A FEASIBLE START POINT ...');
        var j = SOUGHT;
        SOUGHT = 0;
        var obj = srch();
        SOUGHT = j;
        putest();
    }
    function putest() {
        if (SOUGHT > 0)
            var temp = design.design_parameters[SOUGHT - 1].value;
        else
            var temp = design.state_variables[-SOUGHT - 1].value;
        console.log(sprintf('THE CURRENT VALUE OF %s IS:         %14.4f   %s', dname, temp, input));
        console.log(sprintf('THE CURRENT ESTIMATED OPTIMUM IS:   %14.4f   %s', M_NUM, input));
    }
    function ftest() {
        M_DEN = Math.abs(M_NUM) / MFN_WT;
        if (M_DEN < SMALLNUM)
            M_DEN = 1.0;
        var p = [];
        for (let i = 0; i < design.design_parameters.length; i++) {
            var dp = design.design_parameters[i];
            p[i] = dp.value;
        }
        var obj = despak(p);
    }
    SOUGHT = 0;
    SDIR = 0;
}
module.exports = seek;

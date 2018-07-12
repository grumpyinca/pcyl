"use strict";
/**
 * REPORT command - output design information in problem specific format
 */
var despak = require('./despak');
var sprintf = require("sprintf-js").sprintf;
function report(split_line) {
    if (IOOPT > 3) 
        console.log(sprintf('"SPECIAL" CALL TO EQNSET %2.0f', NMERIT));
    M_FLAG = true;
    var p = [];
    for (let i = 0; i < design.design_parameters.length; i++) {
        var dp = design.design_parameters[i];
        p[i] = dp.value;
    }
    var obj = despak(p);
    M_FLAG = false;
}
module.exports = report;

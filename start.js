"use strict";
/**
 * START command - reads startup file, computes scaling den, invokes contnt for
 * problem specific design.constants.
 */
var contnt = require('./contnt');
var count = require('./count');
var despak = require('./despak');
var fs = require("fs");
var sclden = require('./sclden');
var sprintf = require("sprintf-js").sprintf;
var update = require('./update');
function start(split_line) {
    var sfname = 'STARTUP';
    var name = split_line.shift();
    var retain = split_line.shift();
    sfreader(sfname);
    count();
    contnt();
    var p = [];
    for (let i = 0; i < design.design_parameters.length; i++) {
        var dp = design.design_parameters[i];
        p[i] = dp.value;
    }
    var obj = despak(p);
    // This call to update() relocated from sfreader().
    update();
    return;
    // ====================================================================
    function sfreader(sfname) {
        console.log('START:');
        if (name === undefined) {
            console.log('ENTER NAME OF STARTUP FILE.');
            console.log(sprintf('  (DEFAULT = %s) : ', sfname));
            name = sfname;
            console.log(DESIGN_NAME + ': ' +name);
        }
        if (name !== undefined) {
            sfname = name.replace(/\.[^/.]+$/, "");
        }
        if (retain === undefined) {
            console.log('RETAIN CURRENT INTERNAL VARIABLES & OPTIONS ?  (y/N) : ');
            var yn = 'N';
            console.log(DESIGN_NAME + ': ' +yn);
        }
        if (yn !== undefined && 'YES'.startsWith(yn)) {
            if (IOOPT > 2) {
                console.log('CURRENT INTERNAL VARIABLES & OPTIONS RETAINED.');
                console.log('DESIGN PARAMETERS & CONSTRAINT LEVELS CHANGED TO THOSE IN THE STARTUP FILE.');
            }
        } else {
            // SETDEF:    
            /* SYSTEM DEFAULTS ... SEARCH ROUTINE TUNING PARAMETERS */
            global.WEAPON = 1;
            global.NMERIT = 1;
            global.NSRCH = 0;
            global.DEL = 1.0;
            global.DELMIN = 0.0001;
            global.OBJMIN = 0.00005;
            global.TOL = 0.0001;
            global.MAXIT = 100;
            global.NCODE = '';
            global.FIX_WT = 1.5; /* was 10.0, then 4.0 */
            global.CON_WT = 1.0;
            global.VIOL_WT = 1.0;
            global.ZERO_WT = 10.0; /* was 100.0 */
            global.MFN_WT = 0.01;
            global.M_NUM = 0.0;
            global.M_DEN = 100.0;
            global.M_FLAG = false;
            global.SOUGHT = 0;
            global.SDIR = 0;
            global.IOOPT = 3;
            global.SMALLNUM = 1.0e-07;
            /* INITIALIZE EVERYTHING TO FREE - SET ARRAYS TO ZERO */
            global.NFIXED = 0;
            global.NSTF = 0;
            global.NFDCL = 0;
            global.SCLDEN_DEFAULT = 1.0 / (FIX_WT * ZERO_WT);
            if (IOOPT > 2) {
                console.log('INTERNAL VARIABLES & OPTIONS HAVE BEEN SET.');
            }
        }
        var dname = sfname + '.DSN';
        if (IOOPT > 2) {
            console.log(sprintf('READING STARTUP FILE %s ...', dname));
        }
        try {
            global.design = JSON.parse(fs.readFileSync(dname, 'utf8'));
        } catch (err) {
            console.log('err=' + err);
            console.log(sprintf('%s IS NOT A VALID FILE NAME.', dname));
            console.log('PLEASE INVOKE THE START COMMAND WITH A VALID FILE NAME.');
            return;
        }
        console.log('COMMENT FIELD SAVED WITH THIS DESIGN IS:');
        design.labels.forEach(function(label) {
            if (label.name == 'COMMENT') {
                console.log(label.value);
            }
        });
        // Do migration from design file input version to latest version
        if (design.version === undefined) {
            design.version = DSN_VERSION;
        }
        for (let i = 0; i < design.state_variables.length; i++) {
            var sv = design.state_variables[i];
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
                console.log(sprintf('%s IS FIXED AT %14.6f %s', sv.name, sv.cmin, sv.units));
            }
        }
        for (let i = 0; i < design.design_parameters.length; i++) {
            var dp = design.design_parameters[i];
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
}
module.exports = start;

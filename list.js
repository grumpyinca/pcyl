"use strict";
var despak = require('./despak');
var sprintf = require("sprintf-js").sprintf;
function list(split_line) {
    var minlbl = 'MIN';
    var maxlbl = 'MAX';
    var commands = [
        { name: 'ALL', destination: function() {
            display_lblout();
            display_dcout();
            display_indep();
            display_dep();
            display_fxfr();
            display_levels();
            display_viol();
            display_lsvfv();
            display_objt();
            display_dpsv();
            display_sv();
            display_intern();
        }},
        { name: 'INDEPENDENT', destination: function() {
            display_indep();
        }},
        { name: 'DEPENDENT', destination: function() {
            display_dep();
        }},
        { name: 'BOTH_I&D', destination: function() {
            display_indep();
            display_dep();
        }},
        { name: 'VIOLATIONS', destination: function() {
            display_viol();
            display_lsvfv();
            display_objt();
        }},
        { name: 'DESIGN', destination: function() {
            display_dpsv();
        }},
        { name: 'PARAMETERS', destination: function() {
            display_dpsv();
        }},
        { name: 'STATE', destination: function() {
            display_sv();
        }},
        { name: 'VARIABLES', destination: function() {
            display_sv();
        }},
        { name: 'CONSTANTS', destination: function() {
            display_dcout();
        }},
        { name: 'SATISFIED', destination: function() {
            display_viol(false);
            display_lsvfv();
            display_objt();
        }},
        { name: 'OBJECTIVE', destination: function() {
            display_objt();
        }},
        { name: 'LEVELS', destination: function() {
            display_levels();
        }},
        { name: 'FIXED', destination: function() {
            display_fxfr();
        }},
        { name: 'LABEL', destination: function() {
            display_lblout();
        }},
        { name: 'INTERNAL', destination: function() {
            display_intern();
        }}
    ];
    var p = [];
    for (let i = 0; i < design.design_parameters.length; i++) {
        var dp = design.design_parameters[i];
        p[i] = dp.value;
    }
    var obj = despak(p);
    var subcommand = split_line.shift();
    if (subcommand !== undefined) {
        while (subcommand !== undefined) {
            var hits = false;
            if (!hits) {
                for (let command of commands) {
                    if (command.name.startsWith(subcommand)) {
                        command.destination();
                        hits = true;
                        break;
                    }
                }
            }
            if (!hits) {
                for (let i = 0; i < design.design_parameters.length; i++) {
                    var dp = design.design_parameters[i];
                    if (dp.name.startsWith(subcommand)) {
                        putdpsv(dp.name, dp.value, dp.units, dp);
                        hits = true;
                    }
                }
            }
            if (!hits) {
                for (let i = 0; i < design.state_variables.length; i++) {
                    var sv = design.state_variables[i];
                    if (sv.name.startsWith(subcommand)) {
                        putdpsv(sv.name, sv.value, sv.units, sv);
                        hits = true;
                    }
                }
            }
            if (!hits) {
                for (let i = 0; i < design.constants.length; i++) {
                    var c = design.constants[i];
                    if (c.name.startsWith(subcommand)) {
                        console.log(sprintf("%-16s=%14.4f  %-8s", c.name,c.value,c.units));
                        hits = true;
                    }
                }
            }
            if (!hits) {
                console.log(subcommand + ' ? ?');
                display_help();
            }
            subcommand = split_line.shift();
        }
    } else {
        display_help();
    }
    function display_help() {
        console.log('LIST:');
        console.log('ENTER MODIFIERS INDICATING OUTPUT DESIRED.');
        if (IOOPT > 2) {
            console.log('POSSIBLE MODIFIERS ARE:');
            var i = 0;
            var string = '   ';
            for (let command of commands) {
                i++;
                if (string != '   ')
                    string += ',  ';
                string += command.name;
                if (i % 6 == 0) {
                    string += ",  ";
                    console.log(string);
                    i = 0;
                    string = '   ';
                }
            }
            if (string != '   ') {
                console.log(string);
            }
        }
    }
    function display_lblout() {
        console.log('LABEL:');
        for (var i = 0; i < design.labels.length; i++) {
            var lbl = design.labels[i]
            if (lbl.name != 'COMMENT') {
                console.log(sprintf('%s: %s',lbl.name, lbl.value));
            }
        }
    }
    function display_dcout() {
        if (IOOPT >= 3) {
            console.log('CONSTANTS');
        }
        for (let i = 0; i < design.constants.length; i++) {
            var c = design.constants[i];
            console.log(sprintf("%-16s=%14.4f  %-8s", c.name,c.value,c.units));
        }
    }
    function display_indep() {
        console.log('INDEPENDENT VARIABLES                                      CONSTRAINT LEVELS');
        console.log('                                            STATUS         MIN           MAX');
        for (let i = 0; i < design.design_parameters.length; i++) {
            var dp = design.design_parameters[i];
            if (IOOPT > dp.ioclass || IOOPT >= 4 || dp.lmin != FREESTAT || dp.lmax != FREESTAT) {
                putdpsv(dp.name, dp.value, dp.units, dp);
            }
        }
    }
    function display_dep() {
        console.log('DEPENDENT VARIABLES                                        CONSTRAINT LEVELS');
        console.log('                                            STATUS         MIN           MAX');
        for (let i = 0; i < design.state_variables.length; i++) {
            var sv = design.state_variables[i];
            if (IOOPT >= sv.ioclass || IOOPT >= 4 || sv.lmin != FREESTAT || sv.lmax != FREESTAT) {
                putdpsv(sv.name, sv.value, sv.units, sv);
            }
        }
    }
    function display_fxfr() {
        if (NFIXED == 0 & NSTF == 0) {
            console.log('NO VARIABLES HAVE "FIXED" STATUS.');
        } else {
            console.log('VARIABLES WITH "FIXED" STATUS ARE:');
            console.log('                                            STATUS         MIN           MAX');
            if (NFIXED > 0) {
                for (let i = 0; i < design.design_parameters.length; i++) {
                    var dp = design.design_parameters[i];
                    if (dp.lmin == FIXEDSTAT) {
                        putdpsv(dp.name, dp.value, dp.units, dp);
                    }
                }
            }
            if (NSTF > 0) {
                for (let i = 0; i < design.state_variables.length; i++) {
                    var sv = design.state_variables[i];
                    if (sv.lmin == FIXEDSTAT) {
                        putdpsv(sv.name, sv.value, sv.units, sv);
                    }
                }
            }
        }
    }
    function display_levels() {
        var output = '';
        if (NFDCL == 0) {
            output += 'THERE ARE NO ';
        }
        console.log(output + 'FUNCTIONALLY DETERMINED CONSTRAINT LEVELS:');
        if (IOOPT > 2) {
            console.log('(REFER TO DOCUMENTATION SECTION  "FUNCTION".)');
        }
        if (NFDCL > 0) {
            console.log('CONSTRAINT ON:           IS CURRENT VALUE OF:', '----------------         -------------------');
            for (let i = 0; i < design.design_parameters.length; i++) {
                var dp = design.design_parameters[i];
                if (dp.lmin < 0) {
                    putlevel(dp.name, dp.lmin, minlbl);
                }
                if (dp.lmax < 0) {
                    putlevel(dp.name, dp.lmax, maxlbl);
                }
            }
            for (let i = 0; i < design.state_variables.length; i++) {
                var sv = design.state_variables[i];
                if (sv.lmin < 0) {
                    putlevel(sv.name, sv.lmin, minlbl);
                }
                if (sv.lmax < 0) {
                    putlevel(sv.name, sv.lmax, maxlbl);
                }
            }
        }
    }
    function display_viol() {
        var has_violations = false;
        for (let i = 0; i < design.design_parameters.length; i++) {
            var dp = design.design_parameters[i];
            if (dp.vmin > 0.0)
                has_violations = true
            if (dp.vmax > 0.0)
                has_violations = true
        }
        for (let i = 0; i < design.state_variables.length; i++) {
            var sv = design.state_variables[i];
            if (sv.vmin > 0.0)
                has_violations = true
            if (sv.vmax > 0.0)
                has_violations = true
        }
        if (!has_violations)
            console.log('NO CONSTRAINTS ARE VIOLATED');
        if (IOOPT > 3) {
            console.log('CONSTRAINT VIOLATIONS');
            console.log(sprintf("                        VALUE        LEVEL     DIFFERENCE    PERCENT"));
            for (let i = 0; i < design.design_parameters.length; i++) {
                var dp = design.design_parameters[i];
                putviol(dp.name, dp.value, dp.lmin, dp.vmin, dp.cmin, dp.smin, minlbl);
                putviol(dp.name, dp.value, dp.lmax, dp.vmax, dp.cmax, dp.smax, maxlbl);
            }
            for (let i = 0; i < design.state_variables.length; i++) {
                var sv = design.state_variables[i];
                putviol(sv.name, sv.value, sv.lmin, sv.vmin, sv.cmin, sv.smin, minlbl);
                putviol(sv.name, sv.value, sv.lmax, sv.vmax, sv.cmax, sv.smax, maxlbl);
            }
        }
    }
    function display_lsvfv() {
        if (NSTF > 0) {
            console.log('DEPENDENT VARIABLE FIX VIOLATIONS');
            console.log('                        VALUE        LEVEL     DIFFERENCE    WEIGHTED');
            for (let i = 0; i < design.state_variables.length; i++) {
                var sv = design.state_variables[i];
                    if (sv.lmin == FIXEDSTAT) {
                        var value = Math.abs(sv.vmin);
                        console.log(sprintf("%-16s%3s%13.4f%13.4f%12.4f%12.4f  %s", sv.name, ' = ', sv.value, sv.cmin, value * sv.smin, value*100.0, sv.units));
                    }
            }
        }
    }
    function display_objt() {
        console.log(sprintf('VALUE OF THE OBJECTIVE FUNCTION AT THIS POINT IS:    %18.6f', obj));
    }
    function display_dpsv() {
        console.log(sprintf("%s                       %s", 'INDEPENDENT VARIABLES  (inputs)', 'BEFORE SEARCH'));
        for (let i = 0; i < design.design_parameters.length; i++) {
            var dp = design.design_parameters[i];
            if (IOOPT >= dp.ioclass || ioopt >= 4) {
                var dname = '';
                if (dp.lmin == FIXEDSTAT)
                    dname = ' <-- FIXED';
                console.log(sprintf("%-16s=%14.4f  %-8s%-10s%14.4f", dp.name,dp.value,dp.units,dname,dp.oldvalue));
            }
        }
    }
    function display_sv() {
        if (IOOPT >= 3) {
            console.log(sprintf("%s                        %s", 'DEPENDENT VARIABLES  (outputs)', 'BEFORE SEARCH'));
        }
        for (let i = 0; i < design.state_variables.length; i++) {
            var sv = design.state_variables[i];
            if (IOOPT >= sv.ioclass || IOOPT >= 4) {
                var dname = '';
                if (sv.lmin == FIXEDSTAT)
                    dname = ' <-- FIXED';
                console.log(sprintf("%-16s=%14.4f  %-8s%-10s%14.4f", sv.name,sv.value,sv.units,dname,sv.oldvalue));
            }
        }
    }
    function display_intern() {
        if (IOOPT >= 4) {
            console.log('INTERNAL VARIABLES');
        }
        console.log(sprintf('IOOPT  =%4.0f            DEL    =%9.6f        FIX_WT  =%7.2f', IOOPT, DEL, FIX_WT));
        console.log(sprintf('MAXIT  =%4.0f            DELMIN =%9.6f        CON_WT  =%7.2f', MAXIT, DELMIN, CON_WT));
        console.log(sprintf('SEARCH =%4.0f            TOL    =%9.6f        ZERO_WT =%7.2f', WEAPON, TOL, ZERO_WT));
        console.log(sprintf('EQNSET =%4.0f            OBJMIN =%9.6f        VIOL_WT =%7.2f', NMERIT, OBJMIN, VIOL_WT));
        console.log(sprintf('                                                 MFN_WT  =%7.2f', MFN_WT));
    }
    function putdpsv(dpsvname, dpsvvalue, dpsvunit, dpsv) {
        var output = sprintf("%-16s=%14.4f  %-8s", dpsvname,dpsvvalue,dpsvunit);
        var dname = '        ';
        if (dpsv.lmin < FREESTAT || dpsv.lmax < FREESTAT)
            dname = 'FUNCTION';
        if (dpsv.lmin == FIXEDSTAT)
            dname = '   FIXED';
        output += sprintf("%-10s", dname);
        if (dpsv.lmin != FREESTAT)
            output += sprintf("%14.4f", dpsv.cmin);
        else 
            output += '              ';
        if (dpsv.lmax != FREESTAT)
            output += sprintf("%14.4f", dpsv.cmax);
        else 
            output += '              ';
        console.log(output);
    }
    function putviol(dpsvname, dpsvvalue, lmm, vmm, cmm, smm, mmlabl) {
        if (vmm > 0.0 || IOOPT > 3) {
            if (lmm == SETSTAT || lmm < FREESTAT) {
                var value = Math.abs(vmm * smm);
                var dname = '';
                if (vmm > 0.0) {
                    var dname = 'VIOLATED';
                }
                console.log(sprintf("%-16s%3s%13.4f%13.4f%12.4f%12.4f  %s", dpsvname, mmlabl, dpsvvalue, cmm, value, vmm*100.0, dname));
            }
        }
    }
    function putlevel(name, lmm, mmlabl) {
        console.log(name, mmlabl);
    }
}
module.exports = list;
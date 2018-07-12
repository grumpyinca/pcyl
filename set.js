"use strict";
/**
 * SET command - user input to internal variables and program control see CHANGE
 * command for input of changes to problem variables
 */
function set(split_line) {
    var commands = [
        { name: 'IOOPT', destination: function() {
            set_ioopt();
        }},
        { name: 'MAXIT', destination: function() {
            set_maxit();
        }},
        { name: 'SEARCH', destination: function() {
            set_search();
        }},
        { name: 'EQNSET', destination: function() {
            set_eqnset();
        }},
        { name: 'FIX_WT', destination: function() {
            set_fix_wt();
        }},
        { name: 'CON_WT', destination: function() {
            set_con_wt();
        }},
        { name: 'ZERO_WT', destination: function() {
            set_zero_wt();
        }},
        { name: 'VIOL_WT', destination: function() {
            set_viol_wt();
        }},
        { name: 'MFN_WT', destination: function() {
            set_mfn_wt();
        }},
        { name: 'OBJMIN', destination: function() {
            set_objmin();
        }},
        { name: 'DEL', destination: function() {
            set_del(false, false);
        }},
        { name: 'DELMIN', destination: function() {
            set_delmin();
        }},
        { name: 'LABEL', destination: function() {
            set_label();
        }},
//        { name: 'SCREEN', destination: function() {
//            set_screen();
//        }},
        { name: 'CLASS', destination: function() {
            set_class();
        }}
    ];
     /*
      * Permit change of various internal variables by the user. Replaces
      * function lost by absence of GET DATA in DRI PL/I
      * 
      * Assume OP is POPped by main routine
      */
    function display_help() {
        console.log('ENTER:');
        console.log('  INTERNAL VARIABLE NAME      NEW VALUE');
        console.log();
        if (IOOPT > 2) {
            console.log('INTERNAL VARIABLES AVAILABLE FOR CHANGE ARE: ');
            var i = 0;
            var string = '   ';
            for (let command of commands) {
                i++;
                if (string != '   ')
                    string += ', ';
                string += command.name;
                if (i % 7 == 0) {
                    string += ", ";
                    console.log(string);
                    i = 0;
                    string = '   ';
                }
            }
            if (string != '   ') {
                console.log(string);
            }
        }
        console.log('   :');
    }
    console.log('SET ...');
    var subcommand = split_line.shift();
    if (subcommand == undefined) {
        display_help();
        return;
    }
    var value = split_line.shift();
    if (value !== undefined) {
            var gotName = value;
        if (value.match(/^[-+]?[0-9]*\.?[0-9]*$/) !== null) {
            var gotNum = value;
            var gotFloat = parseFloat(value);
        }
    }
    else{
        console.log('PLEASE SUPPLY BOTH NAME AND VALUE.');
        console.log();
        display_help();
        return;
    }
    for (let command of commands) {
        if (command.name.startsWith(subcommand)) {
            command.destination();
            return;
        }
    }
        console.log(subcommand + ' ? ?');
        display_help();
    // Falls through to end
    function set_ioopt() {
        IOOPT = gotNum;
        console.log('IOOPT has been set to:', IOOPT);
    }
    function set_maxit() {
        MAXIT = gotNum;
        console.log('MAXIT has been set to: ', MAXIT);
    }
    function set_search() {
        if (gotNum < 1) gotNum = 1;
        WEAPON = gotNum;
        console.log('SEARCH - WEAPON has been set to:', WEAPON);
    }
    function set_eqnset() {
        if (gotNum < 1) gotNum = 1;
        NMERIT = gotNum;
        console.log('EQNSET - NMERIT has been set to:', NMERIT);
    }
    function set_fix_wt() {
        FIX_WT = gotFloat;
        console.log('FIX_WT has been set to', FIX_WT);
    }
    function set_con_wt() {
        CON_WT = gotFloat;
        console.log('CON_WT has been set to', CON_WT);
    }
    function set_zero_wt() {
        ZERO_WT = gotFloat;
        console.log('ZERO_WT has been set to', ZERO_WT);
    }
    function set_viol_wt() {
        VIOL_WT = gotFloat;
        console.log('VIOL_WT has been set to', VIOL_WT);
    }
    function set_mfn_wt() {
        MFN_WT = gotFloat;
        console.log('MFN_WT has been set to', MFN_WT);
    }
    function set_objmin() {
        OBJMIN = gotFloat;
        console.log('OBJMIN has been set to', OBJMIN);
    }
    function set_del() {
        DEL = gotFloat;
        console.log('DEL has been set to', DEL);
    }
    function set_delmin() {
        DELMIN = gotFloat;
        console.log('DELMIN has been set to', DELMIN);
    }
    /* label */
    function set_label() {
        var found = false;
        for (let label of design.labels) {
            if (label.name.startsWith(gotName)) {
                var gotText = split_line.join(" ");
                if (gotText.length != 0) {
                    found = true;
                    label.value = gotText;
                    console.log('LABEL ' + label.name + ' HAS BEEN SET TO "' + gotText + '"');
                    break;
                }
            }
        }
        if (!found) {
            console.log('PLEASE SUPPLY BOTH LABEL NAME AND VALUE.');
        }
    }
    /* screen */
    function set_screen() {
        console.log('SCREEN  will not be implemented.');
    }
    /* class */
    function set_class() {
        var classVal = split_line.shift();
        if (classVal !== undefined) {
            if (classVal.match(/^[-+]?[0-9]*\.?[0-9]*$/) !== null) {
                found = false;
                for (let i = 0; !found && i < design.design_parameters.length; i++) {
                    var dp = design.design_parameters[i];
                    if (dp.name.startsWith(gotName)) {
                        var found = true;
                        var gotFloat = parseFloat(classVal);
                        dp.ioclass = gotFloat;
                        console.log(dp.name + ' IOCLASS HAS BEEN SET TO ' + dp.ioclass);
                    }
                }
                for (let i = 0; !found && i < design.state_variables.length; i++) {
                    var sv = design.state_variables[i];
                    if (sv.name.startsWith(gotName)) {
                        found = true;
                        var gotFloat = parseFloat(classVal);
                        dp.ioclass = gotFloat;
                        console.log(sv.name + ' IOCLASS HAS BEEN SET TO ' + sv.ioclass);
                    }
                }
            }
            else {
                console.log('PLEASE SUPPLY NUMERIC VALUE FOR IO CLASS OF:', gotName);
                return;
            }
        }
        else{
            console.log('PLEASE SUPPLY BOTH IO CLASS NAME AND VALUE.');
            return;
        }
    }
}
module.exports = set;

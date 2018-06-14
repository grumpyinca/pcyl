const despak = require('./despak');

function display_independent() {
    for ( var property in design_parameters) {
        if (design_parameters.hasOwnProperty(property)) {
            console.log(property + ' = ' + design_parameters[property].value
                    + design_parameters[property].units);
        }
    }
}

function display_dependent() {
    for ( var property in state_variables) {
        if (state_variables.hasOwnProperty(property)) {
              console.log(property + ' = ' + state_variables[property].value
                      + state_variables[property].units);
        }
    }
}

function display_constants() {
    for ( var property in constants) {
        if (constants.hasOwnProperty(property)) {
              console.log(property + ' = ' + constants[property].value
                      + constants[property].units);
        }
    }
}

var commands = {
    all : function() {
        display_independent();
        display_dependent();
        display_constants();
    },
    independent : function() {
        display_independent();
    },
    dependent : function() {
        display_dependent();
    },
    'both_i&d' : function() {
        display_independent();
        display_dependent();
    },
    violations : function() {
        console.log('In VIOLATIONS');
    },
    design : function() {
        console.log('In DESIGN');
    },
    parameters : function() {
        console.log('In PARAMETERS');
    },
    state : function() {
        console.log('In STATE');
    },
    variables : function() {
        console.log('In VARIABLES');
    },
    constants : function() {
        display_constants();
    },
    satisfied : function() {
        console.log('In SATISFIED');
    },
    objective : function() {
        console.log('In OBJECTIVE');
    },
    levels : function() {
        console.log('In LEVELS');
    },
    fixed : function() {
        console.log('In FIXED');
    },
    label : function() {
        console.log('In LABEL');
    },
    internal : function() {
        console.log('In INTERNAL');
    }
};

function list(split_line) {
    var obj = despak();
    if (split_line[1] === undefined) {
        console.log("LIST:");
        console.log("ENTER MODIFIERS INDICATING OUTPUT DESIRED.");
        console.log("POSSIBLE MODIFIERS ARE:");
        i = 0;
        string = '';
        for ( var property in commands) {
            if (commands.hasOwnProperty(property)) {
                i++;
                string += property + ", ";
                if (i % 6 == 0) {console.log(string); i=0; string='';}
            }
        }
        if (string != '') {console.log(string);}
    } else {
        while ((subcommand = split_line.shift()) !== undefined) {
            var hits = false;
            for ( var property in commands) {
                if (commands.hasOwnProperty(property)) {
                    if (property.startsWith(subcommand)) {
                        commands[property]();
                        hits = true;
                        break;
                    }
                }
            }
            if (design_parameters[subcommand] !== undefined) {
                console.log(design_parameters[subcommand].value
                        + design_parameters[subcommand].units);
                hits = true;
            }
            if (state_variables[subcommand] !== undefined) {
                console.log(state_variables[subcommand].value
                        + state_variables[subcommand].units);
                hits = true;
            }
            if (constants[subcommand] !== undefined) {
                console.log(constants[subcommand].value
                        + constants[subcommand].units);
                hits = true;
            }
            if (!hits) {
                console.log(subcommand + ' ? ?')
            }
        }
    }
}

module.exports = list;


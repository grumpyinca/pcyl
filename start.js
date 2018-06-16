/**
 * START command - initializes primary system variables; reads startup file
 */

//const despak = require('./despak');
const count = require('./count');

function start(split_line) {

console.log("START:");
console.log("  The START command is not yet implemented.")

// design_parameters.radius.lmin = 2;
// state_variables.force.lmin = 2;
// state_variables.stress.lmin = -1;

count();
console.log('start: NFIXED, NSTF, NFDCL = ', NFIXED, NSTF, NFDCL);

}

module.exports = start;

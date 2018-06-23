"use strict";
/**
 * SAVE command - write current design into a file that can be read as a STARTUP file.
 * optionally, create a print listing
 */
//const eqnset1 = require('./eqnset1');

function save(split_line) {

console.log("SAVE:");
console.log("  The SAVE command is not yet implemented.")

var fs = require('fs');
var json = JSON.stringify(design);
fs.writeFile('jsondesign.json', json, 'utf8');

}

module.exports = save;

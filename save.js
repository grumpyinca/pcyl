"use strict";
/**
 * SAVE command - write current design into a file that can be read as a STARTUP
 * file. optionally, create a print listing
 */
var fs = require("fs");
var sprintf = require("sprintf-js").sprintf;
function save(split_line) {
    var cpname = 'CHECKPT';
    var name = split_line.shift();
    var comment = split_line.join(" ");
    console.log('SAVE ...');
    while (name === undefined) {
        console.log('SELECT:');
        console.log('         <enter> OR  0  TO  RETURN TO COMMAND LEVEL.');
        console.log('                     1  TO  WRITE ONE FILE  TO DISK IN');
        console.log('                            STARTUP (.DSN) FORMAT.');
        console.log('                     2  TO  WRITE TWO FILES TO DISK;');
        console.log('                            STARTUP (.DSN)  AND PRINTER (.PRN) FORMATS.');
        console.log('                     3  FOR IMMEDIATE OUTPUT TO PRINTER,');
        console.log('                            NOTHING TO DISK.');
        console.log(': ');
        var choice = '1';
        if (choice === undefined || choice < '1' || choice > '3')
            return;
        console.log('ENTER FILE NAME IN WHICH TO SAVE CURRENT STATUS');
        console.log(sprintf('(DEFAULT WILL USE  %s.DSN  &  %s.PRN).   : ', cpname, cpname));
        name = cpname;
        if (name === undefined) {
            console.log('SAVE ...');
        }
    }
    if (name !== undefined) {
        cpname = name.replace(/\.[^/.]+$/, "");
    }
    /* add code to start sequence to review available checkpoint names */
    if (comment !== undefined && comment != '') {
        design.labels.forEach(function(label) {
            if (label.name == 'COMMENT') {
                label.value = comment;
            }
        });
    }
    var rc = sfwriter(cpname);
    return;
    function sfwriter(cpname) {
        var dname = cpname + '.DSN';
        if (fs.existsSync(dname)) {
            console.log('%s ALREADY EXISTS ...', dname);
            console.log('OVER WRITE ?   (y/N): ');
            var yn = 'N';
            if (!'YES'.startsWith(yn))
                return;
        }
        var json = JSON.stringify(design, null, 4);
        try {
            fs.writeFileSync(dname, json, 'utf8');
        } catch (err) {
            console.log('err=' + err);
            console.log('*** ERROR IN FILE NAME ***');
            return;
        }
        if (IOOPT >= 3) {
            console.log(sprintf('%s IS COMPLETE', dname));
        }
        return 1;
    }
}
module.exports = save;

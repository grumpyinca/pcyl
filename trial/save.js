"use strict";
var fs = require("fs");
var sprintf = require("sprintf-js").sprintf;

function save(split_line) {
    var cpname = 'CHECKPT';
    var name = split_line.shift();
    var op = rl.question('ENTER CHOICE:', function(choice) {
        console.log('choicei=' + choice);
        if (choice === undefined || choice < '1' || choice > '3')
            return;
        console.log(sprintf('%s ENTERED', choice));
    });
}

module.exports = save;

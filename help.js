"use strict";
/**
 * HELP command - display pages from on-line documentation
 */
var fs = require('fs');
var sprintf = require("sprintf-js").sprintf;
function help(split_line) {
    /*
     * Implements direct access HELP file. Requires matched pair index file and
     * direct access formatted help file.
     * 
     * Note that other formulations are possible. Notably one that uses a byte
     * count of section titles, then superimposes that on top of PL/I's record
     * structure. This method was chosen because it seems to be able to simplify
     * (and speed up) the read process at a modest increase in complexity of the
     * file generation process.
     */
    var topics = [];
    fs.readdirSync('./help/').forEach(function(file) {
        topics.push(file.substring(0, file.length - 4).toUpperCase());
    });
    var topic = split_line.shift();
    if (topic === undefined) {
        console.log('AVAILABLE TOPICS INCLUDE:');
        var rec = '';
        for (var i = 0; i < topics.length; i++) {
            rec += sprintf('%18s', topics[i])
            if (i % 4 == 3) {
                console.log(rec);
                rec = '';
            }
        }
        if (rec != '')
            console.log(rec);
        console.log('FOR HELP ENTER:  HELP  <topic name>');
        console.log('                               WHERE  <topic name>  IS A TOPIC LISTED ABOVE.');
        console.log('                               example:   HELP COMMANDS');
        return;
    }
    var found = false;
    for (var i = 0; i < topics.length; i++) {
        if (topics[i].startsWith(topic)) {
            found = true;
            var filename = './help/' + topics[i] + ".TXT";
            console.log(fs.readFileSync(filename.toLowerCase(), 'utf8'));
        }
    }
    if (!found) {
        console.log(sprintf('NO HELP IS AVAILABLE FOR %s', topic));
    }
}
module.exports = help;

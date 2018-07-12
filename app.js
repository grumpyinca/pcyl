#!/usr/bin/env node
"use strict";
var change = require('./change');
var fix = require('./fix');
var free = require('./free');
var fs = require('fs');
var help = require('./help');
var intro = require('./intro');
var list = require('./list');
var readline = require('readline');
var report = require('./report');
var save = require('./save');
var seek = require('./seek');
var set = require('./set');
var search = require('./search');
var select = require('./select');
var sprintf = require("sprintf-js").sprintf;
var start = require('./start');
var trade = require('./trade');
var commands = [
    { name: 'CHANGE', destination: function(split_line) {
        change(split_line);
    }},
    { name: 'EXECUTE', destination: function(split_line) {
        console.log('EXECUTE:');
        var name = split_line.shift();
        if (name !== undefined) {
            name = name.replace(/\.[^/.]+$/, "");
            var filename = name + '.XEQ';
            if (fs.existsSync(filename)) {
                push_input(readline.createInterface({
                    input: fs.createReadStream(filename),
                    output: process.stdout,
                    prompt: DESIGN_NAME + ': '
                }));
            } else {
                console.log(sprintf('EXECUTE FILE: %s NOT AVAILABLE IN CURRENT DIRECTORY.', filename));
            }
        } else {
            console.log('ENTER NAME OF A .XEQ FILE TO EXECUTE :');
        }
    }},
    { name: 'FIX', destination: function(split_line) {
        fix(split_line);
    }},
    { name: 'FREE', destination: function(split_line) {
        free(split_line);
    }},
    { name: '?', destination: function(split_line) {
        help(split_line);
    }},
    { name: 'HELP', destination: function(split_line) {
        help(split_line);
    }},
    { name: 'LIST', destination: function(split_line) {
        list(split_line);
    }},
    { name: 'QUIT', destination: function(split_line) {
        pop_input();
    }},
    { name: 'REPORT', destination: function(split_line) {
        report(split_line);
    }},
    { name: 'SAVE', destination: function(split_line) {
        save(split_line);
    }},
    { name: 'SEARCH', destination: function(split_line) {
        search(split_line);
    }},
    { name: 'SEEK', destination: function(split_line) {
        seek(split_line);
    }},
    { name: 'SELECT', destination: function(split_line) {
        select(split_line);
    }},
    { name: 'SET', destination: function(split_line) {
        set(split_line);
    }},
    { name: 'START', destination: function(split_line) {
        start(split_line);
    }},
    { name: 'TRADE', destination: function(split_line) {
        trade(split_line);
    }},
    { name: '', destination: function(split_line) {
    	// no-op
    }}
];
var rlstack = [];
function push_input(rl) {
    if (rlstack.length > 0) {
        rlstack[rlstack.length-1].pause();
    }
    rlstack.push(rl)
    rl.prompt();
    rl.on('line', function(line) {
        var local_rl = rl;
        console.log(line.trim());
        if (line.substring(0,1) == '|') {
            console.log(line.substring(1));
        } else {
            var split_line = line.trim().toUpperCase().split(/ +/);
            var subcommand = split_line.shift();
            if (subcommand !== undefined && subcommand != '') {
                var found = false;
                for (let command of commands) {
                    if (command.name.startsWith(subcommand)) {
                        found = true;
                        command.destination(split_line);
                        break;
                    }
                }
                if (!found) {
                    console.log(line.trim() + ' ? ?');
                }
            }
        }
        if (!local_rl.input.isPaused()) {
            local_rl.prompt();
        }
    });
}
function pop_input() {
    if (rlstack.length-1 == 0) {
        console.log('QUITTING ...');
        process.exit(0);
    } else {
        rlstack[rlstack.length-1].close();
        rlstack.pop();
        rlstack[rlstack.length-1].resume();
    }
}
intro();
start([]);
push_input(readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: DESIGN_NAME + ': '
    })
);

#!/usr/bin/env node
"use strict";
var change = require('./change');
var execute = require('./execute');
var fix = require('./fix');
var free = require('./free');
var help = require('./help');
var intro = require('./intro');
var list = require('./list');
var readit = require('./readit');
var report = require('./report');
var save = require('./save');
var seek = require('./seek');
var set = require('./set');
var search = require('./search');
var select = require('./select');
var start = require('./start');
var trade = require('./trade');

intro();
start([]);

process.stdout.write(DESIGN_NAME + ': ');
while(true) {
    var split_line = readit();
    var command = split_line.shift();
    switch (command) {
        case 'CHANGE':
            change(split_line);
            break;
        case 'EXECUTE':
            execute(split_line);
            break;
        case 'FIX':
            fix(split_line);
            break;
        case 'FREE':
            free(split_line);
            break;
        case '?':
        case 'HELP':
            help(split_line);
            break;
        case 'LIST':
            list(split_line);
            break;
        case 'QUIT':
            console.log('QUITTING ...');
            process.exit(0);
            break;
        case 'REPORT':
            report(split_line);
            break;
        case 'SAVE':
            save(split_line);
            break;
        case 'SEARCH':
            search(split_line);
            break;
        case 'SEEK':
            seek(split_line);
            break;
        case 'SELECT':
            select(split_line);
            break;
        case 'SET':
            set(split_line);
            break;
        case 'START':
            start(split_line);
            break;
        case 'TRADE':
            trade(split_line);
            break;
        case '':
            break;
        default:
            console.log(command + ' ? ?');
            break;
    }
    process.stdout.write(DESIGN_NAME + ': ');
}
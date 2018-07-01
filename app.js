#!/usr/bin/env node
"use strict";
const readline = require('readline');
const intro = require('./intro');

const change = require('./change');
const execute = require('./execute');
const fix = require('./fix');
const free = require('./free');
const help = require('./help');
const list = require('./list');
const report = require('./report');
const save = require('./save');
const seek = require('./seek');
const set = require('./set');
const search = require('./search');
const select = require('./select');
const start = require('./start');
const trade = require('./trade');

const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: DESIGN_NAME + ': '
    });

var commands = [
    { name: 'CHANGE', destination: function(split_line) {
        change(split_line);
    }},
    { name: 'EXECUTE', destination: function(split_line) {
        execute(split_line);
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
        console.log('QUITTING ...');
        process.exit(0);
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
        //@@@ no=op
    }}
];

intro();
start([]);

rl.prompt();

rl.on('line', (line) => {
    console.log(line);
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
    rl.prompt();
}).on('close', () => {
    console.log('Exiting');
    process.exit(0);
});
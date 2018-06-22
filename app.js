"use strict";
const readline = require('readline');
const intro = require('./intro');
const design = require('./design');

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
      prompt: design_name + ': '
    });

intro();
start('');

rl.prompt();

rl.on('line', (line) => {
    console.log(line);
    if (line.substring(0,1) == '|') {
        console.log(line.substring(1));
    } else {
        var split_line = line.trim().toUpperCase().split(/ +/);
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
                console.log(line.trim() + ' ? ?');
                break;
        }
    }
    rl.prompt();
}).on('close', () => {
    console.log('Exiting');
    process.exit(0);
});
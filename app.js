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
      prompt: design_name + '>'
    });

intro();
start('');

rl.prompt();

rl.on('line', (line) => {
    var split_line = line.trim().toLowerCase().split(/ +/);
    var command = split_line.shift();
    switch (command) {
        case 'change':
            change(split_line);
            break;
        case 'execute':
            execute(split_line);
            break;
        case 'fix':
            fix(split_line);
            break;
        case 'free':
            free(split_line);
            break;
        case 'help':
            help(split_line);
            break;
        case 'list':
            list(split_line);
            break;
        case 'quit':
            console.log('Quitting ...');
            process.exit(0);
            break;
        case 'report':
            report(split_line);
            break;
        case 'save':
            save(split_line);
            break;
        case 'search':
            search(split_line);
            break;
        case 'seek':
            seek(split_line);
            break;
        case 'select':
            select(split_line);
            break;
        case 'set':
            set(split_line);
            break;
        case 'start':
            start(split_line);
            break;
        case 'trade':
            trade(split_line);
            break;
        case '?':
            help(split_line);
            break;
        case '':
            break;
        default:
            console.log(line.trim() + ' ? ?');
            break;
    }
    rl.prompt();
}).on('close', () => {
    console.log('Exiting');
    process.exit(0);
});
const readline = require('readline');
const intro = require('./intro');
const eqnset1 = require('./eqnset1');
const list = require('./list');

const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: 'PCyl> '
    });

intro();
rl.prompt();

rl.on('line', (line) => {
        var split_line = line.trim().split(" ");
          switch (split_line[0]) {
              case 'list':
                  list(split_line);
              break;
            case 'exit':
              console.log('Exiting');
              process.exit(0);
              break;
            case 'quit':
              console.log('Quitting ...');
              process.exit(0);
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
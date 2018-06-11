const readline = require('readline');
const intro = require('./intro');
const eqnset1 = require('./eqnset1');

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
                var hits = false;
                if (eqnset1.design_parameters[split_line[1]] !== undefined) {
                  console.log(design_parameters[split_line[1]].value + design_parameters[split_line[1]].units);
                  hits = true;
                }
                if (eqnset1.state_variables[split_line[1]] !== undefined) {
                  console.log(state_variables[split_line[1]].value + state_variables[split_line[1]].units);
                  hits = true;
                }
                if (!hits && split_line[1] !== undefined) {
                    console.log(split_line[1] + ' ? ?')
                }
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
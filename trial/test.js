var fs = require('fs');
var readline = require('readline');

function dispatch(line) {
    var words = line.trim().split(/ +/);
    var command = words.shift();
    switch (command) {
    case 'execute':
        var file_name = words.shift();
        if (file_name !== undefined) {
            console.log('executing ' + file_name);
            push_input(readline.createInterface({
                input : fs.createReadStream(file_name),
                output : process.stdout,
                prompt : file_name + ': '
            }));
        }
        break;
    default:
    case 'list':
        var variable_name = words.shift();
        if (variable_name !== undefined) {
            console.log('listing ' + variable_name);
        }
        break;
    case 'quit':
        console.log('quiting');
        pop_input();
        break;
    }
}

var rl_stack = [];

function push_input(rl) {
    if (rl_stack.length > 0) {
        rl_stack[rl_stack.length - 1].pause();
    }
    rl_stack.push(rl)
    rl.prompt();
    rl.on('line', function(line) {
        dispatch(line);
        if (!rl.input.isPaused()) {
            rl.prompt();
        }
    });
}

function pop_input() {
    if (rl_stack.length - 1 == 0) {
        process.exit(0);
    } else {
        rl_stack[rl_stack.length - 1].close();
        rl_stack.pop();
        rl_stack[rl_stack.length - 1].resume();
        rl_stack[rl_stack.length - 1].prompt();
    }
}

push_input(readline.createInterface({
    input : process.stdin,
    output : process.stdout,
    prompt : 'stdin: '
}));

var readlineSync = require('readline-sync');

readlineSync.setDefaultOptions({
    prompt : 'PCyl: '
});

while (true) {
    command = readlineSync.prompt();
    console.log("command=" + command);
    if (command == 'quit')
        process.exit(0);
}
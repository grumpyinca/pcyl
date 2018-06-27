"use strict";
var readline = require('readline');
var save = require('./save');

global.rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout,
});

//function readFilePromisified(filename) {
//    return new Promise(
//        function (resolve, reject) {
//            readFile(filename, { encoding: 'utf8' },
//                (error, data) => {
//                    if (error) {
//                        reject(error);
//                    } else {
//                        resolve(data);
//                    }
//                });
//        });
//}

function promptAndGetLine() {
    return new Promise(function(resolve, reject) {
        rl.question('PCyl: ', function(line) {
            console.log("line="+line);
            resolve(line);
        });
    });
}

async function main() {
    var line = await promptAndGetLine()
    console.log(line);
    if (line.substring(0, 1) == '|') {
        console.log(line.substring(1));
    } else {
        var split_line = line.trim().toUpperCase().split(/ +/);
        var command = split_line.shift();
        switch (command) {
        case 'SAVE':
            save(split_line);
            break;
        case 'QUIT':
            console.log('QUITTING ...');
            rl.close();
            process.stdin.destroy();
            process.exit(0);
            break;
        case '':
            break;
        default:
            console.log(line.trim() + ' ? ?');
            break;
        }
    }
}

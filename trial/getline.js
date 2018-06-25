function getline() {
    var fs = require('fs');
    const l = 128;
    const enc = 'utf-8';
    let buffer = Buffer.alloc(l);
    let count = 0;
    let result = '';
    let fd;
    if (process.platform === 'win32') {
        fd = process.stdin.fd;
    } else {
        fd = fs.openSync('/dev/stdin', 'rs');
    }
    try {
        count = fs.readSync(fd, buffer, 0, buffer.length);
    } catch (err) {
        console.log(err.toString());
    } finally {
        fs.closeSync(fd);
    }
    result = buffer.toString(enc, 0, count - 1);
    return result;
}
process.stdout.write('PCyl: ');
var line = getline();
console.log('line=' + line);

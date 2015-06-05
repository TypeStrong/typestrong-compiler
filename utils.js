/// <reference path="typings/tsd.d.ts"/>
var path = require('path');
var fs = require('fs');
function getRandomHex(length) {
    if (length === void 0) { length = 16; }
    var name = '';
    do {
        name += Math.round(Math.random() * Math.pow(16, 8)).toString(16);
    } while (name.length < length);
    return name.substr(0, length);
}
exports.getRandomHex = getRandomHex;
function getTempFile(prefix, dir, extension) {
    if (dir === void 0) { dir = ''; }
    if (extension === void 0) { extension = '.tmp.txt'; }
    prefix = (prefix ? prefix + '-' : '');
    var attempts = 100;
    do {
        var name = prefix + getRandomHex(8) + extension;
        var dest = path.join(dir, name);
        if (!fs.existsSync(dest)) {
            return dest;
        }
        attempts--;
    } while (attempts > 0);
    throw 'Cannot create temp file in ' + dir;
}
exports.getTempFile = getTempFile;
//# sourceMappingURL=utils.js.map
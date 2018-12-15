const fs = require('fs');

module.exports = function(dir) {
    return fs.readFileSync(dir + '/input.txt', 'utf-8');
}
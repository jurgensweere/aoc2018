const fs = require('fs');

module.exports = function(dir) {
    return fs.readFileSync(dir + '/test.txt', 'utf-8');
}
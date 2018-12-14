const fs = require('fs');

module.exports = function() {
    return fs.readFileSync('input.txt', 'utf-8');
}
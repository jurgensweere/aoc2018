let input = require('../shared/input')(__dirname)
    .split('\n');
let test = require('../shared/test')(__dirname)
    .split('\n');

// input = test;

input = input.map((l) => {
    return l.split('');
})

module.exports = input;
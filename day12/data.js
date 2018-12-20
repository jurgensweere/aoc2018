let input = require('../shared/input')(__dirname)
    .split('\n');
let test = require('../shared/test')(__dirname)
    .split('\n');

// input = test;

let initialState = /[\.\#]+/.exec(input[0])[0];
// initialState = initialState.replace(/#/g, '1')
// initialState = initialState.replace(/\./g, '0').split('').map(v => parseInt(v));
const notes = input.slice(2).map((v) => {
    let data = /(.*)\ =>\ (.*)/.exec(v)
    return {
        pattern: data[1],
        next: data[2]
    }
});

module.exports = {
    state: initialState,
    notes
};
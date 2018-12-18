const fs = require('fs');

let input = fs.readFileSync('./input.txt', 'utf8');
const output = input.split('\r\n').reduce((prev, curr) => {
    if (curr.substr(0,1) === '-') {
        return prev - parseInt(curr.substr(1), 10);
    } else {
        return prev + parseInt(curr.substr(1), 10);
    }
}, 0);

console.log(`Day 01 - Puzzle 1: ${output}`);
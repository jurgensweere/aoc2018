const fs = require('fs');

let input = fs.readFileSync('./input.txt', 'utf8');

const lowercase = `abcdefghijklmnopqrstuvwxyz`.split('');
const uppercase = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`.split('');

const reactions = lowercase.map((value, index) => {
    return value + uppercase[index];
}).concat(
    uppercase.map((value, index) => {
        return value + lowercase[index];
    })
);
const regExp = new RegExp(`(${reactions.join('|')})`, 'g');

let prevInput = '';
while(prevInput != input) {
    prevInput = input;
    input = input.replace(regExp, '');
}

console.log(`Polymer contains ${input.length} units`);
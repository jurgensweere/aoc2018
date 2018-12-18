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

let lengths = [];
lowercase.forEach((char, index) => {
    let prevInput = '';
    let currInput = input.replace(new RegExp(`(${char}|${uppercase[index]})`, 'g'), '');
    while(prevInput != currInput) {
        prevInput = currInput;
        currInput = currInput.replace(regExp, '');
    }
    lengths.push(currInput.length);
});

console.log(lengths.sort()[0]);
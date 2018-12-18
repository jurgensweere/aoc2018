const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8')
    .split('\r\n')
    .map((value) => {
        return value.split('');
    });

let checksum = input.reduce((prev, curr) => {
    let chars = Object.create(null);
    let doubles = [];
    let triples = [];
    curr.forEach(char => {
        chars[char] = chars[char] ? chars[char] + 1 : 1;
        if (chars[char] == 2) {
            doubles.push(char);
        } else if (chars[char] == 3) {
            if (doubles.indexOf(char) != -1) {
                doubles.splice(doubles.indexOf(char), 1);
            }
            triples.push(char);
        }
    });

    if (doubles.length) prev.double++;
    if (triples.length) prev.triple++;

    return prev;
}, { double: 0, triple: 0});

console.log(`Checksum = ${checksum.double * checksum.triple}`)
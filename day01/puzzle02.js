const fs = require('fs');

let input = fs.readFileSync('./input.txt', 'utf8');
let duplicate;
let outcomes = [];
let start = 0;

const frequencies = input.split('\r\n').map((value) => {
    return  (value.substr(0,1) === '-') ?
        0 - parseInt(value.substr(1), 10)
        :
        parseInt(value.substr(1), 10);
});

while(duplicate === undefined) {
    start = frequencies.reduce((prev, curr) => {
        // console.log(prev, curr);
        let result = prev + curr;
        
        if (outcomes.indexOf(result) != -1) {
            console.log('dupe!');
            duplicate = result;
            return;
        } else {
            outcomes.push(result);
        }
        return result;
    }, start);
}

console.log(`Day 01 - Puzzle 2: ${duplicate}`);
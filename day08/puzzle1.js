let input = require('../shared/input')(__dirname);

// input = '2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2';

let numbers = input.split(' ').map(v => parseInt(v, 10));
let metaData = [];

function interpretNode(numbers) {
    let numChildNodes = numbers.splice(0, 1);
    let numMetaData = numbers.splice(0, 1);

    
    for (let i = 0; i < numChildNodes; i++) {
        interpretNode(numbers);
    }
    metaData = metaData.concat(numbers.splice(0, numMetaData));
}

interpretNode(numbers);

console.log(metaData.reduce((p,c) => p + c));
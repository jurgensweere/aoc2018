let input = require('../shared/input')(__dirname);

// input = '2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2';

let numbers = input.split(' ').map(v => parseInt(v, 10));

function interpretNode(numbers) {
    let numChildNodes = numbers.splice(0, 1);
    let numMetaData = numbers.splice(0, 1);
    
    if (numChildNodes > 0) {
        let childNodeMetaData = [];
        for (let i = 0; i < numChildNodes; i++) {
            childNodeMetaData.push(interpretNode(numbers));
        }
        
        // Calculate my own meta data and return;
        // My meta data is index of childnode metadata to count
        return numbers.splice(0, numMetaData)
            .reduce((p,c) => p + (childNodeMetaData[c-1] ? childNodeMetaData[c-1] : 0), 0);
    } else {
        // No child nodes, we return the meta data value
        return numbers.splice(0, numMetaData).reduce((p,c) => p + c);
    }
    
}

let lol = interpretNode(numbers);

console.log(lol);
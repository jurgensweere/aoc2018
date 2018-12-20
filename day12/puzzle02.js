let input = require('./data');

let state = `...${input.state}...`;
let zeroIndex = 3;
const generations = 200; // after 140 ish it becomes linear
console.log(`${state} - 0`);

function indexesOf(s, pattern) {
    let indeces = [];
    let p = 0;
    while (s.indexOf(pattern, p) != -1) {
        let index = s.indexOf(pattern, p);
        indeces.push(index + 2);
        p = index + 1;
    }
    return indeces;
}

function replaceAt(s, i, r) {
    return s.substr(0, i) + r + s.substr(i + 1);
}

function sumPlants(s) {
    let p = 0;
    let sum = 0;
    while (s.indexOf('#', p) != -1) {
        let index = s.indexOf('#', p);
        sum += index - zeroIndex;
        p = index + 1;
    }
    return sum;
}

let prevSum = 0;
let sum = 0;
for (let g = 1; g <= generations; g++) {
    prevSum = sumPlants(state);

    let newState = state;
    input.notes.forEach((note) => {
        indexesOf(state, note.pattern).forEach((i) => {
            newState = replaceAt(newState, i, note.next);
        })
    })
    state = newState;
    if (state.indexOf('#') < 2) {
        state = '.' + state;
        zeroIndex++;
    }
    if (state.indexOf('#', state.length - 3) != -1) {
        state = state + '.';
    }
    sum = sumPlants(state);
}

let pots = sum + (50000000000 - generations) * (sum-prevSum);

console.log(`My pots are maybe ${pots}`);
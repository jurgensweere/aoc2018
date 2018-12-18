var _ = require('lodash');

let input = require('./data.js');

function startingPoints(input) {
    return Object.keys(input).reduce((p,c) => input[c].deps.length ? p : p.concat(c), []);
}

function hasUntracedDeps(char) {
    return input[char].deps.reduce((p,c) => input[c].traced ? p : true, false);
}

function assignWorkers() {
    // no worker available
    if (Object.keys(workers).length == totalWorkers) return;

    // no letter available
    let lettersNotWorkedOn = _.difference(available, Object.keys(workers));
    if (lettersNotWorkedOn.length == 0) return;

    while (Object.keys(workers).length <= totalWorkers && lettersNotWorkedOn.length > 0) {
        workers[lettersNotWorkedOn.splice(0, 1)] = 0;
    }
}

function doWork() {
    Object.keys(workers).forEach((key) => {
        workers[key]++;
    });

    const lettersFinished = Object.keys(workers).filter(key => workers[key] >= secondsRequired(key))
    
    lettersFinished.forEach((char) => {
        // work is done.
        str = str + char;
        available.splice(available.indexOf(char), 1);
        unlock(char);
        delete workers[char];
    });
}

function unlock(char) {
    input[char].traced = true;
    input[char].next.forEach((v) => {
        if (!hasUntracedDeps(v)) {
            available.push(v);
        }
    });
    available.sort();
}

function secondsRequired(char) {
    return `ABCDEFGHIJKLMNOPQRSTUVWXYZ`.split('').indexOf(char) + 61;
}

let str = '';
let seconds = 0;
let workers = {};
const totalWorkers = 5;
let available = startingPoints(input).sort();
while(available.length > 0) {
    // assign an available worker to an available letter
    assignWorkers();

    doWork();

    seconds++;
}
console.log(workers);
console.log(str)
console.log(`Tracing took ${seconds}s`);
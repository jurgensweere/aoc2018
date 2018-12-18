let input = require('./data.js');

function startingPoints(input) {
    return Object.keys(input).reduce((p,c) => input[c].deps.length ? p : p.concat(c), []);
}

function trace(char) {
    input[char].traced = true;
    input[char].next.forEach((v) => {
        if (!hasUntracedDeps(v)) {
            available.push(v);
        }
    });
    available.sort();
}

function hasUntracedDeps(char) {
    return input[char].deps.reduce((p,c) => input[c].traced ? p : true, false);
}

let available = startingPoints(input).sort();

let str = '';
while(available.length > 0) {
    let c = available.splice(0, 1);
    str += c;
    trace(c);
}

console.log(str);
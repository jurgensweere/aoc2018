const fs = require('fs');

let input = fs.readFileSync('./input.txt', 'utf8')
    .split('\r\n')
    .map((l) => {
        const data = /Step\ (\w)\ must\ be\ finished\ before\ step\ (\w)\ can\ begin\./.exec(l);
        return {
            id: data[1],
            next: data[2]
        }
    })
    .reduce((p,c) => {
        if (!p[c.id]) {
            p[c.id] = { next: [], deps: [], traced: false };
        }
        if (!p[c.next]) {
            p[c.next] = { next: [], deps: [], traced: false };
        }
        p[c.next].deps.push(c.id);
        p[c.id].next.push(c.next);
        p[c.next].deps.sort();
        p[c.id].next.sort();
        return p;
    }, {});

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
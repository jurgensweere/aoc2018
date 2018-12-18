let input = require('../shared/input')(__dirname)
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

module.exports = input;
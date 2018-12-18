const fs = require('fs');

let input = fs.readFileSync('./input.txt', 'utf8')
    .split('\r\n')
    .map((line) => {
        // #1 @ 179,662: 16x27
        const data = /\#(\d+)\ @\ (\d+),(\d+):\s(\d+)x(\d+)/.exec(line);
        return {
            id: data[1],
            x: parseInt(data[2], 10),
            y: parseInt(data[3], 10),
            vx: parseInt(data[4], 10),
            vy: parseInt(data[5], 10)
        }
    });

let fabric = {}

function plot(data) {
    for (let x = data.x; x < data.x + data.vx; x++) {
        for(let y = data.y; y < data.y + data.vy; y++) {
            plotPixel(x, y);
        }
    }
}

function plotPixel(x, y) {
    if (!fabric[x]) {
        fabric[x] = {};
    }
    if (!fabric[x][y]) {
        fabric[x][y] = 0;
    }
    fabric[x][y]++;
}

input.forEach(plot);

let overlap = Object.values(fabric).reduce((prev, curr) => {
    return Object.values(curr).reduce((p, c) => {
        if (c > 1) p++
        return p;
    }, prev);
}, 0);

console.log(overlap);
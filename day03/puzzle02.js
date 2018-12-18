const fs = require('fs');

let input = fs.readFileSync('./input.txt', 'utf8')
    .split('\r\n')
    .map((line) => {
        // #1 @ 179,662: 16x27
        const data = /\#(\d+)\ @\ (\d+),(\d+):\s(\d+)x(\d+)/.exec(line);
        return {
            id: parseInt(data[1], 10),
            x: parseInt(data[2], 10),
            y: parseInt(data[3], 10),
            vx: parseInt(data[4], 10),
            vy: parseInt(data[5], 10)
        }
    });

let fabric = {}
let overlap = [];

function plot(data) {
    for (let x = data.x; x < data.x + data.vx; x++) {
        for (let y = data.y; y < data.y + data.vy; y++) {
            plotPixel(data.id, x, y);
        }
    }
}

function plotPixel(id, x, y) {
    if (!fabric[x]) {
        fabric[x] = {};
    }
    if (!fabric[x][y]) {
        fabric[x][y] = [];
    } else {
        fabric[x][y].forEach(value => {
            if (overlap.indexOf(value) === -1) overlap.push(value);
        })
        if (overlap.indexOf(id) === -1) overlap.push(id);
    }
    fabric[x][y].push(id);
}

input.forEach(plot);

input.forEach(val => {
    if (overlap.indexOf(val.id) === -1) console.log(`have not seen ${val.id}`);
})
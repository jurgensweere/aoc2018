const fs = require('fs');

const letters = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`.split('');
const invletters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`.split('');

let input = fs.readFileSync('./input.txt', 'utf8')
    .split('\r\n')
    .map((line, index) => {
        const data = /(\d+),\s(\d+)/.exec(line);
        return {
            id: index,
            char: letters[index],
            x: parseInt(data[1], 10),
            y: parseInt(data[2], 10)
        }
    });

// get grid size
let xmax = input.slice().sort((a, b) => {
    if (a.x > b.x) return -1;
    if (a.x < b.x) return 1;
    return 0;
})[0].x;
let ymax = input.slice().sort((a, b) => {
    if (a.y > b.y) return -1;
    if (a.y < b.y) return 1;
    return 0;
})[0].y;

// Plot empty grid
let grid = Array(xmax + 1).fill().map(() => Array(ymax + 1).fill('.'));
let ids = input.reduce((p,c) => {
    p[c.id] = 0;
    return p;
}, {});

// Plot start
input.forEach((val, index) => {
    grid[val.x][val.y] = invletters[index];
});

function calcDistance(x, y) {
    return (point) => {
        point.dist = Math.abs(point.x - x) + Math.abs(point.y - y);
        return point;
    }
}

for (let ix = 0; ix < grid.length; ix++) {
    for (let iy = 0; iy < grid[ix].length; iy++) {
        let dist = input.map(calcDistance(ix, iy))
            .sort((a, b) => {
                if (a.dist > b.dist) return 1;
                if (a.dist < b.dist) return -1;
                return 0;
            });
        if (dist[0].dist > 0 && dist[0].dist != dist[1].dist) {
            grid[ix][iy] = dist[0];
            ids[dist[0].id] ++;
        }
    }
}

// ignore all letters that are on the edge
for (let i = 0; i <= xmax; i++) {
    delete ids[grid[i][0].id];
    delete ids[grid[i][ymax].id];
    grid[i][0] = '#';
    grid[i][ymax] = '#';
}
for (let i = 0; i <= ymax; i++) {
    delete ids[grid[0][i].id];
    delete ids[grid[xmax][i].id];
    grid[0][i] = '#';
    grid[xmax][i] = '#';
}

console.log('Largest size: ' + (Math.max(...Object.values(ids)) + 1));

/*
function writeToFile(grid) {
    let gridStr = grid.reduce((prev, curr) => {
        return prev + curr.reduce((p,c) => p + (c.char ? c.char : c ), '') + '\n';
    }, '');

    fs.writeFileSync('./output.txt', gridStr);
}

writeToFile(grid);
*/
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

let regionSize = 0;
for (let ix = 0; ix < grid.length; ix++) {
    for (let iy = 0; iy < grid[ix].length; iy++) {
        let totaldist = input.map(calcDistance(ix, iy))
            .reduce((p,c) => {
                return p + c.dist
            }, 0);
        if (totaldist < 10000) {
            grid[ix][iy] = {
                char: grid[ix][iy] == '.' ? '#' : grid[ix][iy] ,
                dist: totaldist
            }
            // some counting here.
            regionSize++;
        }
    }
}

function writeToFile(grid) {
    let gridStr = grid.reduce((prev, curr) => {
        return prev + curr.reduce((p,c) => p + (c.char ? c.char : c ), '') + '\n';
    }, '');

    fs.writeFileSync('./output.txt', gridStr);
}

writeToFile(grid);


console.log(`The size below 10000 is: ${regionSize}`);
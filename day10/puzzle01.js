const fs = require('fs');
const _ = require('lodash');
let input = require('./data');

function move() {
    input = input.map((v) => {
        v.position = [v.position[0] + v.velocity[0], v.position[1] + v.velocity[1]];
        return v;
    })
}

function checkSize(input, frame) {
    let xmax = xmin = ymax = ymin = undefined;
    input.forEach((v) => {
        if (xmax ===undefined || v.position[0] > xmax) xmax = v.position[0];
        if (xmin ===undefined || v.position[0] < xmin) xmin = v.position[0];
        if (ymax ===undefined || v.position[1] > ymax) ymax = v.position[1];
        if (ymin ===undefined || v.position[1] < ymin) ymin = v.position[1];
    });

    if (xmax - xmin <= maxSize || ymax - ymin <= maxSize) {
        somethingFound = true;

        let vx = xmin;
        let vy = ymin;

        let grid = Array(ymax - ymin + 1).fill().map(() => Array(xmax - xmin + 1).fill('.'));
        // draw stuffs
        input.forEach((p) => {
            grid[p.position[1] - vy][p.position[0] - vx] = '#';
        });
        writeToFile(grid, frame);
    } else if (somethingFound) {
        keepSearching = false;
    }

}

function writeToFile(grid, frame) {
    let gridStr = grid.reduce((prev, curr) => {
        return prev + curr.reduce((p,c) => p + c, '') + '\n';
    }, '');

    fs.writeFileSync(`${__dirname}/f${frame}.txt`, gridStr);
}

const maxSize = 15;
let frame = 0;
let keepSearching = true;
let somethingFound = false;
while (keepSearching) {
    checkSize(input, frame);
    move();
    frame++;
}



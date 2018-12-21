let fs = require('fs');
let grid = require('./data');

// Carts ( v > < ^ ) move one at a time, top left to bottom right
// intersections, turn left straight right per cart.

// Where is the first crash?

// Find carts and remember them
let carts = [];
function createCart(char, x, y) {
    let vx = 0;
    let vy = 0;
    switch (char) {
        case 'v':
            vy = 1;
            grid[y][x] = '|';
            break;
        case '>':
            vx = 1;
            grid[y][x] = '-';
            break;
        case '<':
            vx = -1;
            grid[y][x] = '-';
            break;
        case '^':
            vy = -1;
            grid[y][x] = '|';
        default:
            break;
    }
    carts.push({
        x,
        y,
        vx,
        vy,
        t: 0
    });
}

grid.forEach((l, y) => {
    l.forEach((c, x) => {
        if (/[v><\^]/.test(c)) {
            createCart(c, x, y)
        }
    })
});

function sortCarts() {
    carts.sort((a, b) => {
        if (a.y > b.y) { return 1; }
        else if (a.y < b.y) { return -1;} 
        else {
            if (a.x > b.x) { return 1; }
            else if (a.x < b.x) { return -1;}
            else { return 0; }
        }
    });
}

function moveCart(cart) {
    cart.x += cart.vx;
    cart.y += cart.vy;
    let vx = cart.vx;
    let vy = cart.vy;
    // Where are we now? do we need to rotate?
    // console.log(grid[cart.x][cart.y]);
    switch(grid[cart.y][cart.x]) {
        case '/':
            // corner, rotate 90
            cart.vx = -vy;
            cart.vy = -vx;
            break;
        case '\\':
            cart.vx = vy;
            cart.vy = vx;
            break;
        case '+':
            // Rotation magic
            if (cart.t === 0) {
                // turn left
                cart.vx = vy;
                cart.vy = -vx;
            } else if (cart.t === 2) {
                // turn right
                cart.vx = -vy;
                cart.vy = vx;
            }
            cart.t ++;
            if (cart.t > 2) cart.t =0;
            break;
        case '-':
        case '|':
        default:
            // Keep going straight
            break;
    }
    // did we crash?
    if (hasCrash(cart.x, cart.y)) {
        // remove the two
        carts = carts.filter(c => c.x != cart.x || c.y != cart.y);
    }
}

function hasCrash(x, y) {
    return carts.filter(c => c.x == x && c.y == y).length > 1;
}

function printGrid(tick) {
    let g = grid.map(a => a.slice());
    carts.forEach((c) => {
        if (c.vy == 1) g[c.y][c.x] = 'v';
        if (c.vx == 1) g[c.y][c.x] = '>';
        if (c.vx == -1) g[c.y][c.x] = '<';
        if (c.vy == -1) g[c.y][c.x] = '^';    
    });
    // g.forEach(l => console.log(l.join('')));
    let str = '';
    g.forEach(l => str += l.join('') + '\n');

    fs.writeFileSync(`${__dirname}/t${tick}.txt`, str);
}

let crashed = false;
let crashSite = [];
let tick = 0;
while (carts.length > 1) {

    // sort the carts, so the order of movement is correct
    sortCarts();
    // Move each cart
    for (let i = 0; i < carts.length; i++) {
        moveCart(carts[i]);
    }

    // printGrid(tick);
    tick++;
}

console.log(`Last cart is at ${carts[0].x},${carts[0].y} @ ${tick}`);
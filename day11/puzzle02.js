const input = 9995;
//const input = 18;

// make the grid
let grid = Array(300).fill().map(() => Array(300).fill(0));

// calculate power levels
for (let x = 1; x <= grid.length; x++) {
    for (let y = 1; y <= grid[x-1].length; y++) {
        // Find the fuel cell's rack ID, which is its X coordinate plus 10.
        const rackId = x + 10;
        // Begin with a power level of the rack ID times the Y coordinate.
        let power = rackId * y;
        // Increase the power level by the value of the grid serial number (your puzzle input).
        power += input;
        // Set the power level to itself multiplied by the rack ID.
        power *= rackId
        // Keep only the hundreds digit of the power level (so 12345 becomes 3; numbers with no hundreds digit become 0).
        power = parseInt(('' + power).substr(('' + power).length - 3, 1));
        // Subtract 5 from the power level.
        power -= 5;

        grid[x-1][y-1] = power;
    }    
}

// find
let largestPower = 0;
let winningcell = [];
let winningsize = 1;
for (let s = 1; s <= 300; s++) {
    for (let x = 1; x < grid.length - s; x++) {
        for (let y = 1; y < grid[x-1].length - s; y++) {
            // calculate s x s

            let power = 0;
            for(let px = x - 1; px < x - 1 + s; px++) {
                for(let py = y - 1; py < y - 1 + s; py++) {
                    power += grid[px][py];
                }
            }

            if (power > largestPower) {
                largestPower = power;
                winningcell = [x,y];
                winningsize = s;
            }
        }
    }
}
console.log(`largest power is at ${winningcell[0]},${winningcell[1]},${winningsize}`);
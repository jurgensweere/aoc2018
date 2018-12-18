// Confident that your list of box IDs is complete, you're ready to find the boxes full of prototype fabric.

// The boxes will have IDs which differ by exactly one character at the same position in both strings. For example, given the following box IDs:

// abcde
// fghij
// klmno
// pqrst
// fguij
// axcye
// wvxyz
// The IDs abcde and axcye are close, but they differ by two characters (the second and fourth). However, the IDs fghij and fguij differ by exactly one character, the third (h and u). Those must be the correct boxes.

// What letters are common between the two correct box IDs? (In the example above, this is found by removing the differing character from either ID, producing fgij.)


const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8')
    .split('\r\n')
    .map((value) => {
        return value.split('');
    });

function compareBoxes(boxA, boxB) {
    let faultTolerance = 1;
    let fault;
    for (let index = 0; index < boxA.length; index++) {
        if (boxA[index] !== boxB[index]) {
            faultTolerance--;
            fault = index;
        }
        if (faultTolerance < 0) return false;
    }
    boxA.splice(fault, 1);
    return boxA.join('');
}

input.forEach((box, index) => {
    for (let i = index + 1; i < input.length; i++) {
        let compare = compareBoxes(box, input[i]);
        if (compare) {
            console.log(`Common letters: ${compare}`);
            return;
        }
    }
})
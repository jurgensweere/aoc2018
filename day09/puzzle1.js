const puzzleData = require('./data.js');

function playGame(numPlayers,lastMarbleVal) {
    let marbles = [0];
    let currentMarble = 0;
    let marbleToPlace = 1;
    let currentPlayer = 0;
    let playerScores = new Array(numPlayers).fill(0);
    
    for (marbleToPlace; marbleToPlace <= lastMarbleVal; marbleToPlace++) {
        if (marbleToPlace % 23 == 0) {
            // we add this marble to the score
            playerScores[currentPlayer] += marbleToPlace;
            // we take marble 7 to the left also, the marble in that position becomes current marble
            let takeMarbleIndex = marbles.indexOf(currentMarble) - 7;
            if (takeMarbleIndex < 0) {
                takeMarbleIndex += marbles.length;
            }
            playerScores[currentPlayer] += parseInt(marbles.splice(takeMarbleIndex, 1), 10);
            currentMarble = marbles[takeMarbleIndex];
        } else {
            // We need to place the marble 2 to the right of the current marble
            let newMarbleIndex = marbles.indexOf(currentMarble) + 2;
            if (newMarbleIndex > marbles.length) {
                newMarbleIndex -= marbles.length;
            }
            marbles.splice(newMarbleIndex, 0, marbleToPlace);
            currentMarble = marbleToPlace;
        }
    
        currentPlayer++;
        if (currentPlayer >= numPlayers) {
            currentPlayer -= numPlayers;
        }
    }

    return playerScores.sort().reverse()[0];
}

console.log(`9 players; last marble is worth 25 points: ${playGame(9, 25)}`);
console.log(`10 players; last marble is worth 1618 points: ${playGame(10, 1618)}`);
console.log(`13 players; last marble is worth 7999 points: ${playGame(13, 7999)}`);
console.log(`17 players; last marble is worth 1104 points: ${playGame(17, 1104)}`);
console.log(`21 players; last marble is worth 6111 points: ${playGame(21, 6111)}`);
console.log(`30 players; last marble is worth 5807 points: ${playGame(30, 5807)}`);

console.log(`${puzzleData.numPlayers} players; last marble is worth ${puzzleData.lastMarbleVal} points: ${playGame(puzzleData.numPlayers, puzzleData.lastMarbleVal)}`);

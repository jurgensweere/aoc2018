let input = require('../shared/input')(__dirname);

const data = /(\d+)[^\d]+(\d+)/.exec(input);
const numPlayers = parseInt(data[1]);
const lastMarbleVal = parseInt(data[2]);

console.log(`
    #players = ${numPlayers}
    last marble value = ${lastMarbleVal}
`);

module.exports = {
    numPlayers,
    lastMarbleVal
}
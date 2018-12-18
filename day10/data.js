let input = require('../shared/input')(__dirname)
    .split('\r\n')
    .map((l) => {
        let data = /\<\s?([^,]+),\s([^>]+)\>.*\<([^,]+),\s([^>]+)\>/.exec(l);
        return {
            position: [parseInt(data[1]), parseInt(data[2])],
            velocity: [parseInt(data[3]), parseInt(data[4])]
        }
    })

module.exports = input;
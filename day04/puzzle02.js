const fs = require('fs');

let input = fs.readFileSync('./input.txt', 'utf8')
    .split('\r\n')
    .sort()
    .map((line) => {
        const data = /\[(\d+\-\d+\-\d+)\s(\d+):(\d+)\]\s(.*)/.exec(line);
        return {
            date: data[1],
            hour: parseInt(data[2], 10),
            minute: parseInt(data[3], 10),
            action: data[4]
        }
    });

let guard = 0;
let sleepstart;
let guards = {};
for (let i = 0; i < input.length; i++) {
    if (input[i].action.indexOf('#') != -1) {
        guard = /\#(\d+)/.exec(input[i].action)[1];

        if (!guards[guard]) {
            guards[guard] = { id: parseInt(guard, 10), schedule: new Array(60).fill(0), total: 0 };
        }
    } else if (input[i].action.indexOf('falls asleep') != -1) {
        sleepstart = input[i].minute;
    } else {
        sleepend = input[i].minute;
        for (let j = sleepstart; j < sleepend; j++) {
            guards[guard].schedule[j]++;
            guards[guard].total++;
        }
        sleepstart = undefined;
    }
}

// find sleepy minutes
let sleepyGuard = Object.values(guards).map((g) => {
    let mostSleptMinute = g.schedule.reduce((prev, curr, index, arr) => {
        return arr[prev] < curr ? index : prev;
    }, 0)
    return {
        id: g.id,
        minute: mostSleptMinute,
        count: g.schedule[mostSleptMinute]
    }
}).sort((a, b) => {
    if (a.count < b.count) { return 1 }
    if (a.count > b.count) { return -1 }
    return 0;
})[0];


console.log(`Guard with most sleepy minute = ${sleepyGuard.id}. Slept most in minute: ${sleepyGuard.minute} (${sleepyGuard.count}).`);
console.log(`Answer = ${sleepyGuard.id * sleepyGuard.minute}`);
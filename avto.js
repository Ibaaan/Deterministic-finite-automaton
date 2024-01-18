function buildTransitionTable(pattern) {
    const m = pattern.length;
    const alphabet = {};

    for (let i = 0; i < m; i++) {
        alphabet[pattern.charAt(i)] = 0;
    }

    const transitionTable = Array.from({ length: m + 1 }, () => ({}));

    for (const char in alphabet) {
        transitionTable[0][char] = 0;
    }

    for (let j = 0; j < m; j++) {
        const prev = transitionTable[j][pattern.charAt(j)];
        transitionTable[j][pattern.charAt(j)] = j + 1;
        for (const char in alphabet) {
            transitionTable[j + 1][char] = transitionTable[prev][char];
        }
    }

    return { transitionTable, alphabet };
}

function patternMatching(text, pattern) {
    const { transitionTable, alphabet } = buildTransitionTable(pattern);

    const n = text.length;
    let state = 0;
    const result = [];

    for (let i = 0; i < n; i++) {
        state = text.charAt(i) in alphabet ? transitionTable[state][text.charAt(i)] : 0;

        if (state === pattern.length) {
            result.push(i);
        }
    }

    return result;
}

let fs = require('fs');
let str = fs.readFileSync("input.txt").toString().split(" ");

let text = str[0];
let pattern = str[1];
const matches = patternMatching(text, pattern);
fs.writeFileSync("output.txt", matches[0].toString());
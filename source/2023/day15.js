const fs = require('fs');

const input = fs.readFileSync('./input/day15-1.txt','utf8');

const hash = input.split(',').reduce((curren_value, code) => curren_value + hash_algorithm(code), 0)

console.log(hash);

function hash_algorithm(code) {
    let res = 0
    for (let char of code) {
        res = ((res + char.charCodeAt(0)) * 17) % 256
    }
    return res
}
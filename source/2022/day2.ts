const file = Bun.file('./input/day2.txt');
const input = await file.text();

// Part 1
// A X : rock     1
// B Y : paper    2 
// C Z : scissors 3 

const [loss, draw, win] = [0, 3, 6]
const plays = {
    'X': 1,
    'Y': 2,
    'Z': 3,
}
const posibilities = {
    A: {
        X: draw,
        Y: win,
        Z: loss
    },
    B: {
        X: loss,
        Y: draw,
        Z: win
    },
    C: {
        X: win,
        Y: loss,
        Z: draw
    }
}

const rounds = input.split('\n').slice(0, -1).map(r => r.split(' '))

const score = rounds.map(([play, response]) => {
    return posibilities[play][response] + plays[response]
}).reduce((a, b) => a + b, 0)

console.log('score', score)

// Part 2 
// A : rock     1
// B : paper    2 
// C : scissors 3 
//
// X : lose
// Y : draw
// Z : win

const results = {
    'X': loss,
    'Y': draw,
    'Z': win,
}
const new_plays = {
    'A': 1,
    'B': 2,
    'C': 3
}
const new_posibilities = {
    A: {
        X: 'C',
        Y: 'A',
        Z: 'B'
    },
    B: {
        X: 'A',
        Y: 'B',
        Z: 'C'
    },
    C: {
        X: 'B',
        Y: 'C',
        Z: 'A'
    }
}
const new_score = rounds.map(([play, result]) => {
    return results[result] + new_plays[new_posibilities[play][result]]
}).reduce((a, b) => a + b, 0)

console.log('total', new_score)




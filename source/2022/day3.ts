const file = Bun.file('./input/day3.txt');
const input = await file.text();

const sacks = input.split('\n').slice(0, -1)

const abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

// Part 1

const priorities = sacks.map(s => {
    const middle = s.length / 2
    const first = new Set(s.substring(0, middle).split(''))
    const seccond = new Set(s.substring(middle).split(''))

    const sharedItem = first.intersection(seccond)

    return abc.indexOf([...sharedItem][0]) + 1
})

// Sum of priorities
const sum = priorities.reduce((a, b) => a + b, 0)
console.log('Part 1:', sum)

// Part 2
const members = 3
const groups = new Array(sacks.length / members) .fill('')
    .map(_ => sacks.splice(0, members))

const new_priorities = groups.map(group => {

    const a = new Set(group[0].split(''))
    const b = new Set(group[1].split(''))
    const c = new Set(group[2].split(''))

    const badge = a.intersection(b).intersection(c)
    
    return abc.indexOf([...badge][0]) + 1
})

const new_sum = new_priorities.reduce((a, b) => a + b, 0)
console.log('Part 2:', new_sum)





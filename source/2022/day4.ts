const file = Bun.file('./input/day4.txt');
const input = await file.text();


const pairs = input.split('\n').slice(0, -1).map(pair => {
    const [first, seccond] = pair.split(',')
    return [
        first.split('-').map(id => Number(id)), 
        seccond.split('-').map(id => Number(id))
    ]
})

// Part 1

const contains = pairs.filter(([first, seccond]) => {
    const min = first[0] - seccond[0]
    const max = first[1] - seccond[1]
    return (min <= 0 && max >= 0) || (min >= 0 && max <= 0)
})

// pairs which contain each other
console.log('Part 1:', contains.length)

// Part 2
const overlaps = pairs.filter(([first, seccond]) => {
    return (first[1] >= seccond[0] && first[1] <= seccond[1]) ||
        (first[0] >= seccond[0] && first[0] <= seccond[1]) ||
        (first[0] <= seccond[0] && first[1] >= seccond[1])
})

console.log('Part 2:', overlaps.length)

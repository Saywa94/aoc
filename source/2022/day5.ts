const file = Bun.file('./input/day5.txt');
const input = await file.text();

const [startingConfig, instructions] = input.split('\n\n')

// Part 1

// Parse stacks
const rows = startingConfig.split('\n').slice(0, -1).map(row => {
    return row.match(/.{1,4}/g)
}).reverse()

// Convert rows to columns
const stacks = []
for (let i = 0; i  < rows[0]!.length; i ++) {
   stacks.push(rows.map(row => row![i].trim()).filter(c => c !== '')) 
}

const stacksCopy = JSON.parse(JSON.stringify(stacks))

// Apply instructions
for (const instruction of instructions.split('\n').slice(0, -1)) {
    const {quantity, from, to} = parseInstruction(instruction)
    for (let i = 0; i < quantity; i++) {
        const item = stacks[from - 1].pop()
        stacks[to - 1].push(item!)
    }
}

// Get top crates
const topCrates = stacks.map(stack => stack.at(-1)!.slice(1, 2)).join('')
console.log(topCrates)


// Part 2

// Apply instructions moving the required quantity all at once
for (const instruction of instructions.split('\n').slice(0, -1)) {
    const {quantity, from, to} = parseInstruction(instruction)
    const items = stacksCopy[from - 1].splice(-quantity)
    stacksCopy[to - 1].push(...items)
}

// Get new top crates
const newTopCrates = stacksCopy.map((stack: string[]) => stack.length === 0 ? '' : stack.at(-1)!.slice(1, 2)).join('')
console.log(newTopCrates)




function parseInstruction(instruction: string) {
    const [_, quantity, from, to] = instruction.match(/move (\d+) from (\d+) to (\d+)/)
    return {quantity: Number(quantity), from: Number(from), to: Number(to)}
}

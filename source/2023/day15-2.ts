const path = './input/day15-1.txt';
const file = Bun.file(path);
const input = await file.text();

const BOXES: { [index: string]: string[] } = {};

// Fill the boxes with corresponding lenses
for (const step of input.split(',')) {
    // Remove lens
    if (step.includes('-')) {
        const label = step.split('-')[0];
        const box = `BOX ${String(hash_algorithm(label))}`;

        if (BOXES[box] !== undefined && BOXES[box].length > 0) {
            BOXES[box] = BOXES[box].filter((item) => !item.includes(label));
            if (BOXES[box].length === 0) delete BOXES[box];
        }

        continue;
    }

    // Add lens
    const [label, focal_length] = step.split('=');
    const box = `BOX ${String(hash_algorithm(label))}`;

    const new_item = `${label} ${focal_length}`;

    if (BOXES[box] === undefined) {
        BOXES[box] = [new_item];
        continue;
    }

    const index = BOXES[box].findIndex((item) => item.includes(label));
    if (index === -1) {
        // Add new item to array
        BOXES[box] = [...BOXES[box], new_item];
    } else {
        // Replace item with same label
        BOXES[box] = BOXES[box].toSpliced(index, 1, new_item);
    }
}

// Confirm with focusing power of all lenses in all boxes
let focusing_power = 0;
for (const [box_index, lenses] of Object.entries(BOXES)) {
    const box_number = Number(box_index.split(' ')[1]);

    focusing_power += lenses.reduce(
        (prev, current, index) =>
            (prev +=
                (1 + box_number) * (index + 1) * Number(current.split(' ')[1])),
        0
    );
}

console.log('Total focusing power: ', focusing_power);

function hash_algorithm(code: string): number {
    let res = 0;
    for (let char of code) {
        res = ((res + char.charCodeAt(0)) * 17) % 256;
    }
    return res;
}

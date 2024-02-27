const file = Bun.file('./input/day16.txt');

const text = await file.text();
//const input = String.raw`.|...\....
//|.-.\.....
//.....|-...
//........|.
//..........
//.........\
//..../.\\..
//.-.-/..|..
//.|....-|.\
//..//.|....`;

// const grid = input.split('\n').map((row) => row.split('')); // example grid
const grid = text.split('\n').map((row) => row.split(''));

// ############### First puzzle: ##################
// const energizedTiles = new Map();
// energizedTiles.set('0,3', ['down']);
// const beam = makeBeam(grid, energizedTiles, 0, 0, 'down');
// await beam.start();
// console.log('end:', energizedTiles.size);

// ############## Seccond puzzle: #################
const totalEnergized = [];
// Entry from the sides
for (let i = 0; i < grid.length; i++) {
    let entryX = 0;
    const entryY = i;
    const energizedTiles = new Map();

    console.log(`row ${entryY + 1}`);

    // Starting From the left
    const fromLeftBeam = makeBeam(
        grid,
        energizedTiles,
        entryX,
        entryY,
        'right'
    );
    await fromLeftBeam.start();
    totalEnergized.push(energizedTiles.size);

    energizedTiles.clear();
    // Starting from the right
    entryX = grid.length - 1;

    const fromRightBeam = makeBeam(
        grid,
        energizedTiles,
        entryX,
        entryY,
        'left'
    );
    await fromRightBeam.start();
    totalEnergized.push(energizedTiles.size);
}
// Entry from up/down
for (let i = 0; i < grid[0].length; i++) {
    const entryX = i;
    let entryY = 0;
    const energizedTiles = new Map();

    console.log(`col: ${entryX + 1}`);

    // Starting From the top
    const fromUpBeam = makeBeam(grid, energizedTiles, entryX, entryY, 'down');
    await fromUpBeam.start();
    totalEnergized.push(energizedTiles.size);

    energizedTiles.clear();
    // Starting from the bottom
    entryY = grid[0].length - 1;

    const fromDownBeam = makeBeam(grid, energizedTiles, entryX, entryY, 'up');
    await fromDownBeam.start();
    totalEnergized.push(energizedTiles.size);
}

console.log('Final list', totalEnergized);
console.log(
    'Highest number of energized tiles: ',
    totalEnergized.toSorted((a, b) => a - b).at(-1)
);

function makeBeam(
    grid: string[][],
    energizedTiles: Map<string, string[]>,
    x: number,
    y: number,
    direction: string
) {
    let stop = false;
    return {
        start,
    };

    async function start() {
        // console.log('New beam was created!!', energizedTiles.size);

        while (true) {
            if (grid[y]?.[x] === undefined) break;

            if (stop === true) {
                // console.log('Beam was destroyed!');
                break;
            }

            await advance();
        }
    }

    async function advance() {
        if (grid[y]?.[x] === undefined) return;
        const key = `${y},${x}`;
        if (energizedTiles.has(key)) {
            if (energizedTiles.get(key)?.includes(direction)) {
                stop = true;
                return;
            }
            energizedTiles.set(key, [
                ...(<[]>energizedTiles.get(key)),
                direction,
            ]);
        } else {
            energizedTiles.set(key, [direction]);
        }

        // console.log('new pos:', y, x, grid[y][x]);

        switch (grid[y][x]) {
            case '|':
                if (['left', 'right'].includes(direction)) {
                    direction = 'down';
                    const new_beam = makeBeam(grid, energizedTiles, x, y, 'up');
                    await new_beam.start();
                }
                break;
            case '-':
                if (['up', 'down'].includes(direction)) {
                    direction = 'right';
                    const new_beam = makeBeam(
                        grid,
                        energizedTiles,
                        x,
                        y,
                        'left'
                    );
                    await new_beam.start();
                }
                break;
            case '/':
                direction =
                    direction === 'right'
                        ? 'up'
                        : direction === 'left'
                        ? 'down'
                        : direction === 'up'
                        ? 'right'
                        : 'left';
                break;
            case '\\':
                direction =
                    direction === 'right'
                        ? 'down'
                        : direction === 'left'
                        ? 'up'
                        : direction === 'up'
                        ? 'left'
                        : 'right';
                break;

            default:
                break;
        }

        switch (direction) {
            case 'right':
                x = x + 1;
                break;
            case 'left':
                x = x - 1;
                break;
            case 'up':
                y = y - 1;
                break;
            case 'down':
                y = y + 1;
                break;
        }
    }
}

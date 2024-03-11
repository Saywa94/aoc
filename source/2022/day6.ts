const file = Bun.file("./input/day6.txt");
const input = await file.text();

const dataStream = input.trim().split("");

// Part 1
for (let i = 0; i < dataStream.length; i++) {
    if (new Set(dataStream.slice(i, i + 4)).size === 4) {
        console.log(i + 4);
        break;
    }
}

// Part 2

for (let i = 0; i < dataStream.length; i++) {
    if (new Set(dataStream.slice(i, i + 14)).size === 14) {
        console.log(i + 14);
        break;
    }
}

const file = Bun.file('./input/day1.txt');
const input = await file.text();

// Part 1
const elfs = input.split('\n\n')
const calories = elfs
    .map(food => food.split('\n')
    .map(c => Number(c))
    .reduce((a, b) => a + b, 0))

const sortedCalories = calories.toSorted()
const biggestMeal = sortedCalories.at(-1)
console.log(biggestMeal)

// Part 2
console.log(sortedCalories.slice(-3).reduce((a, b) => a + b, 0))


interface Description {
    goal: string;
    hint: string;
    level: number | string;
}

const level1 = {
    goal: "Plant and harvest 1 crop.",
    hint: "Add a 'Harvest' block and Run All Days to harvest 1 crop. Then, add a new 'Plant' block and change the row and column numbers.",
    level: 1
}

const level2 = {
    goal: "Plant and harvest 1 crop using loops.",
    hint: "Add a repeat block, and use it to repeat the 'Water' and 'Next Day' blocks 2 times.",
    level: 2
}

const level3 = {
    goal: "Plant 1 crop using variables.",
    hint: "Create a variable called 'row number' and set it to 3, then plant a crop at row, row number, and column, row number minus 1. ",
    level: 3
}

export const descriptions: Record<number | string, Description> = {
    1: level1,
    2: level2,
    3: level3,
};
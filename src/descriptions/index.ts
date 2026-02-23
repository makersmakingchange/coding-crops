interface Description {
    goal: string;
    hint: string;
    level: number | string;
}

const level1 = {
    goal: "Plant, water and harvest 1 crop.",
    hint: "Use the 'Plant' block to grow crops, the 'Water' block to speed up growth and the 'Harvest' block to harvest the crops.",
    level: 1
}

const level2 = {
    goal: "Plant and water 3 crops using loops.",
    hint: "You can use the 'Repeat' block to repeat a block of code multiple times.",
    level: 2
}

const level3 = {
    goal: "Plant and water 3 crops using variables.",
    hint: "You can create variables and replace the values in the code.",
    level: 3
}

export const descriptions: Record<number | string, Description> = {
    1: level1,
    2: level2,
    3: level3,
};
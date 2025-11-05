import level1 from './level1.json';
import level2 from './level2.json';
import level3 from './level3.json';

interface Description {
    goal: string;
    hint: string;
    levelNumber: number;
}

export const descriptions: Record<number, Description> = {
    1: level1,
    2: level2,
    3: level3,
};
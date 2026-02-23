import {chainBlocks, BlockDef, processBlocks} from "../levelManager";
import {nextDayBlock, plantBlock, waterBlock} from "./levelBuilder";

const level1Blocks: BlockDef[] = [
    plantBlock(1, 1),
    waterBlock(1, 1),
    nextDayBlock,
    waterBlock(1, 1),
    nextDayBlock,
];

export const level1 = {
    blocks: {
        languageVersion: 0,
        blocks: [processBlocks(level1Blocks)],
    },
};

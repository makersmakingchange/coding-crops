import {chainBlocks, BlockDef, processBlocks} from "../../levelManager";
import {nextDayBlock, plantBlock, waterBlock} from "../levelBuilder";

// Define your level blocks in order
const loopsBlocks: BlockDef[] = [
    plantBlock(1, 1),
    waterBlock(1, 1),
    nextDayBlock,
    waterBlock(1, 1),
    nextDayBlock
];

export const loops = {
    blocks: {
        languageVersion: 0,
        blocks: [processBlocks(loopsBlocks)],
    },
};

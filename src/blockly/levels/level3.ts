import {chainBlocks, BlockDef, processBlocks} from "../levelManager";
import {plantBlock} from "./levelBuilder";

// Define your level blocks in order
const level3Blocks: BlockDef[] = [
    plantBlock(1, 1)
];

export const level3 = {
    blocks: {
        languageVersion: 0,
        blocks: [processBlocks(level3Blocks)],
    },
};

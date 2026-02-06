import {chainBlocks, BlockDef, processBlocks} from "../levelManager";

// Define your level blocks in order
const level97Blocks: BlockDef[] = [
    {
        type: 'plant',
        inline: true,
        inputs: {
            ROW: {
                shadow: {
                    type: 'math_number',
                    fields: {
                        NUM: 1,
                    },
                },
            },
            COLUMN: {
                shadow: {
                    type: 'math_number',
                    fields: {
                        NUM: 1,
                    },
                },
            }
        }
    },
];

export const level3 = {
    blocks: {
        languageVersion: 0,
        blocks: [processBlocks(level97Blocks)],
    },
};

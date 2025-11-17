import {chainBlocks, BlockDef} from "../levelManager";

// Define your level blocks in order
const level3Blocks: BlockDef[] = [
    {
        type: 'plant',
        deletable: false,
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
        blocks: [chainBlocks(level3Blocks)],
    },
};

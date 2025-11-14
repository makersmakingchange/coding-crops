import {chainBlocks, BlockDef} from "../levelManager";

// Define your level blocks in order
const level1Blocks: BlockDef[] = [
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
    {
        type: 'water',
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
    { type: 'next_day' },
    {
        type: 'water',
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
    { type: 'next_day' },
];

export const level1 = {
    blocks: {
        languageVersion: 0,
        blocks: [chainBlocks(level1Blocks)],
    },
};

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
    {
        type: 'harvest',
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

export const level97 = {
    blocks: {
        languageVersion: 0,
        blocks: [processBlocks(level97Blocks)],
    },
};

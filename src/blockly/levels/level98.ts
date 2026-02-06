import {chainBlocks, BlockDef, processBlocks} from "../levelManager";

const numShadow = (num: number) => ({
    type: 'math_number',
    fields: { NUM: num }
});

const level98Actions: BlockDef[] = [
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

const repeatBlock: BlockDef = {
    type: 'controls_repeat',
    fields: {
        TIMES: { shadow: numShadow(10) }
    },
    inputs: {
        DO: { block: processBlocks(level98Actions) }
    }
};

export const level98 = {
    blocks: {
        languageVersion: 0,
        blocks: [processBlocks(level98Actions)]
    }
};

import { chainBlocks, BlockDef } from "../levelManager";

const numShadow = (num: number) => ({
    type: 'math_number',
    fields: { NUM: num }
});

const level2Actions: BlockDef[] = [
    {
        type: 'plant',
        deletable: false,
        inline: true,
        fields: {
            ROW: 1,
            COLUMN: 1,
        },
    },
    {
        type: 'water',
        inline: true,
        fields: {
            ROW: 1,
            COLUMN: 1,
        },
    },
    { type: 'next_day' },
    {
        type: 'water',
        inline: true,
        fields: {
            ROW: 1,
            COLUMN: 1,
        },
    },
    { type: 'next_day' },
    {
        type: 'harvest',
        inline: true,
        fields: {
            ROW: 1,
            COLUMN: 1,
        },
    },
];

const repeatBlock: BlockDef = {
    type: 'controls_repeat',
    fields: {
        TIMES: { shadow: numShadow(10) }
    },
    inputs: {
        DO: { block: chainBlocks(level2Actions) }
    }
};

export const level2 = {
    blocks: {
        languageVersion: 0,
        blocks: [repeatBlock]
    }
};

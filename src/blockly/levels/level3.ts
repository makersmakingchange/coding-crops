import {chainBlocks, BlockDef} from "../levelManager";

// Define your level blocks in order
const level3Blocks: BlockDef[] = [
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

export const level3 = {
    blocks: {
        languageVersion: 0,
        blocks: [chainBlocks(level3Blocks)],
    },
};

import {chainBlocks, BlockDef, processBlocks} from "../../levelManager";

const numShadow = (num: number) => ({
    type: 'math_number',
    fields: { NUM: num }
});

const setVar = (name: string, value: number): BlockDef => ({
    type: 'variables_set',
    fields: {
        VAR: { name },
    },
    inputs: {
        VALUE: { shadow: numShadow(value) },
    },
});

const tileAction = (type: string): BlockDef => ({
    type,
    inline: true,
    inputs: {
        ROW: {
            block: {
                type: 'variables_get',
                fields: { VAR: { name: 'row' } },
            },
        },
        COLUMN: {
            block: {
                type: 'variables_get',
                fields: { VAR: { name: 'column' } },
            },
        },
    },
});

const innerLoop: BlockDef = {
    type: 'controls_repeat',
    fields: {
        TIMES: 3,
    },
    inputs: {
        DO: {
            block: chainBlocks([
                tileAction('plant'),
                {
                    type: 'math_change',
                    fields: { VAR: { name: 'column' } },
                    inputs: { DELTA: { shadow: numShadow(1) } },
                },
            ]),
        },
    },
};

const outerLoop: BlockDef[] = [
    setVar('row', 1),
    {
        type: 'controls_repeat',
        fields: {
            TIMES: 3,
        },
        inputs: {
            DO: {
                block: chainBlocks([
                    setVar('column', 1),
                    innerLoop,
                    {
                        type: 'math_change',
                        fields: { VAR: { name: 'row' } },
                        inputs: { DELTA: { shadow: numShadow(1) } },
                    },
                ]),
            },
        },
    }
];


export const plantGrid = {
    blocks: {
        languageVersion: 0,
        blocks: [processBlocks(outerLoop)]
    }
};

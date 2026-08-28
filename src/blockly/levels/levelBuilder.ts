/**
 * @license
 * Copyright 2026 Neil Squire Society - Makers Making Change
 * SPDX-License-Identifier: Apache-2.0
 */

import {BlockDef, chainBlocks} from "../levelManager";
import {createAriaNumberInstance} from "../blocks/mathBlocks";

const rowBlock = createAriaNumberInstance(1, 'Row number');
const colBlock = createAriaNumberInstance(1, 'Column number');

export const plantBlock = (row: number, col: number, type: string = "Sunflower"): BlockDef => ({
    type: 'plant',
    inline: true,
    fields: {
        TYPE: type,
    },
    inputs: {
        ROW: {
            shadow: createAriaNumberInstance(row, 'Row number'),
        },
        COLUMN: {
            shadow: createAriaNumberInstance(col, 'Column number'),
        }
    }
});

export const plantBlockWithComplexInputs = (
    type: string,
    rowVariable?: string,
    colVariable?: string,
    rowShadow?: BlockDef,
    colShadow?: BlockDef): BlockDef => ({
    type: 'plant',
    inline: true,
    fields: {
        TYPE: type,
    },
    inputs: {
        ROW: shadowOrBlock(rowShadow, rowVariable),
        COLUMN: shadowOrBlock(colShadow, colVariable)
    },
});

export const waterBlock = (row: number, col: number): BlockDef => ({
    type: 'water',
    inline: true,
    inputs: {
        ROW: {
            shadow: createAriaNumberInstance(row, 'Row number')
        },
        COLUMN: {
            shadow: createAriaNumberInstance(col, 'Column number')
        }
    }
});

export const harvestBlock = (row: number, col: number): BlockDef => ({
    type: 'harvest',
    inline: true,
    inputs: {
        ROW: {
            shadow: createAriaNumberInstance(row, 'Row number')
        },
        COLUMN: {
            shadow: createAriaNumberInstance(col, 'Column number')
        }
    }
});

export const nextDayBlock: BlockDef = {
    type: 'next_day'
}

export const tileAction = (
    type: string,
    rowVariable?: string,
    colVariable?: string,
    rowShadow?: BlockDef,
    colShadow?: BlockDef): BlockDef => ({
    type: type,
    inline: true,
    inputs: {
        ROW: shadowOrBlock(rowShadow, rowVariable),
        COLUMN: shadowOrBlock(colShadow, colVariable)
    },
});

function shadowOrBlock(shadowBlock?: BlockDef, varName?: string) {
    const input: {
        shadow?: BlockDef;
        block?: BlockDef;
    } = {};

    if (shadowBlock) {
        input.shadow = shadowBlock;
    }

    if (varName) {
        input.block = {
            type: 'variables_get',
            fields: {
                VAR: { name: varName },
            },
        };
    }

    return input;
}


export const numShadow = (num: number) => ({
    type: 'math_number',
    fields: { NUM: num }
});

export const repeatBlock = (times: number, blocks: BlockDef[]): BlockDef => ({
    type: 'controls_repeat',
    fields: {
        TIMES: times
    },
    inputs: {
        DO: { block: chainBlocks(blocks) }
    }
});

export const countWithVarBlock = (variable: string, start: number, end: number, step: number, blocks: BlockDef[]) => ({
    type: 'controls_for',
    fields: {
        VAR: {
            name: variable,
        },
    },
    inputs: {
        FROM: {
            shadow: {
                type: 'math_number',
                    fields: {
                    NUM: start,
                },
            },
        },
        TO: {
            shadow: {
                type: 'math_number',
                    fields: {
                    NUM: end,
                },
            },
        },
        BY: {
            shadow: {
                type: 'math_number',
                    fields: {
                    NUM: step,
                },
            },
        },
        DO: { block: chainBlocks(blocks) }
    },
});

export const ifBlock = (conditionBlock: BlockDef, doBlock: BlockDef[]) => ({
    type: 'controls_if',
    kind: 'block',
    inputs: {
        IF0: {
            block: conditionBlock,
        },
        DO0: {
            block: chainBlocks(doBlock),
        },
    },
});
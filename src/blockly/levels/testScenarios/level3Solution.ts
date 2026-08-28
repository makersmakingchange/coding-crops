/**
 * @license
 * Copyright 2026 Neil Squire Society - Makers Making Change
 * SPDX-License-Identifier: Apache-2.0
 */

import {BlockDef, processBlocks} from "../../levelManager";
import {ifBlock, countWithVarBlock, tileAction} from "../levelBuilder";

const evenCheck: BlockDef = {
    type: 'math_number_property',
    kind: 'block',
    fields: {
        PROPERTY: 'EVEN',
    },
    inputs: {
        NUMBER_TO_CHECK: {
            block: {
                type: 'math_arithmetic',
                kind: 'block',
                fields: {
                    OP: 'ADD',
                },
                inputs: {
                    A: {
                        block: {
                            type: 'variables_get',
                            kind: 'block',
                            fields: {
                                VAR: {
                                    name: 'row number',
                                },
                            },
                        },
                    },
                    B: {
                        block: {
                            type: 'variables_get',
                            kind: 'block',
                            fields: {
                                VAR: {
                                    name: 'column number',
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};

const ifSumOfRowAndColIsEven: BlockDef = ifBlock(evenCheck, [
                tileAction('plant', 'row number', 'column number'),
                tileAction('water', 'row number', 'column number'),
            ]);

const innerLoop = countWithVarBlock('column number', 1, 3, 1, [ifSumOfRowAndColIsEven]);

const level3SolutionBlocks: BlockDef[] = [
    countWithVarBlock('row number', 1, 3, 1, [innerLoop])
];

export const level3Solution = {
    blocks: {
        languageVersion: 0,
        blocks: [processBlocks(level3SolutionBlocks)],
    },
};
